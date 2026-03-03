import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoServicioEspecialidad } from 'src/admin/contratos/entities/tipo-servicio-especialidad.entity';
import { Especialidad } from 'src/admin/especialidades/especialidads/entities/especialidad.entity';

@Injectable()
export class ServicioEspecialidadSeeder {
  constructor(
    @InjectRepository(TipoServicioEspecialidad)
    private readonly servicioRepo: Repository<TipoServicioEspecialidad>,
    @InjectRepository(Especialidad)
    private readonly especialidadRepo: Repository<Especialidad>,
  ) {}

  async run() {
    // Buscar ids de especialidades ya creadas
    const guitarra = await this.especialidadRepo.findOneBy({ nombre: 'Guitarra' });
    const violin = await this.especialidadRepo.findOneBy({ nombre: 'Violin' });
    const guitarron = await this.especialidadRepo.findOneBy({ nombre: 'Guitarron' });
    const trompeta1 = await this.especialidadRepo.findOneBy({ nombre: 'Trompeta1' });
    const trompeta2 = await this.especialidadRepo.findOneBy({ nombre: 'Trompeta2' });
    const voz = await this.especialidadRepo.findOneBy({ nombre: 'Vocal' });

    // Mariachi
    await this.servicioRepo.save([
      { tipo_servicio: 'mariachi', especialidad: guitarra!, requerido: true },
      { tipo_servicio: 'mariachi', especialidad: violin!, requerido: true },
      { tipo_servicio: 'mariachi', especialidad: guitarron!, requerido: true },
      { tipo_servicio: 'mariachi', especialidad: trompeta1!, requerido: true },
      { tipo_servicio: 'mariachi', especialidad: trompeta2!, requerido: true },
      { tipo_servicio: 'mariachi', especialidad: voz!, requerido: true },
    ]);

    // Orquesta
    const bateria = await this.especialidadRepo.findOneBy({ nombre: 'Batería' });
    const bajo = await this.especialidadRepo.findOneBy({ nombre: 'Bajo' });
    const teclado = await this.especialidadRepo.findOneBy({ nombre: 'Teclado' });
    const voz1 = await this.especialidadRepo.findOneBy({ nombre: 'Vocal' });
    const voz2 = await this.especialidadRepo.findOneBy({ nombre: 'Vocal2' });
    const saxofon = await this.especialidadRepo.findOneBy({ nombre: 'Saxofon' });
    const timbal = await this.especialidadRepo.findOneBy({ nombre: 'Timbales' });

    await this.servicioRepo.save([
      { tipo_servicio: 'orquesta', especialidad: bateria!, requerido: true },
      { tipo_servicio: 'orquesta', especialidad: bajo!, requerido: true },
      { tipo_servicio: 'orquesta', especialidad: guitarra!, requerido: true },
      { tipo_servicio: 'orquesta', especialidad: teclado!, requerido: true },
      { tipo_servicio: 'orquesta', especialidad: voz1!, requerido: true },
      { tipo_servicio: 'orquesta', especialidad: voz2!, requerido: true },
      { tipo_servicio: 'orquesta', especialidad: trompeta1!, requerido: true },
      { tipo_servicio: 'orquesta', especialidad: trompeta2!, requerido: true },
      { tipo_servicio: 'orquesta', especialidad: saxofon!, requerido: true },
      { tipo_servicio: 'orquesta', especialidad: timbal!, requerido: true },
    ]);

    console.log('Seeder de servicio-especialidades ejecutado correctamente');
  }
}