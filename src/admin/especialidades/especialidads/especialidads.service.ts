import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidad } from './entities/especialidad.entity';
import { ILike, Repository } from 'typeorm';
import { CategoriasEspecialidad } from '../categorias_especialidads/entities/categorias_especialidad.entity';
import { ResponseEspecialidadDto } from './dto/response-especialidad.dto';
import { FiltrosEspecialidadDto } from './dto/filtros-especialidad.dto';

@Injectable()
export class EspecialidadsService {

  constructor(
    @InjectRepository(Especialidad)
    private readonly especialidadRepo: Repository<Especialidad>,

    @InjectRepository(CategoriasEspecialidad)
    private readonly categoriaRepo: Repository<CategoriasEspecialidad>,


  ){}


  async create(dto: CreateEspecialidadDto) {
    const categoria = await this.categoriaRepo.findOne({
      where: { id: dto.id_categoria },
    });

    if (!categoria) {
      throw new BadRequestException('La categoría no existe');
    }

    const nombre = dto.nombre.trim();

const existingEspecialidad = await this.especialidadRepo.findOne({
  where: {
    nombre: ILike(nombre)
  }
});

if (existingEspecialidad) {
  throw new BadRequestException('La especialidad ya existe');
}

    const especialidad = this.especialidadRepo.create({
      nombre: nombre.toLowerCase(),
      descripcion: dto.descripcion,
      categoria,
    });

    return this.especialidadRepo.save(especialidad);
  }

 async findAll(filters: FiltrosEspecialidadDto): Promise<ResponseEspecialidadDto[]> {

  // Normalizar filtros
const search = filters.search?.trim() || null;
const estado = filters.estado?.trim() || null;


const page = filters.page ? Number(filters.page) : null;
const limit = filters.limit ? Number(filters.limit) : null;

  const query = this.especialidadRepo
    .createQueryBuilder('especialidad')
    .leftJoinAndSelect('especialidad.categoria', 'categoria');

  // Orden dinámico seguro
  const allowedSort = {
    nombre: 'especialidad.nombre',
    estado: 'especialidad.estado',
    creado_en: 'especialidad.creado_en',
  } as const;

  const sortField = filters.sort && allowedSort[filters.sort] ? allowedSort[filters.sort] : 'especialidad.creado_en';
  const sortOrder = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  query.orderBy(sortField, sortOrder);

  // Búsqueda general
  if (search) {
  query.andWhere(
    `(especialidad.nombre ILIKE :search
      OR especialidad.descripcion ILIKE :search)`,
    { search: `%${search}%` },
  );
}

if (estado) {
  query.andWhere('especialidad.estado = :estado', {
    estado: estado.toUpperCase(),
  });
}

//   console.log(query.getSql());
// console.log(query.getParameters());
// console.log('filters:', filters);

 if (page && limit) {
  query
    .skip((page - 1) * limit)
    .take(limit);
}

const especialidades = await query.getMany();

  return especialidades.map(especial => ({
    id: especial.id,
    nombre: especial.nombre,
    descripcion: especial.descripcion,
    estado: especial.estado,

    categoria: especial.categoria
      ? {
          id: especial.categoria.id,
          nombre: especial.categoria.nombre,
          icono: especial.categoria.icono,
          estado: especial.categoria.estado,
        }
      : null,

    creado_en: especial.creado_en,
    actualizado_en: especial.actualizado_en,
    eliminado_en: especial.eliminado_en ?? null,
  }));
}
 

  async findOne(id: string): Promise<ResponseEspecialidadDto> {
    const especialidad = await this.especialidadRepo.findOne({
      where: { id },
      relations: {
        categoria: true,
      },
    });

    if (!especialidad) {
      throw new NotFoundException('Especialidad no encontrada');
    }

    return {
      
    id: especialidad.id,
    nombre: especialidad.nombre,
    descripcion: especialidad.descripcion,
    estado: especialidad.estado,
    categoria: {
      id: especialidad.categoria.id,
      nombre: especialidad.categoria.nombre,
      icono: especialidad.categoria.icono,
      estado: especialidad.categoria.estado,
    },
    creado_en: especialidad.creado_en,
    actualizado_en: especialidad.actualizado_en
    }

  }


 async update(id: string, dto: UpdateEspecialidadDto) {
  const especialidad = await this.especialidadRepo.findOne({
    where: { id },
    relations: {
      categoria: true,
    },
  });

  if (!especialidad) {
    throw new NotFoundException('Especialidad no encontrada');
  }

  // Si viene id_categoria, validar y asignar
  if (dto.id_categoria) {
    const categoria = await this.categoriaRepo.findOne({
      where: { id: dto.id_categoria },
    });

    if (!categoria) {
      throw new BadRequestException('La categoría no existe');
    }

    especialidad.categoria = categoria;
  }

  // Evitar que id_categoria sobrescriba la relación
  delete dto.id_categoria;

  Object.assign(especialidad, dto);

  return this.especialidadRepo.save(especialidad);
}



   async remove(id: string) {
  const especialidad = await this.especialidadRepo.findOne({ where: { id } });

  if (!especialidad) {
    throw new Error('Especialidad no encontrado');
  }

  especialidad.estado = 'inactivo';
  especialidad.eliminado_en = new Date();
  await this.especialidadRepo.save(especialidad);

  return { message: 'Especialidad desactivado correctamente' };
}

}
