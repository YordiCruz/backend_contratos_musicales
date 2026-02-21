import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReemplazoDto } from './dto/create-reemplazo.dto';
import { UpdateReemplazoDto } from './dto/update-reemplazo.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Reemplazo } from './entities/reemplazo.entity';
import { DataSource, Repository } from 'typeorm';
import { Persona } from '../personas/entities/persona.entity';
import { FiltrosReemplazoDto } from './dto/filtros-reemplazo.dto';
import { ResponseReemplazoDto } from './dto/response-reemplazo.dto';
import { CreateReemplazoDataDto } from './dto/create-reemplazo-data.dto';
import { ResponseUpdateReemplazoDto } from './dto/response-update-reemplazo.dto';

@Injectable()
export class ReemplazosService {

    constructor(
      @InjectRepository(Reemplazo)
      private readonly reemplazoRepo: Repository<Reemplazo>,
  
  
      @InjectDataSource()
      private readonly dataSource: DataSource
  
    ){}
  
  async create(createReemplazoDto: CreateReemplazoDto, user: any): Promise<Reemplazo> {
    return await this.dataSource.transaction(async manager => {
  
      const { persona: personaDto, reemplazo: reemplazoDto } = createReemplazoDto;
  
      // 1. Buscar persona por documento
      let persona = await manager.findOne(Persona, {
        where: { documento_identidad: personaDto.documento_identidad }
      });
  
      // 2. Si no existe, crearla
      if (!persona) {
        persona = await manager.save(Persona, personaDto);
      }
  
      // 3. Validar que no sea ya reemplazo
      const yaReemplazo = await manager.findOne(Reemplazo, {
        where: { persona: { id: persona.id } }
      });
  
      if (yaReemplazo) {
        throw new Error('Esta persona ya es un reemplazo');
      }
  
      // 4. Crear reemplazo
      const nuevoReemplazo = manager.create(Reemplazo, {
        ...reemplazoDto,
        persona,
        registrado_por: user?.id ? { id: user.id } : undefined
      });
  
      return await manager.save(Reemplazo, nuevoReemplazo);
    });
  }
  
  
   async findAll(
    filters: FiltrosReemplazoDto
  ): Promise<ResponseReemplazoDto[]> {
  
    const page = filters.page || 1;
    const limit = filters.limit || 10;
  
    const query = this.reemplazoRepo
      .createQueryBuilder('reemplazo')
      .leftJoinAndSelect('reemplazo.persona', 'persona');
  
    // Orden dinámico
    const sortField = filters.sort || 'reemplazo.creado_en';
    const sortOrder = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  
    query.orderBy(sortField, sortOrder);
  
    // Búsqueda general (nombre, apellido, email, CI, teléfono)
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
      query.andWhere('reemplazo.estado = :estado', {
        estado: filters.estado,
      });
    }
  
    const reemplazos = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  
    return reemplazos.map(reemplazo => ({
      id: reemplazo.id,
      tarifa_base_hora: reemplazo.tarifa_base_hora,
      moneda: reemplazo.moneda,
      estado: reemplazo.estado,
      disponible: reemplazo.disponible,
      creado_en: reemplazo.creado_en,
      actualizado_en: reemplazo.actualizado_en,
      eliminado_en: reemplazo.eliminado_en ?? null,
  
      persona: reemplazo.persona
        ? {
            id: reemplazo.persona.id,
            nombre: reemplazo.persona.nombre,
            apellido: reemplazo.persona.apellido,
            email: reemplazo.persona.email,
            telefono: reemplazo.persona.telefono,
            documento_identidad: reemplazo.persona.documento_identidad,
          }
        : null,
    }));
  }
  
    async findOne(id: string): Promise<Reemplazo> {
      const reemplazo = await this.reemplazoRepo.findOne({
        where: { id } });
     if(!reemplazo) {
            throw new Error('Reemplazo no encontrado');
            
          }
     return reemplazo;
  
  
   }
  
    async update(id: string, updateReemplazoDto: UpdateReemplazoDto): Promise<ResponseUpdateReemplazoDto> {
      const reempla = await this.reemplazoRepo.findOne({where :{id} })
      if (!reempla) {
        throw new Error('Reemplazo no encontrado');
      }
  
        // ❗ Evitar que el DTO pise el ID
    if ('id' in updateReemplazoDto) {
      delete (updateReemplazoDto as any).id;
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
      if (campo in updateReemplazoDto) {
        delete (updateReemplazoDto as any)[campo];
      }
    }
  
  
      const update = Object.assign(reempla, updateReemplazoDto)
      const saved = await this.reemplazoRepo.save(update)
      if (!saved) {
    throw new Error('No se pudo actualizar el reemplazo');
  }
  
      return {
        id: saved.id,
        tarifa_base_hora: saved.tarifa_base_hora,
        moneda: saved.moneda,
        estado: saved.estado,
        disponible: saved.disponible,
        creado_en: saved.creado_en,
        actualizado_en: saved.actualizado_en,
        eliminado_en: saved.eliminado_en ?? null
       
      }
    }
  
  
   async remove(id: string) {
    const reemplazo = await this.reemplazoRepo.findOne({ where: { id } });
  
    if (!reemplazo) {
      throw new Error('Reemplazo no encontrado');
    }
  
    reemplazo.estado = 'inactivo';
    reemplazo.eliminado_en = new Date();
    await this.reemplazoRepo.save(reemplazo);
  
    return { message: 'Reemplazo desactivado correctamente' };
  }
  
  
  async createReemplazoFromExistingPersona(idPersona: string, dto: CreateReemplazoDataDto, user: any) {
    const reemplazo = await this.reemplazoRepo.findOne({ where: { id: idPersona } });
  
    if (!reemplazo) {
      throw new NotFoundException('El reemplazo no existe');
    }
  
    // Verificar que no tenga datos de reemplazo
    const existingreemplazo = await this.reemplazoRepo.findOne({ where: { persona: { id: idPersona } } });
    if (existingreemplazo) {
      throw new BadRequestException('Esta persona ya tiene un reemplazo asignado');
    }
  
    const reempla = this.reemplazoRepo.create({
      ...dto,
      persona: { id: idPersona },
      registrado_por: user.id ? { id: user.id } : undefined

    });
  
    return await this.reemplazoRepo.save(reempla);
  }
}
