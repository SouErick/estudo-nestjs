import { Controller, Get, Request } from '@nestjs/common';
import { FilesService } from './files.service';
import { Request as ExpressRequest } from 'express';

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
}