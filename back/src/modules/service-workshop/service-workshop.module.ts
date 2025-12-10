import { Module } from '@nestjs/common';
import { ServiceWorkshopService } from './service-workshop.service';
import { ServiceWorkshopController } from './service-workshop.controller';

@Module({
  controllers: [ServiceWorkshopController],
  providers: [ServiceWorkshopService],
})
export class ServiceWorkshopModule {}
