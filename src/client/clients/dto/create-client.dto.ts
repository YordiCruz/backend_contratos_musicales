import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {  ValidateNested } from 'class-validator';
import { CreateClientDataDto } from './create-client-data.dto';
import { CreatePersonaDto } from '../../../admin/personas/dto/create-persona.dto';

export class CreateClientDto {

  @ApiProperty({ type: () => CreatePersonaDto })
  @ValidateNested()
  @Type(() => CreatePersonaDto)
  persona: CreatePersonaDto;


  @ApiProperty({ type: () => CreateClientDataDto })
  @ValidateNested()
  @Type(() => CreateClientDataDto)
  cliente: CreateClientDataDto;

}