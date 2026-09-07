import {
  Controller, Get, Post,
  BadRequestException, Request, UploadedFile, UseInterceptors, Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Request as ExpressRequest } from 'express';
import { Multer} from 'multer';

interface AuthenticatedRequest extends ExpressRequest {
  user: { id: number; email: string };
}

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  list(@Request() req: AuthenticatedRequest) {
    return this.filesService.list(req.user.id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Request() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File & { buffer: Buffer },  // ← adiciona buffer explícito
  ) {
    if (!file) {
      throw new BadRequestException(
        'Envie um arquivo no campo multipart "file".',
      );
    }

    return this.filesService.upload(
      req.user.id,
      file.originalname,
      file.buffer,
      file.mimetype,
    );
  }

    @Get(':key/download')
    async donwload(@Param('key') key: string){
      return this.filesService.getDownloadUrl(key);
    }
}