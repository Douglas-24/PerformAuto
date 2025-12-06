import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
@Injectable()
export class AwsS3Service {
    private s3 = new S3Client({
        region: process.env.AWS_BUCKET_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
    });

    async uploadFile(file: Express.Multer.File): Promise<{url: string, typeFile:string}> {
        const originalName = file.originalname;
        const key = originalName.replace(/\s+/g, '-')
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        try {
            await this.s3.send(command);
            const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${key}`;
            return {url: url, typeFile:file.mimetype}
        } catch (error) {
            console.error('Error al subir a S3:', error);
            throw new InternalServerErrorException('No se pudo subir el archivo a S3.');
        }
    }


}
