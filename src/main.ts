import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { RolesSeeder } from './database/seeders/roles.seeder';
import { PermissionsSeeder } from './database/seeders/permissions.seeder';

async function bootstrap() {



  const app = await NestFactory.create(AppModule);

    const permissionsSeeder = app.get(PermissionsSeeder);
await permissionsSeeder.run();

  const seeders = app.get(RolesSeeder);
  await seeders.run();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  
  const config = new DocumentBuilder()
    .setTitle('Pagina web para la gestion de informacion de contratos musicales')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('endpoints')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

 


  await app.listen(process.env.PORT ?? 3000);


}
bootstrap();
