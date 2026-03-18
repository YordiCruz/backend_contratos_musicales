import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIntegranteDto } from './dto/create-integrante.dto';
import { Integrante } from './entities/integrante.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Persona } from '../personas/entities/persona.entity';
import { FiltroIntegranteDataDto } from './dto/filtro-integrante-data.dto';
import { ResponseIntegranteDto } from './dto/response-integrante.dto';
import { UpdateIntegranteDto } from './dto/update-integrante.dto';
import { ResponseUpdateDto } from './dto/response-update.dto';
import { CreateIntegranteDataDto } from './dto/create-integrante-data.dto';
import { AsignarEspecialidadDto } from './dto/asignar-especialidad.dto';
import { Especialidad } from '../especialidades/especialidads/entities/especialidad.entity';
import { AsignarVariasEspecialidadesDto } from './dto/asignar-varias-especialidades.dto';
import { IntegranteEspecialidad } from './entities/integrante-especialidad.entity';

@Injectable()
export class IntegrantesService {

  constructor(
    @InjectRepository(Integrante)
    private readonly integranterepo: Repository<Integrante>,

    @InjectRepository(Especialidad)
    private readonly especialidadrepo: Repository<Especialidad>,

    @InjectDataSource()
    private readonly dataSource: DataSource

  ){}

async create(createIntegranteDto: CreateIntegranteDto, user: any): Promise<Integrante> {
  return await this.dataSource.transaction(async manager => {

    const { persona: personaDto, integrante: integranteDto } = createIntegranteDto;

    // 1. Buscar persona por documento
    let persona = await manager.findOne(Persona, {
      where: { documento_identidad: personaDto.documento_identidad }
    });

    // 2. Si no existe, crearla
    if (!persona) {
      persona = await manager.save(Persona, personaDto);
    }

    // 3. Validar que no sea ya integrante
    const yaIntegrante = await manager.findOne(Integrante, {
      where: { persona: { id: persona.id } }
    });

    if (yaIntegrante) {
      throw new Error('Esta persona ya es integrante');
    }

    // 4. Crear integrante
    const nuevoIntegrante = manager.create(Integrante, {
      ...integranteDto,
      persona,
      registrado_por: user?.id ? { id: user.id } : undefined
    });

    return await manager.save(Integrante, nuevoIntegrante);
  });
}


async findAll(
  filters: FiltroIntegranteDataDto
): Promise<ResponseIntegranteDto[]> {

  const page = filters.page || 1;
  const limit = filters.limit || 10;

  const query = this.integranterepo
    .createQueryBuilder('integrante')
    .leftJoinAndSelect('integrante.persona', 'persona')
    .leftJoinAndSelect('integrante.especialidad', 'especialidad')
    .leftJoinAndSelect('especialidad.categoria', 'categoria');

  // Orden dinámico
  const sortField = filters.sort || 'integrante.creado_en';
  const sortOrder = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  query.orderBy(sortField, sortOrder);

  // Búsqueda general
  if (filters.search) {
    query.andWhere(`
      persona.nombre ILIKE :search OR
      persona.apellido ILIKE :search OR
      persona.email ILIKE :search OR
      persona.telefono ILIKE :search OR
      persona.documento_identidad ILIKE :search
    `, {
      search: `%${filters.search}%`,
    });
  }

  // Filtrar por estado
  if (filters.estado) {
    query.andWhere('integrante.estado = :estado', {
      estado: filters.estado,
    });
  }

  const integrantes = await query
    .skip((page - 1) * limit)
    .take(limit)
    .getMany();

  return integrantes.map(integrante => ({
    id: integrante.id,
    tarifa_base_hora: integrante.tarifa_base_hora,
    moneda: integrante.moneda,
    fecha_ingreso: integrante.fecha_ingreso,
    estado: integrante.estado,
    creado_en: integrante.creado_en,
    actualizado_en: integrante.actualizado_en,
    eliminado_en: integrante.eliminado_en ?? null,

    persona: integrante.persona
      ? {
          id: integrante.persona.id,
          nombre: integrante.persona.nombre,
          apellido: integrante.persona.apellido,
          email: integrante.persona.email,
          telefono: integrante.persona.telefono,
          documento_identidad: integrante.persona.documento_identidad,
        }
      : null,

   especialidades: integrante.especialidades?.map(esp => ({
  id: esp.id,
  nombre: esp.nombre,
  descripcion: esp.descripcion,
  estado: esp.estado,
  categoria: esp.categoria
    ? {
        id: esp.categoria.id,
        nombre: esp.categoria.nombre,
        icono: esp.categoria.icono,
        estado: esp.categoria.estado
      }
    : null
})) ?? []
  }));
}
 

  async findOne(id: string): Promise<Integrante> {
    const usr = await this.integranterepo.findOne({
      where: { id } });
   if(!usr) {
          throw new Error('Integrante no encontrado');
          
        }
   return usr;


 }

  async update(id: string, updateIntegranteDto: UpdateIntegranteDto): Promise<ResponseUpdateDto> {
    const integrante = await this.integranterepo.findOne({where :{id} })
    if (!integrante) {
      throw new Error('Integrante no encontrado');
    }

      // ❗ Evitar que el DTO pise el ID
  if ('id' in updateIntegranteDto) {
    delete (updateIntegranteDto as any).id;
  }


   // Campos que NO deben actualizarse nunca
  const camposProtegidos = [
    'id',
    'persona',
    'id_persona',
    'creado_en',
    'eliminado_en',
    'actualizado_en',
  ];

  for (const campo of camposProtegidos) {
    if (campo in updateIntegranteDto) {
      delete (updateIntegranteDto as any)[campo];
    }
  }


  // ❗ Evitar que el DTO pise fecha_ingreso
  if ('fecha_ingreso' in updateIntegranteDto) {
    delete (updateIntegranteDto as any).fecha_ingreso;
  }


    const update = Object.assign(integrante, updateIntegranteDto)
    const saved = await this.integranterepo.save(update)
    if (!saved) {
  throw new Error('No se pudo actualizar el integrante');
}

    return {
      id: saved.id,
      tarifa_base_hora: saved.tarifa_base_hora,
      moneda: saved.moneda,
      fecha_ingreso: saved.fecha_ingreso,
      estado: saved.estado,
      creado_en: saved.creado_en,
      actualizado_en: saved.actualizado_en,
      eliminado_en: saved.eliminado_en ?? null
     
    }
  }


 async remove(id: string) {
  const integrante = await this.integranterepo.findOne({ where: { id } });

  if (!integrante) {
    throw new Error('Integrante no encontrado');
  }

  integrante.estado = 'inactivo';
  integrante.eliminado_en = new Date();
  await this.integranterepo.save(integrante);

  return { message: 'Integrante desactivado correctamente' };
}


async createIntegranteFromExistingPersona(idPersona: string, dto: CreateIntegranteDataDto, user: any) {
  const integrante = await this.integranterepo.findOne({ where: { id: idPersona } });

  if (!integrante) {
    throw new NotFoundException('El integrante no existe');
  }

  // Verificar que no tenga ya un usuario
  const existingIntegrante = await this.integranterepo.findOne({ where: { persona: { id: idPersona } } });
  if (existingIntegrante) {
    throw new BadRequestException('Esta persona ya tiene un integrante asignado');
  }

  const integrant = this.integranterepo.create({
    ...dto,
    persona: { id: idPersona },
    registrado_por: user.id ? { id: user.id } : undefined
  });

  return await this.integranterepo.save(integrant);
}

async asignarEspecialidad(id: string, dto: AsignarEspecialidadDto) {
  // Buscar al integrante con sus especialidades asignadas
  const integrante = await this.integranterepo.findOne({
    where: { id },
    relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
  });

  if (!integrante) throw new NotFoundException('Integrante no encontrado');

  // Buscar la especialidad
  const especialidad = await this.especialidadrepo.findOne({
    where: { id: dto.id_especialidad },
  });

  if (!especialidad) throw new NotFoundException('Especialidad no encontrada');

  // Validar si ya existe la relación
  const yaExiste = integrante.especialidadesAsignadas.some(
    ie => ie.especialidad.id === dto.id_especialidad,
  );

  if (yaExiste) {
    throw new ConflictException('El integrante ya tiene esta especialidad');
  }

  const yaTienePrimaria = integrante.especialidadesAsignadas.some(
    ie => ie.tipo === 'primario',
  );


  // Decidir el tipo: usar el que manda el frontend o calcular automáticamente
  const tipo = dto.tipo
    ? dto.tipo
    : (yaTienePrimaria ? 'secundario' : 'primario');

  // Crear la relación intermedia
  const nuevaRelacion = this.dataSource.getRepository(IntegranteEspecialidad).create({
    integrante,
    especialidad,
    tipo,
  });


  await this.dataSource.getRepository(IntegranteEspecialidad).save(nuevaRelacion);

  return {
    message: `Se añadió correctamente la especialidad (${especialidad.nombre}) al integrante`,
    tipo: nuevaRelacion.tipo,
  };
}

async asignarMultiplesEspecialidades(id: string, dto: AsignarVariasEspecialidadesDto) {
  // Buscar al integrante con sus especialidades asignadas
  const integrante = await this.integranterepo.findOne({
    where: { id },
    relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
  });

  if (!integrante) {
    throw new NotFoundException('Integrante no encontrado');
  }

  // Buscar todas las especialidades solicitadas
  const especialidades = await this.especialidadrepo.findByIds(dto.especialidades.map(e => e.id_especialidad));

  if (especialidades.length !== dto.especialidades.length) {
    throw new NotFoundException('Una o más especialidades no existen');
  }

  // Obtener las especialidades actuales del integrante
  const idsActuales = new Set(
    integrante.especialidadesAsignadas.map(ie => ie.especialidad.id),
  );

  // Filtrar las nuevas especialidades que aún no están asignadas
  const nuevas = especialidades.filter(e => !idsActuales.has(e.id));

  if (nuevas.length === 0) {
    return { message: 'Todas las especialidades ya estaban asignadas' };
  }

  // Verificar si ya existe una primaria
  const yaTienePrimaria = integrante.especialidadesAsignadas.some(
    ie => ie.tipo === 'primario',
  );

  // Crear las relaciones intermedias para las nuevas especialidades
  const repoIE = this.dataSource.getRepository(IntegranteEspecialidad);

  for (let i = 0; i < nuevas.length; i++) {
    const relacion = repoIE.create({
      integrante,
      especialidad: nuevas[i],
      tipo: !yaTienePrimaria && i === 0 ? 'primario' : 'secundario',
    });
    await repoIE.save(relacion);
  }

  return {
    message: 'Especialidades asignadas correctamente',
    asignadas: nuevas.map(e => e.nombre),
  };
}



async eliminarEspecialidad(id: string, id_especialidad: string) {
  // Buscar al integrante con sus especialidades asignadas
  const integrante = await this.integranterepo.findOne({
    where: { id },
    relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
  });

  if (!integrante) {
    throw new NotFoundException('Integrante no encontrado');
  }

  // Buscar la relación intermedia
  const relacion = integrante.especialidadesAsignadas.find(
    ie => ie.especialidad.id === id_especialidad,
  );

  if (!relacion) {
    throw new NotFoundException('El integrante no tiene esta especialidad');
  }

  const nombreEspecialidad = relacion.especialidad.nombre;

  // Eliminar la relación intermedia
  await this.dataSource.getRepository(IntegranteEspecialidad).remove(relacion);

  return {
    message: `Se quitó correctamente la especialidad: ${nombreEspecialidad} del integrante`,
  };
}


async listaEspecialidades(id: string) {
  // Buscar al integrante con sus especialidades asignadas
  const integrante = await this.integranterepo.findOne({
    where: { id },
    relations: ['especialidadesAsignadas', 'especialidadesAsignadas.especialidad'],
  });

  if (!integrante) {
    throw new NotFoundException('Integrante no encontrado');
  }

  // Mapear las especialidades con su tipo (primaria/secundaria)
  return integrante.especialidadesAsignadas.map(ie => ({
    id: ie.especialidad.id,
    nombre: ie.especialidad.nombre,
    tipo: ie.tipo, // primaria | secundaria
  }));
}

}
