import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class CreateEspecialidadDto {

    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsUUID()
    id_categoria:string

    @IsString()
    @IsOptional()
    descripcion?: string

    

}
