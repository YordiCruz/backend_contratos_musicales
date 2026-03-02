import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {

  constructor(
    @InjectRepository(Categoria)
    private readonly caterepo: Repository<Categoria>

  ){}
  async create(createCategoriaDto: CreateCategoriaDto, req: any) {
   
    const exiscate = await this.caterepo.findOne({
      where: { nombre: createCategoriaDto.nombre }
    });

    if(exiscate){
      throw new NotFoundException('categoria existente')
    }

      const cat = this.caterepo.create({
      ...createCategoriaDto,
      creado_por: req.user.id,
    });

  
    return this.caterepo.save(cat);

  }

  findAll() {
    return this.caterepo.find()
  }

  async findOne(id: string) {

   const categoria = await this.caterepo.findOne({
    where: { id_categoria: id }, // UUID como string
  });

  if (!categoria) {
    throw new NotFoundException(`Categoría no encontrada`);
  }

  return categoria;

  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto, req: any) {
    await this.caterepo.update(
      id, 
      {
      ...updateCategoriaDto, 
      actualizado_por: req.user.id }
    )

    return this.caterepo.findOne({
      where: { id_categoria: id }
    });

  }

  async remove(id: string) {

    await this.caterepo.update(id, {estado: 'inactivo'});

    await this.caterepo.softDelete(id);

    return { message: 'Categoria desactivada correctamente' };

  }
}
