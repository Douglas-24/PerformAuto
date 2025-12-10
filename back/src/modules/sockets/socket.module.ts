import { Module } from '@nestjs/common';
import { NotificationSocketGateWay } from '../sockets/notifications-socket.gateway';
@Module({
  providers: [NotificationSocketGateWay],
  exports: [NotificationSocketGateWay]
})
export class SocketModule {}
