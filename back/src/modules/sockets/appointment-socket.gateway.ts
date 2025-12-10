import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  namespace: 'appointments',
  cors: {
    origin: '*'
  }
})
export class AppointmentSocketGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private slotReserved: { client: string, day: string, mechanicId: number, hour: Date }[] = []


  @SubscribeMessage('joinReservedDay')
  handleJoinReserved(@ConnectedSocket() client: Socket) {
    client.join('reservedDaySection')
  }

  @SubscribeMessage('joinDay')
  handleJoinDay(@MessageBody() day: string, @ConnectedSocket() client: Socket) {
    client.join(day)
    this.emitReservedSlot(day, client)
  }

  public handleDisconnect(client: Socket): void {
    const clientIndex = this.slotReserved.findIndex(item => item.client === client.id);

    if (clientIndex !== -1) {
      this.slotReserved.splice(clientIndex, 1);
    }
  }

  @SubscribeMessage('reservedSlot')
  handleReserveSlot(@MessageBody() data: { day: string, mechanicId: number, hour: Date }, @ConnectedSocket() client: Socket) {
    if (this.slotReserved.some(item => item.client == client.id)) {
      const clientIndex = this.slotReserved.findIndex(item => item.client == client.id)
      const clientSlotUpdate = this.slotReserved[clientIndex]
      clientSlotUpdate.day = data.day
      clientSlotUpdate.hour = new Date(data.hour)
      clientSlotUpdate.mechanicId = data.mechanicId
    } else {
      this.slotReserved.push({ client: client.id, ...data })
    }
    this.emitReservedSlot(data.day)
  }

  private emitReservedSlot(day: string, clientSocket?: Socket): void {
    const slotsToSend = this.slotReserved
      .filter(slot => slot.day === day)
      .map((slot) => {
        const { client, ...rest } = slot;
        return rest
      })
    if (clientSocket) {
      clientSocket.emit('slotReserved', slotsToSend);
    } else {
      this.server.to(day).emit('slotReserved', slotsToSend);
    }
  }
}
