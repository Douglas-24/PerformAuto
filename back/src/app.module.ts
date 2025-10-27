import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './core/filters/http-error.filter';
import { PrismaErrorFilter } from './core/filters/prisma-error.filter';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './modules/features.module';
@Module({
  imports: [PrismaModule, CoreModule, FeaturesModule],
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
