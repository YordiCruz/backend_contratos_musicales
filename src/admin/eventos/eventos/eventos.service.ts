import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Categoria } from '../categorias/entities/categoria.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { CreateMediaDto } from '../media/dto/create-media.dto';
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

  // eventos.service.ts
  async createEventoConMedia(dto: CreateEventoDto, medias: CreateMediaDto[]) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        // 1. Validar categoría
        const categoria = await manager.findOne(Categoria, {
          where: { id_categoria: dto.id_categoria },
        });
        if (!categoria) {
          throw new NotFoundException('Categoría no encontrada');
        }

        const existingEvento = await manager.findOne(Evento, {
          where: { nombre: dto.nombre },
        });
        if (existingEvento) {
          throw new Error(`Ya existe un evento con el nombre "${dto.nombre}"`);
        }

        // 2. Crear evento
        const evento = manager.create(Evento, {
          nombre: dto.nombre,
          descripcion: dto.descripcion,
          precio_base: dto.precio_base,
          descuento: dto.descuento ?? 0,
          categoria,
          // creado_por: { id_user: userId } // si manejas auth
        });
        await manager.save(evento);

        // 3. Crear medias asociadas
        if (medias && medias.length > 0) {
          const mediaEntities = medias.map((m) =>
            manager.create(Media, {
              tipo: m.tipo,
              url: m.url, // aquí guardas la ruta del archivo subido
              descripcion: m.descripcion,
              orden: m.orden,
              visibilidad_publica: m.visibilidad_publica ?? true,
              evento,
            }),
          );
          await manager.save(mediaEntities);
        }

        // 4. Retornar evento con relaciones cargadas
        return manager.findOne(Evento, {
          where: { id_evento: evento.id_evento },
          relations: ['categoria', 'media'],
        });
      });
    } catch (error) {
      throw new Error(`Error al crear evento con media: ${error.message}`);
    }
  }

  findAll() {
    return this.repo.find({ relations: ['categoria', 'media'] });
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id_evento: id },
      relations: ['categoria', 'media'],
    });
  }

 async updateEventoConMedia(
  id_evento: string,
  dto: UpdateEventoDto,
  medias?: CreateMediaDto[],
  replaceAll: boolean = true, // flag para decidir el modo
) {
  return this.dataSource.transaction(async (manager) => {
    const evento = await manager.findOne(Evento, {
      where: { id_evento },
      relations: ['media'],
    });
    if (!evento) throw new NotFoundException('Evento no encontrado');

    // Actualizar datos del evento
    manager.merge(Evento, evento, {
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      precio_base: Number(dto.precio_base),
      descuento: dto.descuento ? Number(dto.descuento) : 0,
    });
    await manager.save(evento);

    // Manejo de medias
    if (medias && medias.length > 0) {
      if (replaceAll) {
        // 🔹 Modo reemplazo total
        if (evento.media?.length) {
          evento.media.forEach((m) => {
            try {
              unlinkSync(`.${m.url}`);
            } catch (e) {
              console.error('Error borrando archivo viejo:', e.message);
            }
          });
        }

        await manager.delete(Media, { evento });

        const nuevasMedias = medias.map((m) =>
          manager.create(Media, { ...m, evento }),
        );
        await manager.save(nuevasMedias);
      } else {
        // 🔹 Modo actualización parcial
        for (const nueva of medias) {
          const existente = evento.media.find((m) => m.url === nueva.url);
          if (!existente) {
            const mediaEntity = manager.create(Media, { ...nueva, evento });
            await manager.save(mediaEntity);
          }
        }
      }
    }

    return manager.findOne(Evento, {
      where: { id_evento },
      relations: ['categoria', 'media'],
    });
  });
}

  async remove(id_evento: string) {
    return this.dataSource.transaction(async (manager) => {
      const evento = await manager.findOne(Evento, {
        where: { id_evento },
        relations: ['media'],
      });
      if (!evento) throw new NotFoundException('Evento no encontrado');

      // 1. Eliminar archivos físicos
      if (evento.media?.length) {
        evento.media.forEach((m) => {
          try {
            unlinkSync(`.${m.url}`);
          } catch (e) {
            console.error('Error borrando archivo:', e.message);
          }
        });
      }

      // 2. Eliminar registros de media
      await manager.delete(Media, { evento });

      // 3. Cambiar estado del evento (opcional, si quieres soft delete)
      evento.estado = 'inactivo'; // o false
      await manager.save(evento);

      return {
        message: 'Evento eliminado (estado inactivo y archivos borrados)',
      };
    });
  }
}
