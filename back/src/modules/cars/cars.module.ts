import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { UserModule } from '../user/user.module';
@Module({
  imports:[UserModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
