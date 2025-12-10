import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './core/filters/http-error.filter';
import { PrismaErrorFilter } from './core/filters/prisma-error.filter';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './modules/features.module';
import { AwsS3Module } from './modules/aws-s3/aws-s3.module';
@Module({
  imports: [PrismaModule, CoreModule, FeaturesModule, AwsS3Module],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaErrorFilter
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
  ]
})
export class AppModule {}
