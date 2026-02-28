import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { CreateMediaDto } from '../media/dto/create-media.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { existsSync } from 'fs';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  // eventos.controller.ts
@Post('upload-evento')
@UseInterceptors(FilesInterceptor('files', 5, { // hasta 5 archivos
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|mp4)$/)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes o videos'), false);
    }
  },
}))
async uploadEvento(
  @Body() dto: CreateEventoDto,
  @UploadedFiles() files: Express.Multer.File[],
) {
  if (!files || files.length === 0) {
    throw new Error('No se ha proporcionado ningún archivo');
  }

  const medias: CreateMediaDto[] = files.map((file, index) => ({
    tipo: file.mimetype.startsWith('video') ? 'video' : 'imagen',
    url: `/uploads/${file.filename}`,
    descripcion: 'Archivo subido',
    orden: index + 1,
    visibilidad_publica: true,
  }));

  return this.eventosService.createEventoConMedia(dto, medias);
}




  @Get()
  findAll() {
    return this.eventosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventosService.findOne(id);
  }


@Patch(':id')
@UseInterceptors(FilesInterceptor('files', 5, { // hasta 5 archivos
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
    },
  }),
}))
async updateEvento(
  @Param('id') id: string,
  @Body() dto: UpdateEventoDto,
  @UploadedFiles() files?: Express.Multer.File[],
) {
  dto.precio_base = Number(dto.precio_base);
  dto.descuento = dto.descuento ? Number(dto.descuento) : 0;

  let medias: CreateMediaDto[] | undefined;
  if (files && files.length > 0) {
    medias = files.map((file, index) => ({
      tipo: file.mimetype.startsWith('video') ? 'video' : 'imagen',
      url: `/uploads/${file.filename}`,
      descripcion: 'Archivo actualizado',
      orden: index + 1,
      visibilidad_publica: true,
    }));
  }

  return this.eventosService.updateEventoConMedia(id, dto, medias);
}


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventosService.remove(id);
  }
}
