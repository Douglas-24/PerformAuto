import { Module } from '@nestjs/common';
import { ServicesParts } from './serviceParts.service';
import { ServicePartsController } from './servicesParts.controller';

@Module({
  controllers: [ServicePartsController],
  providers: [ServicesParts],
})
export class ServicePartsModule {}
