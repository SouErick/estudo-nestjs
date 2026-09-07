import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { AuthModule } from '../auth/auth.module';
import { s3Provider } from './s3.provider';


@Module({
  imports: [AuthModule],  
  controllers: [FilesController],
  providers: [FilesService, s3Provider],
})
export class FilesModule {}