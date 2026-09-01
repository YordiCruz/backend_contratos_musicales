import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permission } from "../../admin/permissions/entities/permission.entity";
import { Role } from "../../admin/roles/entities/role.entity";

export class PermissionsSeeder {
  constructor(
    @InjectRepository(Permission)
    private readonly permisorepo: Repository<Permission>,

    @InjectRepository(Role)
    private readonly rolRepo: Repository<Role>,
  ) {}

  async run() {

    // -----------------------------
    // 1. Crear permisos si no existen
    // -----------------------------
    const permisos = [
      { nombre: 'crear_usuarios', descripcion: 'crear, editar, eliminar usuarios internos' },
      { nombre: 'aprobar_contratos', descripcion: 'aprobar, modificar o cancelar contratos.' },
      { nombre: 'crear_eventos', descripcion: 'crear y administrar eventos musicales' },
    ];

    const permisosCreados: Permission[] = [];

    for (const p of permisos) {
      let permiso = await this.permisorepo.findOne({ where: { nombre: p.nombre } });

      if (!permiso) {
        permiso = await this.permisorepo.save(this.permisorepo.create(p));
      }

      permisosCreados.push(permiso);
    }

    // -----------------------------
    // 2. Buscar roles existentes
    // -----------------------------
    const admin = await this.rolRepo.findOne({ where: { nombre: 'admin' }, relations: { permissions: true } });
    const viewer = await this.rolRepo.findOne({ where: { nombre: 'viewer' }, relations: { permissions: true } });
    const empleado = await this.rolRepo.findOne({ where: { nombre: 'empleado' }, relations: { permissions: true } });
    const cliente = await this.rolRepo.findOne({ where: { nombre: 'cliente' }, relations: { permissions: true } });

    if (!admin || !viewer || !empleado || !cliente) {
      console.error('Faltan roles en la base de datos');
      return;
    }

    // -----------------------------
    // 3. Asignar permisos según rol
    // -----------------------------

   const crearUsuarios = permisosCreados.find(p => p.nombre === 'crear_usuarios');
const aprobarContratos = permisosCreados.find(p => p.nombre === 'aprobar_contratos');
const crearEventos = permisosCreados.find(p => p.nombre === 'crear_eventos');

// Validación obligatoria
if (!crearUsuarios || !aprobarContratos || !crearEventos) {
  throw new Error('Faltan permisos en la base de datos');
}

    // ADMIN → todos
    admin.permissions = [crearUsuarios, aprobarContratos, crearEventos];
    await this.rolRepo.save(admin);

    // VIEWER → ninguno (solo lectura)
    viewer.permissions = [];
    await this.rolRepo.save(viewer);

    // EMPLEADO → eventos
    empleado.permissions = [crearEventos];
    await this.rolRepo.save(empleado);

    // CLIENTE → contratos
    cliente.permissions = [aprobarContratos];
    await this.rolRepo.save(cliente);

    console.log('Permisos creados y asignados a roles correctamente');
  }
}