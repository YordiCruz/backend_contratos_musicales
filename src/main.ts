import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { RolesSeeder } from './database/seeders/roles.seeder';
import { PermissionsSeeder } from './database/seeders/permissions.seeder';
import { EspecialidadesSeeder } from './database/seeders/especialidades.seeder';
import { CategoriasEspecialidadSeeder } from './database/seeders/categorias-especialidad.seeder';
import { join } from 'path';

import * as express from 'express';


async function bootstrap() {



  const app = await NestFactory.create(AppModule);
// if (process.env.SEED === 'true'){
    const permissionsSeeder = app.get(PermissionsSeeder);
await permissionsSeeder.run();

  const seeders = app.get(RolesSeeder);
  await seeders.run();

  const categoriaseeders = app.get(CategoriasEspecialidadSeeder);
  await categoriaseeders.run();

  const especialidadseeders = app.get(EspecialidadesSeeder);
  await especialidadseeders.run();

// }

app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));


  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  
  const config = new DocumentBuilder()
    .setTitle('Pagina web para la gestion de informacion de contratos musicales')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('endpoints')
    .addBearerAuth()  //para que se pueda usar el token en swagger
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

 


  await app.listen(process.env.PORT ?? 3070);


}
bootstrap();
