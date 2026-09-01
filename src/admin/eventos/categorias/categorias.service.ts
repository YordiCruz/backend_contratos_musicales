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
      creado_por: req.id,
    });

  
    return this.caterepo.save(cat);

  }

  findAll() {
    return this.caterepo.find({
      withDeleted:true
    })
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

async update(id: string, dto: any, user: any) {

  // Si solo viene estado, cambiar estado
  if (dto.estado) {
    await this.caterepo.update(
      { id_categoria: id },
      {
        estado: dto.estado,
        actualizado_por: user.id,
        actualizado_en: new Date()
      }
    );

    return { message: `Estado cambiado a ${dto.estado}` };
  }

  // Si vienen datos normales, actualizar datos
  await this.caterepo.update(
    { id_categoria: id },
    {
      ...dto,
      actualizado_por: user.id,
      actualizado_en: new Date()
    }
  );

  return this.caterepo.findOne({ where: { id_categoria: id } });
}
 
  async removes(id: string) {

    console.log('BUSCANDO:', await this.caterepo.findOne({ where: { id_categoria: id } }));

  // 1. Cambiar estado
  await this.caterepo.update(
    { id_categoria: id },
    { estado: 'inactivo' }
  );

  // 2. Soft delete real
  // await this.caterepo.softDelete({ id_categoria: id });

  return { message: 'Categoria desactivada correctamente' };
}

}
