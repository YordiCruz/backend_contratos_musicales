import { Injectable } from '@nestjs/common';
import { CreateCategoriasEspecialidadDto } from './dto/create-categorias_especialidad.dto';
import { UpdateCategoriasEspecialidadDto } from './dto/update-categorias_especialidad.dto';

@Injectable()
export class CategoriasEspecialidadsService {
  create(createCategoriasEspecialidadDto: CreateCategoriasEspecialidadDto) {
    return 'This action adds a new categoriasEspecialidad';
  }

  findAll() {
    return `This action returns all categoriasEspecialidads`;
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
