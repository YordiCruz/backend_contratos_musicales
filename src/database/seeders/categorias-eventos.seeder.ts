import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/admin/eventos/categorias/entities/categoria.entity';
import { Repository } from 'typeorm';

export class CategoriasEventoSeeder {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  async run() {
    const categorias = [
      { nombre: 'Bodas', descripcion: 'Eventos musicales en vivo' },
      { nombre: 'Cumpleaños', descripcion: 'Celebraciones y fiestas' },
      { nombre: 'Bautizos', descripcion: 'Celebraciones y fiestas' },
      { nombre: 'Aniversarios', descripcion: 'Celebraciones y fiestas' },
    ];

    for (const cat of categorias) {
      const exists = await this.categoriaRepo.findOne({
        where: { nombre: cat.nombre },
      });

      if (!exists) {
        await this.categoriaRepo.save(
          this.categoriaRepo.create({
            nombre: cat.nombre,
            descripcion: cat.descripcion,
          }),
        );
      }
    }

    console.log('Categorías de evento predefinidas creadas');
  }
}