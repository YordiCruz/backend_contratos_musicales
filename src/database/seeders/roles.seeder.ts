import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "../../admin/roles/entities/role.entity";
import { Permission } from "../../admin/permissions/entities/permission.entity";

@Injectable()
export class RolesSeeder {
  constructor(
    @InjectRepository(Role)
    private readonly rolerepo: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async run() {
    const allpermissions = await this.permissionRepo.find();

    const roles = [
      {
        nombre: 'admin',
        descripcion: 'Acceso total al sistema',
        permissions: allpermissions,
      },
      {
        nombre: 'empleado',
        descripcion: 'Puede administrar eventos',
        permissions: allpermissions.filter(p => p.nombre === 'crear_eventos'),
      },
      {
        nombre: 'viewer',
        descripcion: 'Solo lectura',
        permissions: allpermissions.filter(p => p.nombre === 'aprobar_contratos'),
      },
    ];

 for (const role of roles) {
  let savedRole = await this.rolerepo.findOne({ where: { nombre: role.nombre } });

  if (!savedRole) {
    // Guarda el rol sin permisos
    savedRole = await this.rolerepo.save({
      nombre: role.nombre,
      descripcion: role.descripcion,
    });

    // Extrae solo los IDs de los permisos
    const permissionIds = role.permissions.map(p => p.id);

    // Añade las relaciones explícitamente
    await this.rolerepo
      .createQueryBuilder()
      .relation(Role, 'permissions')
      .of(savedRole.id)
      .add(permissionIds);
  }

  // Verificación siempre
  const check = await this.rolerepo.findOne({
    where: { id: savedRole.id },
    relations: { permissions: true },
  });
  console.log(`Permisos del rol ${role.nombre}:`, check?.permissions);
}
 

    console.log('Roles predefinidos creados con permisos');
  }

}