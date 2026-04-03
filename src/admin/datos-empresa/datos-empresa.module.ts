import { Module } from '@nestjs/common';
import { DatosEmpresaService } from './datos-empresa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatosEmpresa } from './entities/datos-empresa.entity';

@Module({
  //controllers: [DatosEmpresaController],
  providers: [DatosEmpresaService],
  imports:[TypeOrmModule.forFeature([DatosEmpresa])],
  exports:[DatosEmpresaService]
})
export class DatosEmpresaModule {}
