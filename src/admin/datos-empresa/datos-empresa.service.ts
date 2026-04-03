import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatosEmpresa } from './entities/datos-empresa.entity';
import { CreateDatosEmpresaDto } from './dto/create-datos-empresa.dto';
import { UpdateDatosEmpresaDto } from './dto/update-datos-empresa.dto';

@Injectable()
export class DatosEmpresaService {
  constructor(
    @InjectRepository(DatosEmpresa)
    private readonly datosRepo: Repository<DatosEmpresa>,
  ) {}

async crear(dto: CreateDatosEmpresaDto): Promise<DatosEmpresa> {
  try {
    const datos = this.datosRepo.create(dto);
    return await this.datosRepo.save(datos);
  } catch (error) {
    throw new BadRequestException(error.message || 'Error al crear empresa');
  }
}

async actualizar(id: string, dto: UpdateDatosEmpresaDto) {
  const empresa = await this.obtenerPorId(id);

  const actualizado = this.datosRepo.merge(empresa, dto);

  return await this.datosRepo.save(actualizado);
}


  async obtenerTodos(): Promise<DatosEmpresa[]> {
    return await this.datosRepo.find();
  }

  async obtenerPorId(id: string): Promise<DatosEmpresa> {
    const datos = await this.datosRepo.findOne({ where: { id } });
    if (!datos) throw new NotFoundException('Datos de empresa no encontrados');
    return datos;
  }

  async eliminar(id: string): Promise<void> {
    await this.datosRepo.delete(id);
  }

  async obtenerUbicacionBase(): Promise<{ lat: number; lng: number }> {
    const datos = await this.datosRepo.findOne({ where: {} });
    if (!datos) throw new NotFoundException('No se definió ubicación base');
    return { lat: datos.latitud, lng: datos.longitud };
  }
}
