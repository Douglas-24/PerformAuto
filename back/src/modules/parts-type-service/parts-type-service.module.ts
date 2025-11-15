import { Module } from '@nestjs/common';
import { PartsTypeServiceService } from './parts-type-service.service';
import { PartsTypeServiceController } from './parts-type-service.controller';

@Module({
  controllers: [PartsTypeServiceController],
  providers: [PartsTypeServiceService],
})
export class PartsTypeServiceModule {}
