import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificacionesGateway implements OnGatewayConnection {

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;

    console.log('🟢 Cliente conectado:', client.id);
    console.log('👤 UserId:', userId);

    if (userId) {
      client.join(userId); // 🔥 CLAVE: room por usuario
    }
  }

  sendToUser(userId: string, payload: any) {
    this.server.to(userId).emit('notificacion', payload);
  }
}