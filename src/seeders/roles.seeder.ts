import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/roles/entities/role.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesSeeder{
    constructor(
        @InjectRepository(Role)
        private readonly rolerepo: Repository<Role>,

       
    ){}
     async run() {
        const roles = [
          { nombre: 'admin', descripcion: 'Acceso total al sistema' },
          { nombre: 'editor', descripcion: 'Puede editar contenido' },
          { nombre: 'viewer', descripcion: 'Solo lectura' },
        ];
    
        for (const role of roles) {
          const exists = await this.rolerepo.findOne({ where: { nombre: role.nombre } });
          if (!exists) {
            await this.rolerepo.save(this.rolerepo.create(role));
          }
        }
    
        console.log('Roles predefinidos creados');
      }
}