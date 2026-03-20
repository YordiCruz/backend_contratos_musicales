"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const roles_seeder_1 = require("./database/seeders/roles.seeder");
const permissions_seeder_1 = require("./database/seeders/permissions.seeder");
const especialidades_seeder_1 = require("./database/seeders/especialidades.seeder");
const categorias_especialidad_seeder_1 = require("./database/seeders/categorias-especialidad.seeder");
const path_1 = require("path");
const express = require("express");
const tipo_servicio_especialidades_seeder_1 = require("./database/seeders/tipo-servicio-especialidades.seeder");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: [
                'http://localhost:4200',
                'http://127.0.0.1:4200',
            ],
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        },
    });
    if (process.env.SEED === 'true') {
        const permissionsSeeder = app.get(permissions_seeder_1.PermissionsSeeder);
        await permissionsSeeder.run();
        const seeders = app.get(roles_seeder_1.RolesSeeder);
        await seeders.run();
        const categoriaseeders = app.get(categorias_especialidad_seeder_1.CategoriasEspecialidadSeeder);
        await categoriaseeders.run();
        const especialidadseeders = app.get(especialidades_seeder_1.EspecialidadesSeeder);
        await especialidadseeders.run();
        const servicioespecialidadseeders = app.get(tipo_servicio_especialidades_seeder_1.ServicioEspecialidadSeeder);
        await servicioespecialidadseeders.run();
    }
    app.use('/uploads', express.static((0, path_1.join)(__dirname, '..', 'uploads')));
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Pagina web para la gestion de informacion de contratos musicales')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('endpoints')
        .addBearerAuth()
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    await app.listen(process.env.PORT ?? 3070);
}
bootstrap();
//# sourceMappingURL=main.js.map