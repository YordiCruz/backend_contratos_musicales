import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ubicacion } from './entities/ubicacion.entity';

@Injectable()
export class UbicacionService {
  constructor(
    @InjectRepository(Ubicacion)
    private ubicacionRepo: Repository<Ubicacion>,
  ) {}

  // Crear ubicación
  async create(data: Partial<Ubicacion>) {
    const ubicacion = this.ubicacionRepo.create(data);
    return this.ubicacionRepo.save(ubicacion);
  }

  // Obtener todas las ubicaciones
  async findAll() {
    return this.ubicacionRepo.find({ relations: { contratos: true } });
  }

  // Obtener una ubicación por id
  async findOne(id: string) {
    const ubicacion = await this.ubicacionRepo.findOne({
      where: { id_ubicacion: id },
      relations: { contratos: true },
    });
    if (!ubicacion) throw new NotFoundException('Ubicación no encontrada');
    return ubicacion;
  }

  // Actualizar ubicación
  async update(id: string, data: Partial<Ubicacion>) {
    const ubicacion = await this.findOne(id);
    Object.assign(ubicacion, data);
    return this.ubicacionRepo.save(ubicacion);
  }

  // Eliminar ubicación
  async remove(id: string) {
    const ubicacion = await this.findOne(id);
    return this.ubicacionRepo.remove(ubicacion);
  }


  


}