import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Contrato } from './entities/contrato.entity';
import { ContratoIntegrante } from './entities/contrato-integrante.entity';
import { ContratoReemplazo } from './entities/contrato-reemplazo.entity';
import { DisponibilidadEvento } from '../disponibilidad-eventos/entities/disponibilidad-evento.entity';
import { Ubicacion } from './entities/ubicacion.entity';
import { Integrante } from '../integrantes/entities/integrante.entity';

@Injectable()
export class ContratosService {
  constructor(
    @InjectRepository(Contrato) private contratoRepo: Repository<Contrato>,
    @InjectRepository(ContratoIntegrante) private contratoIntegranteRepo: Repository<ContratoIntegrante>,
    @InjectRepository(ContratoReemplazo) private contratoReemplazoRepo: Repository<ContratoReemplazo>,
    @InjectRepository(DisponibilidadEvento) private disponibilidadRepo: Repository<DisponibilidadEvento>,
    @InjectRepository(Ubicacion) private ubicacionRepo: Repository<Ubicacion>,
    private dataSource: DataSource,
  ) {}

  // Crear contrato en estado pendiente (con ubicación incluida)
  async createContrato(data: Partial<Contrato>) {
    const disponibilidad = await this.disponibilidadRepo.findOne({
  where: { fecha: data.fecha_evento, bloque: data.bloque },
});
if (disponibilidad && disponibilidad.estado === 'ocupado') {
  throw new BadRequestException('La fecha y bloque ya están ocupados');
}

    // Si el cliente envió datos de ubicación, crearla primero
    let ubicacion: Ubicacion | null = null;
    if (data.ubicacion) {
      ubicacion = this.ubicacionRepo.create(data.ubicacion);
      await this.ubicacionRepo.save(ubicacion);
    }

    const contrato = this.contratoRepo.create({
      ...data,
      estado: 'pendiente',
      ...(ubicacion ? { ubicacion } : {}) ,//solo asigna si existe
    });

    return this.contratoRepo.save(contrato);
  }

  // Obtener contrato con todas sus relaciones
  async getContrato(id: string) {
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: id },
      relations: ['cliente', 'evento', 'ubicacion', 'integrantes', 'reemplazos', 'pagos'],
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');
    return contrato;
  }

  // Confirmar contrato (solo integrantes, no reemplazos)
 async confirmarContrato(contratoId: string, integrantesData: { id_integrante: string; id_especialidad: string; horas_contratadas?: number }[]) {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const contrato = await queryRunner.manager.findOne(Contrato, {
      where: { id_contrato: contratoId },
      relations: ['ubicacion'],
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    // Validar disponibilidad
    const disponibilidad = await queryRunner.manager.findOne(DisponibilidadEvento, {
      where: { fecha: contrato.fecha_evento, bloque: contrato.bloque },
    });

    if (disponibilidad && disponibilidad.estado === 'ocupado') {
      throw new BadRequestException('La fecha y bloque ya están ocupados');
    }

    // Marcar disponibilidad como ocupada
    const slot = disponibilidad
      ? disponibilidad
      : queryRunner.manager.create(DisponibilidadEvento, {
          fecha: contrato.fecha_evento,
          bloque: contrato.bloque,
        });
    slot.estado = 'ocupado';
    slot.contrato = contrato;
    await queryRunner.manager.save(slot);

    // Asignar integrantes
    for (const integrante of integrantesData) {
      // Buscar el integrante en la base de datos con sus especialidades
      const integranteEntity = await queryRunner.manager.findOne(Integrante, {
        where: { id: integrante.id_integrante },
        relations: ['especialidades'],
      });

      if (!integranteEntity) {
        throw new NotFoundException('Integrante no encontrado');
      }

      // Validar que el integrante tenga la especialidad solicitada
      const tieneEspecialidad = integranteEntity.especialidadesAsignadas.some(
        e => e.id === integrante.id_especialidad,
      );
      if (!tieneEspecialidad) {
        throw new BadRequestException('El integrante no tiene esa especialidad');
      }

      // Determinar horas contratadas (pueden venir del body o del contrato)
      const horas = integrante.horas_contratadas ?? contrato.horas_contratadas;

      // Calcular compensación: tarifa_base_hora * horas
      const compensacion = Number(integranteEntity.tarifa_base_hora) * horas;

      // Crear asignación con cálculo automático
      const asignacion = queryRunner.manager.create(ContratoIntegrante, {
        id_contrato: contrato.id_contrato,
        id_integrante: integranteEntity.id,
        rol: integranteEntity.especialidadesAsignadas.find(e => e.id === integrante.id_especialidad)?.especialidad.nombre,
        horas_contratadas: horas,
        compensacion_hora: compensacion,
      });

      await queryRunner.manager.save(asignacion);
    }

    // Cambiar estado del contrato
    contrato.estado = 'confirmado';
    await queryRunner.manager.save(contrato);

    await queryRunner.commitTransaction();
    return contrato;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}

  // Registrar reemplazo (solo si un integrante falla)
  async registrarReemplazo(data: Partial<ContratoReemplazo>) {
    // Validar que el contrato existe
    const contrato = await this.contratoRepo.findOne({
      where: { id_contrato: data.id_contrato },
      relations: ['integrantes'],
    });
    if (!contrato) throw new NotFoundException('Contrato no encontrado');

    // Validar que el integrante original estaba en el contrato
    const integranteAsignado = contrato.integrantes.find(
      i => i.id_integrante === data.id_reemplazo, // Ajusta la lógica según tu modelo
    );
    if (!integranteAsignado) {
      throw new BadRequestException('El integrante original no estaba asignado al contrato');
    }

    // Registrar reemplazo
    const reemplazo = this.contratoReemplazoRepo.create(data);
    return this.contratoReemplazoRepo.save(reemplazo);
  }

  // Actualizar contrato
async updateContrato(id: string, data: Partial<Contrato>) {
  const contrato = await this.contratoRepo.findOne({ where: { id_contrato: id } });
  if (!contrato) throw new NotFoundException('Contrato no encontrado');

  Object.assign(contrato, data);
  return this.contratoRepo.save(contrato);
}

// Eliminar contrato
async removeContrato(id: string) {
  const contrato = await this.contratoRepo.findOne({ where: { id_contrato: id } });
  if (!contrato) throw new NotFoundException('Contrato no encontrado');

  return this.contratoRepo.remove(contrato);
}


}