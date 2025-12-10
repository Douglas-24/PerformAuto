import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { apiResponse } from 'src/core/utils/apiResponse';

@Controller('aws-s3')
export class AwsS3Controller {
  constructor(private readonly awsS3Service: AwsS3Service) { }

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File): Promise<successfulResponse> {
    const url = await this.awsS3Service.uploadFile(file);
    return apiResponse(200, 'Imagen subida correctamente', url)
  }

  @Post('upload-files')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]): Promise<successfulResponse> {
    const urls = await this.awsS3Service.uploadFiles(files);
    return apiResponse(200, 'Imágenes subidas correctamente', urls);
  }
}
