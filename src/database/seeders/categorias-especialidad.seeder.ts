import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriasEspecialidad } from '../../admin/especialidades/categorias_especialidads/entities/categorias_especialidad.entity';

export class CategoriasEspecialidadSeeder {
  constructor(
    @InjectRepository(CategoriasEspecialidad)
    private readonly categoriaRepo: Repository<CategoriasEspecialidad>,
  ) {}

  async run() {
    const categorias = [
      { nombre: 'Instrumentos de Cuerda' },
      { nombre: 'Instrumentos de Viento' },
      { nombre: 'Instrumentos de Teclado' },
      { nombre: 'Percusión' },
      { nombre: 'Vocal' },
    ];

    for (const cat of categorias) {
      const exists = await this.categoriaRepo.findOne({
        where: { nombre: cat.nombre },
      });

      if (!exists) {
        await this.categoriaRepo.save(this.categoriaRepo.create(cat));
      }
    }

    console.log('Categorías predefinidas creadas');
  }
}