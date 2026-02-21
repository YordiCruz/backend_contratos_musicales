import { Module } from '@nestjs/common';
import { ReemplazosService } from './reemplazos.service';
import { ReemplazosController } from './reemplazos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reemplazo } from './entities/reemplazo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reemplazo])],
  controllers: [ReemplazosController],
  providers: [ReemplazosService],
})
export class ReemplazosModule {}
