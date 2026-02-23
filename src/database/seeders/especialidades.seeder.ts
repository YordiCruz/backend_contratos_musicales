import { InjectRepository } from '@nestjs/typeorm';
import { CategoriasEspecialidad } from 'src/admin/especialidades/categorias_especialidads/entities/categorias_especialidad.entity';
import { Especialidad } from 'src/admin/especialidades/especialidads/entities/especialidad.entity';
import { Repository } from 'typeorm';

export class EspecialidadesSeeder {
  constructor(
    @InjectRepository(Especialidad)
    private readonly especialidadRepo: Repository<Especialidad>,

    @InjectRepository(CategoriasEspecialidad)
    private readonly categoriaRepo: Repository<CategoriasEspecialidad>,

  ) {}

  async run() {

  const categorias = await this.categoriaRepo.find();
  const ids = categorias.map(cat => cat.id);

  const especialidades = [
    { nombre: 'Guitarra', id_categoria: ids[0] },
    { nombre: 'Bajo', id_categoria: ids[0] },
    { nombre: 'Acordeón', id_categoria: ids[0] },

    { nombre: 'Trompeta', id_categoria: ids[1] },

    { nombre: 'Teclado', id_categoria: ids[2] },

    { nombre: 'Batería', id_categoria: ids[3] },

    { nombre: 'Vocal', id_categoria: ids[4] },
  ];

  for (const esp of especialidades) {
    const exists = await this.especialidadRepo.findOne({
      where: { nombre: esp.nombre },
    });

    if (!exists) {
      await this.especialidadRepo.save(
        this.especialidadRepo.create({
          nombre: esp.nombre,
          categoria: { id: esp.id_categoria }
        })
      );
    }
  }

  console.log('Especialidades predefinidas creadas');
}


}