import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "src/admin/permissions/entities/permission.entity";
import { Repository } from "typeorm";

export class PermissionsSeeder {
    constructor (
        @InjectRepository(Permission)
        private readonly permisorepo: Repository<Permission>
    ){}

    async run() {
        const permisos = [
          { nombre: 'crear_usuarios', descripcion: 'crear, editar, eliminar usuarios internos' },
          { nombre: 'aprobar_contratos', descripcion: 'aprobar, modificar o cancelar contratos.'},
          { nombre: 'crear_eventos', descripcion: 'crear y administrar eventos musicales' },
        ];
    
        for (const permis of permisos) {
          const exists = await this.permisorepo.findOne({ where: { nombre: permis.nombre } });
          if (!exists) {
            await this.permisorepo.save(this.permisorepo.create(permis));
          }
        }
    
        console.log('Permisos predefinidos creados');
      }


}