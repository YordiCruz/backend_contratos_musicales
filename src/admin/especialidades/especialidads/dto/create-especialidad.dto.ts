import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class CreateEspecialidadDto {

    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    @IsOptional()
    descripcion?: string

    @IsString({ message: 'El estado debe ser activo o inactivo' })
    @IsIn(['activo', 'inactivo'])
    estado?: string

}
