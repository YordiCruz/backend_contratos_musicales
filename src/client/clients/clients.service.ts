import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from 'src/admin/personas/entities/persona.entity';
import { DataSource, Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { User } from 'src/admin/users/entities/user.entity';
import { FiltroClientDto } from './dto/filtro-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { CreateClientDataDto } from './dto/create-client-data.dto';

@Injectable()
export class ClientsService {

  constructor(
      @InjectRepository(Client)
      private readonly clienteRepo: Repository<Client>,

      @InjectRepository(Persona)
      private readonly personaRepo: Repository<Persona>,

    // @InjectRepository(User)
    // private readonly userRepo: Repository<User>,

    private readonly dataSource: DataSource

  ){}

  
 async create(createClientDto: CreateClientDto, user: any): Promise<Client> {
  return await this.dataSource.transaction(async manager => {

    const { persona: personaDto, cliente: clienteDto } = createClientDto;

    // 1. Validar que la persona no exista
    const existe = await manager.findOne(Persona, {
      where: { documento_identidad: personaDto.documento_identidad}
    });

    if (existe) {
      throw new Error(`La persona con documento '${personaDto.documento_identidad}' ya existe`);
    }

    // 2. Guardar persona
    const persona = await manager.save(Persona, personaDto);

    const nuevoCliente = manager.create(Client, {
      ...clienteDto,
      persona,
      registrado_por: user?.id ? { id: user.id } : undefined

    });

    // 4. Guardar usuario
    return await manager.save(Client, nuevoCliente);
  });
}



 async findAll(
    filters: FiltroClientDto
  ): Promise<ClientResponseDto[]> {
 
    const page = filters.page || 1;
    const limit = filters.limit || 10;
  
    const query = this.clienteRepo.createQueryBuilder('cliente')
  // Orden dinámico
  const sortField = filters.sort || 'cliente.creado_en';
  const sortOrder = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  query.orderBy(sortField, sortOrder);



    if (filters.search) {
      query.andWhere('cliente.tipo_cliente LIKE :search', {
        search: `%${filters.search}%`,
      });
    }

    if (filters.estado) {
      query.andWhere('cliente.estado = :estado', {
        estado: filters.estado,
      });
    }

    const clients = await query
      .skip((page - 1) * limit)
      .take(filters.limit)
      .leftJoinAndSelect('cliente.persona', 'persona')
      .getMany();

      

   return clients.map(cliente => ({
    id: cliente.id,
    tipo_cliente: cliente.tipo_cliente,
    origen_registro: cliente.origen_registro,
    categoria: cliente.categoria,
    saldo_pendiente: cliente.saldo_pendiente,
    limite_credito: cliente.limite_credito,
    descuentos: cliente.descuentos,
    contacto_secundario: cliente.contacto_secundario,
    preferencia_contacto: cliente.preferencia_contacto,
    estado: cliente.estado,
    creado_en: cliente.creado_en,
    actualizado_en: cliente.actualizado_en,
    
   persona: cliente.persona ? {
  id: cliente.persona.id,
  nombre: cliente.persona.nombre,
  apellido: cliente.persona.apellido,
  email: cliente.persona.email,
  telefono: cliente.persona.telefono,
  documento_identidad: cliente.persona.documento_identidad
   }: null
   
   })
  
  )
  }


  findOne(id: string) {
    const cliente = this.clienteRepo.findOne({
      where: { id },
      relations: ['registrado_por','persona'],

    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con id: #${id} no encontrado`);
    }

    return cliente;
  }

 
   async update(id: string, updateclientDto: UpdateClientDto): Promise<UpdateResponseDto> {
     const cliente = await this.clienteRepo.findOne({where :{id} })
     if (!cliente) {
       throw new Error('Cliente no encontrado');
     }
 
       // ❗ Evitar que el DTO pise el ID
   if ('id' in updateclientDto) {
     delete (updateclientDto as any).id;
   }
 
   // ❗ Evitar que el DTO pise el documento_identidad
   if ('documento_identidad' in updateclientDto) {
     delete (updateclientDto as any).documento_identidad;
   }
 
     const update = Object.assign(cliente, updateclientDto)
     const saved = await this.clienteRepo.save(update)
     if (!saved) {
   throw new Error('No se pudo actualizar el cliente');
 }
 
     return {
       id: saved.id,
       categoria: saved.categoria,
       descuentos: saved.descuentos,
       contacto_secundario: saved.contacto_secundario,
       preferencia_contacto: saved.preferencia_contacto,
       estado: saved.estado,
     }
   }
async remove(id: string) {
  const client = await this.clienteRepo.findOne({ where: { id } });

  if (!client) {
    throw new Error('Cliente no encontrado');
  }

  client.estado = 'inactivo';
  client.deleted_at = new Date();
  await this.clienteRepo.save(client);

  return { message: 'Cliente desactivado correctamente' };
}

async createClientFromExistingPersona(idPersona: string, dto: CreateClientDataDto, user: any) {
  const persona = await this.personaRepo.findOne({ where: { id: idPersona } });

  if (!persona) {
    throw new NotFoundException('La persona no existe');
  }

  // Verificar que no tenga ya un usuario
  const existingCliente = await this.clienteRepo.findOne({ where: { persona: { id: idPersona } } });
  if (existingCliente) {
    throw new BadRequestException('Esta persona ya tiene datos de cliente registrados');
  }

  const client = this.clienteRepo.create({
    ...dto,
    persona,
    registrado_por: user?.id ? { id: user.id } : undefined

  });

  return await this.clienteRepo.save(client);
}



}
