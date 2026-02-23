import { Injectable } from '@nestjs/common';
import { CreateCategoriasEspecialidadDto } from './dto/create-categorias_especialidad.dto';
import { UpdateCategoriasEspecialidadDto } from './dto/update-categorias_especialidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriasEspecialidad } from './entities/categorias_especialidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasEspecialidadsService {

  constructor(
    @InjectRepository(CategoriasEspecialidad)
    private readonly categorepo: Repository<CategoriasEspecialidad>

  ){}

  create(createCategoriasEspecialidadDto: CreateCategoriasEspecialidadDto) {
    return 'This action adds a new categoriasEspecialidad';
  }

  async findAll() {
    return await this.categorepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriasEspecialidad`;
  }

  update(id: number, updateCategoriasEspecialidadDto: UpdateCategoriasEspecialidadDto) {
    return `This action updates a #${id} categoriasEspecialidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriasEspecialidad`;
  }
}
