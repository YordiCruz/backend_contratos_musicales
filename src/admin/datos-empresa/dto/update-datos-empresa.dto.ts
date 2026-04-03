import { PartialType } from '@nestjs/swagger';
import { CreateDatosEmpresaDto } from './create-datos-empresa.dto';

export class UpdateDatosEmpresaDto extends PartialType(CreateDatosEmpresaDto) {}
