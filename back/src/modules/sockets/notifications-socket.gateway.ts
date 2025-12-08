import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody, OnGatewayDisconnect } from '@nestjs/websockets';
import { NotificationType } from '@prisma/client';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
    namespace: 'notifications',
    cors: {
        origin: '*'
    }
})

export class NotificationSocketGateWay {
    @WebSocketServer()
    server: Server

    constructor(private jwtService: JwtService) { }

    async handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth.token;
            const payload = this.jwtService.verify(token);

            const userId = payload.id;
            const role = payload.rol

            if (role === 'CLIENT' || role === 'ADMIN') {
                client.join(`user_${userId}`);
                console.log(`Usuario ${userId} conectado a room user_${userId}`);
            } else{
                client.join(`employee_${userId}`);
                console.log(`Empleado ${userId} conectado a room employee_${userId}`);
            }
        } catch (err) {
            console.log('Token inválido, desconectando...');
            client.disconnect();
        }
    }

    public sendNotificationToUser(userId: number, payload: any) {
        this.server.to(`user_${userId}`).emit('newNotification', payload);
    }

    public sendNotificationToEmployee(employeeId: number, payload: any) {
        this.server.to(`employee_${employeeId}`).emit('newNotification', payload);
    }

    public refreshDataUser(userId:number){
        this.server.to(`user_${userId}`).emit('refresData', true)
    }
    public refreshDataEmployee(employeeId:number){
        this.server.to(`employee_${employeeId}`).emit('refreshData', true)
    }


}