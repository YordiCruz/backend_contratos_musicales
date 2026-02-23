export class CategoriaResponseDto {
  id: string;
  nombre: string;
  icono?: string;
  estado: string;
}

export class ResponseEspecialidadDto {
  id: string;
  nombre: string;
  descripcion?: string;
  estado: string;
  categoria: CategoriaResponseDto | null;
  creado_en: Date;
  actualizado_en: Date;
}