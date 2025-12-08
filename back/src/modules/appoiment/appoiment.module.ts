import { Module } from '@nestjs/common';
import { AppoimentService } from './appoiment.service';
import { AppoimentController } from './appoiment.controller';
import { EmployeeModule } from '../employee/employee.module';
import { NotificationModule } from '../notification/notification.module';
import { SocketModule } from '../sockets/socket.module';

@Module({
  imports:  [EmployeeModule, NotificationModule, SocketModule],
  controllers: [AppoimentController],
  providers: [AppoimentService],
})
export class AppoimentModule {}
