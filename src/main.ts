import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { RolesSeeder } from './database/seeders/roles.seeder';
import { PermissionsSeeder } from './database/seeders/permissions.seeder';
import { EspecialidadesSeeder } from './database/seeders/especialidades.seeder';
import { CategoriasEspecialidadSeeder } from './database/seeders/categorias-especialidad.seeder';
import { join } from 'path';

import * as express from 'express';
import { ServicioEspecialidadSeeder } from './database/seeders/tipo-servicio-especialidades.seeder';
import { ValidationError } from 'class-validator';


async function bootstrap() {



  const app = await NestFactory.create(AppModule, {
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
    const permissionsSeeder = app.get(PermissionsSeeder);
    await permissionsSeeder.run();

    const seeders = app.get(RolesSeeder);
    await seeders.run();

    const categoriaseeders = app.get(CategoriasEspecialidadSeeder);
    await categoriaseeders.run();

    const especialidadseeders = app.get(EspecialidadesSeeder);
    await especialidadseeders.run();

    const servicioespecialidadseeders = app.get(ServicioEspecialidadSeeder);
    await servicioespecialidadseeders.run();
}
console.log(join(__dirname, '..', 'uploads'));
app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));


  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,
    transform: true,
  
    exceptionFactory: (errors) => {

      const mensajes = obtenerMensajes(errors);

      return new BadRequestException(mensajes);
    }

  }));
  
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


//para messageservice de manera que no muestre con user.mensaje persona.mensaje
function obtenerMensajes(errors: ValidationError[]): string[] {

const mensajes: string[] = [];

for (const error of errors) {

  if (error.constraints) {
    mensajes.push(...Object.values(error.constraints));
  }

  if (error.children?.length) {
    mensajes.push(...obtenerMensajes(error.children));
  }

}

return mensajes;
}
