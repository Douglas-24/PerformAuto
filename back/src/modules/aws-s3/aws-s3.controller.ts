import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { successfulResponse } from 'src/core/interfaces/successfulResponse.interface';
import { apiResponse } from 'src/core/utils/apiResponse';

@Controller('aws-s3')
export class AwsS3Controller {
  constructor(private readonly awsS3Service: AwsS3Service) { }

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File):Promise<successfulResponse> {
    const url = await this.awsS3Service.uploadFile(file);
    return apiResponse(200, 'Imagen subida correctamente', url)
  }
}
