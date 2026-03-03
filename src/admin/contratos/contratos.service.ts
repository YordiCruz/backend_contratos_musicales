import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Contrato } from './entities/contrato.entity';
import { ContratoIntegrante } from './entities/contrato-integrante.entity';
import { ContratoReemplazo } from './entities/contrato-reemplazo.entity';
import { DisponibilidadEvento } from '../disponibilidad-eventos/entities/disponibilidad-evento.entity';
import { Ubicacion } from './entities/ubicacion.entity';
import { Integrante } from '../integrantes/entities/integrante.entity';
import { Client } from 'src/client/clients/entities/client.entity';
import { Evento } from '../eventos/eventos/entities/evento.entity';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { Reemplazo } from '../reemplazos/entities/reemplazo.entity';
import { Pago } from './entities/pago.entity';
import { TipoServicioEspecialidad } from './entities/tipo-servicio-especialidad.entity';
import { ReemplazoEspecialidad } from '../reemplazos/entities/reemplazo-especialidad.entity';
import { AsignarIntegranteDto, AsignarIntegrantesDto } from './dto/asignar-integrante.dto';

@Injectable()
export class ContratosService {
  constructor(
    @InjectRepository(Contrato) private contratoRepo: Repository<Contrato>,
    @InjectRepository(ContratoIntegrante)
    private contratoIntegranteRepo: Repository<ContratoIntegrante>,
    @InjectRepository(ContratoReemplazo)
    private contratoReemplazoRepo: Repository<ContratoReemplazo>,
    @InjectRepository(DisponibilidadEvento)
    private disponibilidadRepo: Repository<DisponibilidadEvento>,
    @InjectRepository(Ubicacion) private ubicacionRepo: Repository<Ubicacion>,
    private dataSource: DataSource,
  ) {}

  // Crear contrato en estado pendiente (con ubicación incluida)
  async createContrato(data: CreateContratoDto) {
    // Validar disponibilidad
    const disponibilidad = await this.disponibilidadRepo.findOne({
      where: { fecha: data.fecha_evento, bloque: data.bloque },
    });
    if (disponibilidad && disponibilidad.estado === 'ocupado') {
      throw new BadRequestException('La fecha y bloque ya están ocupados');
    }

    // Buscar entidades relacionadas
    const cliente = await this.dataSource
      .getRepository(Client)
      .findOne({ where: { id: data.id_cliente } });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');

    const evento = await this.dataSource
      .getRepository(Evento)
      .findOne({ where: { id_evento: data.id_evento } });
    if (!evento) throw new NotFoundException('Evento no encontrado');

    const ubicacion = await this.ubicacionRepo.findOne({
      where: { id_ubicacion: data.id_ubicacion },
    });
    if (!ubicacion) throw new NotFoundException('Ubicación no encontrada');

    // Crear contrato con relaciones
    const contrato = this.contratoRepo.create({
      cliente,
      evento,
      ubicacion,
      fecha_evento: data.fecha_evento,
      bloque: data.bloque,
      hora_inicio: data.hora_inicio,
      hora_fin: data.hora_fin,
      tipo_servicio: data.tipo_servicio,
      horas_contratadas: data.horas_contratadas,
      adelanto: data.adelanto,
      saldo: data.saldo,
      fecha_adelanto: data.fecha_adelanto,
      estado: 'pendiente',
    });

    return this.contratoRepo.save(contrato);
  }

  // Obtener contrato con todas sus relaciones
  async getContrato(id: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: id },
      relations: [
        'cliente',
        'evento',
        'ubicacion',
        'integrantes',
        'reemplazos',
        'pagos',
      ],
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');
    return contrato;
  }

  // Confirmar contrato (solo integrantes, no reemplazos)
async confirmarContrato(contratoId: string) {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const contrato = await queryRunner.manager.findOne(Contrato, {
      where: { id_contrato: contratoId },
      relations: ['ubicacion'],
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    // 🔹 Validar disponibilidad
    const disponibilidad = await queryRunner.manager.findOne(DisponibilidadEvento, {
      where: { fecha: contrato.fecha_evento, bloque: contrato.bloque },
    });
    if (disponibilidad && disponibilidad.estado === 'ocupado') {
      await queryRunner.rollbackTransaction();
      return { estado: 'pendiente', mensaje: 'Fecha y bloque ocupados' };
    }

    // 🔹 Especialidades requeridas según tipo_servicio
    const especialidadesRequeridas = await queryRunner.manager.find(TipoServicioEspecialidad, {
      where: { tipo_servicio: contrato.tipo_servicio },
      relations: ['especialidad'],
    });

    // 🔹 Integrantes aceptados
   const contratoIntegrantes = await queryRunner.manager.find(ContratoIntegrante, {
  where: { contrato: { id_contrato: contratoId }, estado: 'aceptado' },
  relations: ['integrante', 'integrante.persona'],
});

    console.log('ContratoIntegrantes RAW:', contratoIntegrantes);

    // 🔹 Reemplazos aceptados
    const contratoReemplazos = await queryRunner.manager.find(ContratoReemplazo, {
      where: { contrato: { id_contrato: contratoId }, estado: 'aceptado' },
      relations: ['reemplazo', 'reemplazo.especialidadesAsignadas', 'reemplazo.especialidadesAsignadas.especialidad', 'reemplazo.persona'],
    });

    let faltantes: { especialidad: string; estado: string }[] = [];
    let cobertura: { especialidad: string; estado: string; tipo: string; nombre: string }[] = [];

    for (const esp of especialidadesRequeridas) {
      let cubierta = false;
      let nombreIntegrante: string | null = null;
      let tipoCobertura: string | null = null;

      // 🔹 Revisar integrantes aceptados
      for (const ci of contratoIntegrantes) {
        if (ci.especialidad.toLowerCase() === esp.especialidad.nombre.toLowerCase()) {
          cubierta = true;
          tipoCobertura = 'integrante';
          nombreIntegrante = ci.integrante.persona
            ? `${ci.integrante.persona.nombre} ${ci.integrante.persona.apellido}`
            : 'Integrante';
        }
      }

      // 🔹 Revisar reemplazos aceptados
      for (const cr of contratoReemplazos) {
        for (const re of cr.reemplazo.especialidadesAsignadas ?? []) {
          if (re.especialidad.nombre.toLowerCase() === esp.especialidad.nombre.toLowerCase()) {
            cubierta = true;
            tipoCobertura = 'reemplazo';
            nombreIntegrante = cr.reemplazo.persona
              ? `${cr.reemplazo.persona.nombre} ${cr.reemplazo.persona.apellido}`
              : 'Reemplazo';
          }
        }
      }

      // 🔹 Clasificación
      if (cubierta) {
        cobertura.push({
          especialidad: esp.especialidad.nombre,
          estado: 'cubierta',
          tipo: tipoCobertura!,
          nombre: nombreIntegrante!,
        });
      } else {
        faltantes.push({ especialidad: esp.especialidad.nombre, estado: 'faltante' });
      }
    }

    // 🔹 Si hay faltantes → buscar posibles reemplazos
    if (faltantes.length > 0) {
      let posiblesReemplazos: Record<string, any[]> = {};

      for (const f of faltantes) {
        const candidatos = await queryRunner.manager.find(Reemplazo, {
          where: { estado: 'activo', disponible: true },
          relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad', 'persona'],
        });

        posiblesReemplazos[f.especialidad] = candidatos
          .filter((r) =>
            (r.especialidadesAsignadas ?? []).some(
              (e) => e.especialidad.nombre.toLowerCase() === f.especialidad.toLowerCase(),
            ),
          )
          .map((r) => ({
            id_reemplazo: r.id,
            nombre: r.persona ? `${r.persona.nombre} ${r.persona.apellido}` : null,
            especialidad: f.especialidad,
            tarifa_base_hora: r.tarifa_base_hora,
            moneda: r.moneda,
          }));
      }

      await queryRunner.rollbackTransaction();
      return {
        estado: 'pendiente',
        cobertura,
        faltantes,
        posibles_reemplazos: posiblesReemplazos,
        mensaje: 'Contrato pendiente: faltan especialidades críticas por cubrir',
      };
    }

    // 🔹 Validar pago de adelanto
    const pagoAdelanto = await queryRunner.manager.findOne(Pago, {
      where: { contrato: { id_contrato: contratoId }, tipo: 'adelanto' },
    });
    if (!pagoAdelanto) {
      await queryRunner.rollbackTransaction();
      return { estado: 'pendiente', mensaje: 'Contrato pendiente: falta pago de adelanto' };
    }

    // 🔹 Validar aprobación admin
    if (!contrato.admin_aprobacion) {
      await queryRunner.rollbackTransaction();
      return { estado: 'pendiente', mensaje: 'Contrato pendiente: falta aprobación del administrador' };
    }

    // 🔹 Confirmar contrato
    contrato.estado = 'confirmado';
    await queryRunner.manager.save(contrato);

    // 🔹 Guardar disponibilidad
    const slot = disponibilidad
      ? disponibilidad
      : queryRunner.manager.create(DisponibilidadEvento, {
          fecha: contrato.fecha_evento,
          bloque: contrato.bloque,
        });
    slot.estado = 'ocupado';
    slot.contrato = contrato;
    await queryRunner.manager.save(slot);

    await queryRunner.commitTransaction();

    return {
      estado: contrato.estado,
      cobertura,
      mensaje: 'Contrato confirmado: todas las especialidades están cubiertas',
    };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}
  async reabrirContrato(id: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: id },
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    if (contrato.estado !== 'rechazado' && contrato.estado !== 'cancelado') {
      throw new BadRequestException(
        'Solo se pueden reabrir contratos rechazados o cancelados',
      );
    }
    contrato.estado = 'pendiente';
    return this.contratoRepo.save(contrato);
  }

  async rechazarContrato(id: string, motivo?: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: id },
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    contrato.estado = 'rechazado';
    contrato.motivo_cancelacion = motivo ?? 'No especificado';
    return this.contratoRepo.save(contrato);
  }



  //Tu función actual (asignarIntegranteAlContrato) permite que el admin decida si un integrante entra como aceptado o pendiente directamente. Pero en la práctica, lo correcto es que el admin solo cree la invitación (estado "pendiente") y luego el integrante/reemplazo reciba la notificación para aceptar o rechazar

async asignarIntegranteAlContrato(
  contratoId: string,
  dto: AsignarIntegranteDto,
): Promise<Contrato> {
  // 🔹 Validar contrato
  const contrato = await this.contratoRepo.findOne({
    where: { id_contrato: contratoId },
    relations: ['integrantes'],
  });
  if (!contrato) throw new NotFoundException('Contrato no encontrado');

  // 🔹 Validar integrante
  const integranteEntity = await this.dataSource.getRepository(Integrante).findOne({
    where: { id: dto.id_integrante },
    relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad', 'persona'],
  });
  if (!integranteEntity) throw new NotFoundException('Integrante no encontrado');

  // 🔹 Buscar especialidad primaria
  const especialidadAsignada = integranteEntity.especialidadesAsignadas.find(
    (e) => e.tipo === 'primario',
  );
  if (!especialidadAsignada) {
    throw new BadRequestException('El integrante no tiene especialidad primaria asignada');
  }

  // 🔹 Validar contra tipo_servicio
  const especialidadesRequeridas = await this.dataSource.getRepository(TipoServicioEspecialidad).find({
    where: { tipo_servicio: contrato.tipo_servicio },
    relations: ['especialidad'],
  });

  const especialidadValida = especialidadesRequeridas.some(
    (esp) => esp.especialidad.id === especialidadAsignada.especialidad.id,
  );

  if (!especialidadValida) {
    throw new BadRequestException(
      `La especialidad primaria ${especialidadAsignada.especialidad.nombre} no corresponde al tipo de servicio ${contrato.tipo_servicio}`,
    );
  }

  // 🔹 Crear relación en tabla intermedia
  const contratoIntegrante = this.contratoIntegranteRepo.create({
    id_contrato: contrato.id_contrato,
    id_integrante: integranteEntity.id,
    contrato,
    integrante: integranteEntity,
    especialidad: especialidadAsignada.especialidad.nombre,
    compensacion_hora:
      (integranteEntity?.tarifa_base_hora ?? 0) *
      (dto.horas_contratadas ?? contrato.horas_contratadas),
    horas_contratadas: dto.horas_contratadas ?? contrato.horas_contratadas,
    estado: dto.aceptado ? 'aceptado' : 'pendiente',
  });

  await this.contratoIntegranteRepo.save(contratoIntegrante);

  // 🔹 Devolver contrato actualizado
  const contratoActualizado = await this.contratoRepo.findOne({
    where: { id_contrato: contratoId },
    relations: ['integrantes', 'integrantes.integrante', 'integrantes.integrante.persona'],
  });

  if (!contratoActualizado) {
    throw new NotFoundException('Contrato no encontrado después de asignar integrante');
  }

  return contratoActualizado;
}


  // Registrar reemplazo (solo si un integrante falla)
  async asignarReemplazoAlContrato(data: {
  id_contrato: string;
  id_reemplazo: string;
  id_especialidad: string;
  horas_contratadas?: number;
  aceptado?: boolean;
}) {
  // 🔹 Validar contrato
  const contrato = await this.contratoRepo.findOne({
    where: { id_contrato: data.id_contrato },
    relations: ['reemplazos'],
  });
  if (!contrato) throw new NotFoundException('Contrato no encontrado');

  // 🔹 Validar que el contrato esté confirmado
  if (contrato.estado !== 'confirmado') {
    throw new BadRequestException(
      'Solo se pueden asignar reemplazos a contratos confirmados',
    );
  }

  // 🔹 Validar reemplazo
  const reemplazoEntity = await this.dataSource
    .getRepository(Reemplazo)
    .findOne({
      where: { id: data.id_reemplazo },
      relations: [
        'especialidadesAsignadas',
        'especialidadesAsignadas.especialidad',
        'persona',
      ],
    });
  if (!reemplazoEntity)
    throw new NotFoundException('Reemplazo no encontrado');

  // 🔹 Validar disponibilidad
  if (!reemplazoEntity.disponible) {
    throw new BadRequestException('El reemplazo no está disponible actualmente');
  }

  // 🔹 Buscar especialidad asignada
  const especialidadAsignada = reemplazoEntity.especialidadesAsignadas.find(
    (e) => e.especialidad.id === data.id_especialidad,
  );
  if (!especialidadAsignada) {
    throw new BadRequestException('El reemplazo no tiene la especialidad indicada');
  }

  // 🔹 Crear relación en tabla intermedia
  const contratoReemplazo = this.contratoReemplazoRepo.create({
    id_contrato: contrato.id_contrato,
    id_reemplazo: reemplazoEntity.id,
    contrato,
    reemplazo: reemplazoEntity,
    especialidad: especialidadAsignada.especialidad.nombre,
    compensacion_hora:
      (reemplazoEntity?.tarifa_base_hora ?? 0) *
      (data.horas_contratadas ?? contrato.horas_contratadas),
    horas_contratadas: data.horas_contratadas ?? contrato.horas_contratadas,
    estado: data.aceptado ? 'aceptado' : 'pendiente', // 🔹 nuevo campo
  });

  await this.contratoReemplazoRepo.save(contratoReemplazo);

  // 🔹 Devolver contrato actualizado con reemplazos
  return this.contratoRepo.findOne({
    where: { id_contrato: data.id_contrato },
    relations: [
      'reemplazos',
      'reemplazos.reemplazo',
      'reemplazos.reemplazo.persona',
    ],
  });
}




async obtenerContratoConIntegrantes(id_contrato: string): Promise<Contrato> {
  const contrato = await this.contratoRepo.findOne({
    where: { id_contrato },
    relations: [
      'integrantes',
      'integrantes.integrante',
      'integrantes.integrante.persona',
    ],
  });

  if (!contrato) {
    throw new NotFoundException('Contrato no encontrado');
  }

  return contrato;
}



  // Actualizar contrato
  async updateContrato(id: string, data: Partial<Contrato>) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: id },
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    Object.assign(contrato, data);
    return this.contratoRepo.save(contrato);
  }

  // Eliminar contrato
  async removeContrato(id: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: id },
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    return this.contratoRepo.remove(contrato);
  }
}
