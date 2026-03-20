import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';
import { FiltrosPersonaDto } from './dto/filtros-persona.dto';
import { ResponsePersonaDto } from './dto/reponse-persona.dto';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PersonasService {

    constructor(
        @InjectRepository(Persona)
        private readonly personarepo: Repository<Persona>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,


        // @InjectRepository(Integrante)
        // private readonly integranteRepo: Repository<Integrante>

        // @InjectRepository(Reemplazo)
        // private readonly reemplazoRepo: Repository<Reemplazo>

    ){}

    create(createperson: CreatePersonaDto){
        const person = this.personarepo.create(createperson);
        return this.personarepo.save(person);

    }

      async findAll(
        filters: FiltrosPersonaDto
      ): Promise<ResponsePersonaDto[]> {

        const page = filters.page || 1;
        const limit = filters.limit || 10;

        const query = this.personarepo.createQueryBuilder('persona')
      // Orden dinámico
      const sortField = filters.sort || 'persona.creado_en';
      const sortOrder = filters.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

      query.orderBy(sortField, sortOrder);



        if (filters.search) {
          query.andWhere('persona.nombre LIKE :search', {
            search: `%${filters.search}%`,
          });
        }

        if (filters.documento_identidad) {
          query.andWhere('persona.documento_identidad = :documento_identidad', {
            documento_identidad: filters.documento_identidad,
          });
        }

        const persons = await query
          .skip((page - 1) * limit)
          .take(filters.limit)
          .getMany();



       return persons.map(person => ({
        id: person.id,
        nombre: person.nombre,
        apellido: person.apellido,
        documento_identidad: person.documento_identidad,
        email: person.email,
        telefono: person.telefono,
        estado: person.estado


       })
      )
      }

      async findOne(id: string): Promise<Persona> {
        const usr = await this.personarepo.findOne({
          where: { id } });
       if(!usr) {
              throw new Error('Usuario no encontrado');

            }
       return usr;


     }

     async update(id: string, updatePersonaDto: UpdatePersonaDto): Promise<Persona> {
      const user = await this.personarepo.findOne({where :{id} })
      if (!user) {
        throw new Error('Persona no encontrada');
      }
      const update = Object.assign(user, updatePersonaDto)
      const saved = await this.personarepo.save(update)
      if (!saved) {
      throw new Error('No se pudo actualizar la persona');
      }
      return saved;
    }


   async remove(id: string) {
  const persona = await this.findOne(id);

  const tieneUsuario = await this.userRepo.findOne({ where: { persona: { id } } });
  // const tieneIntegrante = await this.integranteRepo.findOne({ where: { persona: { id } } });
  // const tieneReemplazo = await this.reemplazoRepo.findOne({ where: { persona: { id } } });

  // || tieneIntegrante || tieneReemplazo

  if (tieneUsuario ) {
    throw new BadRequestException(
      'No se puede eliminar la persona porque está asociada a otro módulo'
    );
  }

  return await this.personarepo.remove(persona);
}

}
