import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './guards/auth.guard';

@Module({
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class CoreModule {}