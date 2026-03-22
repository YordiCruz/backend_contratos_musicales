import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';

import { MediaService } from './media.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { mediaUploadConfig } from './media-upload-config';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  // SUBIR ARCHIVOS
  @Post(':id_evento')
  @UseInterceptors(FilesInterceptor('files', 10, mediaUploadConfig))
  uploadMedia(
    @Param('id_evento') id_evento: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.mediaService.createMany(id_evento, files);
  }

  // LISTAR MEDIA POR EVENTO
  @Get('evento/:id_evento')
  findByEvento(@Param('id_evento') id_evento: string) {
    return this.mediaService.findByEvento(id_evento);
  }

  // OBTENER UNA MEDIA
  @Get(':id_media')
  findOne(@Param('id_media') id_media: string) {
    return this.mediaService.findOne(id_media);
  }

  // CAMBIAR VISIBILIDAD
  @Patch('visibilidad/:id_media')
  changeVisibility(
    @Param('id_media') id_media: string,
    @Body('visible') visible: boolean,
  ) {
    return this.mediaService.changeVisibility(id_media, visible);
  }

  // ELIMINAR MEDIA
  @Delete(':id_media')
  remove(@Param('id_media') id_media: string) {
    return this.mediaService.remove(id_media);
  }
}