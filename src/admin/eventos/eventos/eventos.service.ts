import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Categoria } from '../categorias/entities/categoria.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { Media } from '../media/entities/media.entity';
import { unlinkSync } from 'fs';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,

    @InjectRepository(Evento)
    private readonly repo: Repository<Evento>,

    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,

    private readonly dataSource: DataSource,
  ) {}

  // ============================
  // CREAR EVENTO (solo datos)
  // ============================
  async create(dto: CreateEventoDto) {
    const categoria = await this.categoriaRepo.findOne({
      where: { id_categoria: dto.id_categoria },
    });

    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    const existing = await this.repo.findOne({
      where: { nombre: dto.nombre },
    });

    if (existing) {
      throw new BadRequestException(`Ya existe un evento con el nombre "${dto.nombre}"`);
    }

    const evento = this.repo.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      precio_base: dto.precio_base,
      categoria,
    });

    return this.repo.save(evento);
  }

  // ============================
  // LISTAR EVENTOS
  // ============================
  findAll() {
    return this.repo.find({
      relations: {
        categoria: true,
        media: true
      }
    });
  }

  // ============================
  // OBTENER EVENTO
  // ============================
  findOne(id: string) {
    return this.repo.findOne({
      where: { id_evento: id },
      relations: {
        categoria: true,
        media: true
      }
    });
  }

  // ============================
  // EDITAR EVENTO (solo datos)
  // ============================
  async update(id_evento: string, dto: UpdateEventoDto) {
  const evento = await this.repo.findOne({
    where: { id_evento },
  });

  if (!evento) throw new NotFoundException('Evento no encontrado');

  // Buscar la categoría
  if (dto.id_categoria) {
    const categoria = await this.categoriaRepo.findOne({
      where: { id_categoria: dto.id_categoria },
    });
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    evento.categoria = categoria;
  }

  this.repo.merge(evento, {
    nombre: dto.nombre,
    descripcion: dto.descripcion,
    precio_base: Number(dto.precio_base),
  });

  return this.repo.save(evento);
}


async changeEstado(id_evento: string, estado: string) {
  const evento = await this.repo.findOne({ where: { id_evento } });

  if (!evento) throw new NotFoundException('Evento no encontrado');

  evento.estado = estado;

  return this.repo.save(evento);
}




  // ============================
  // ELIMINAR EVENTO + MEDIA
  // ============================
  async remove(id_evento: string) {
    return this.dataSource.transaction(async (manager) => {
      const evento = await manager.findOne(Evento, {
        where: { id_evento },
        relations: { media: true },
      });

      if (!evento) throw new NotFoundException('Evento no encontrado');

      // 1. Eliminar archivos físicos
      if (evento.media?.length) {
        evento.media.forEach((m) => {
          try {
            unlinkSync(`.${m.url}`);
          } catch (e: any) {
            console.error('Error borrando archivo:', e.message);
          }
        });
      }

      // 2. Eliminar registros de media
      await manager.delete(Media, { evento });

      // 3. Cambiar estado del evento (soft delete)
      evento.estado = 'inactivo';
      await manager.save(evento);

      return {
        message: 'Evento eliminado (estado inactivo y archivos borrados)',
      };
    });
  }
}