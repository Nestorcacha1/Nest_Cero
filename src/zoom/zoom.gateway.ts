import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ZoomService } from './zoom.service';

@WebSocketGateway({ cors: true })
export class ZoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly zoomService: ZoomService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('msg')
  handleEvent(
    @MessageBody() data: { user: string },
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(data, client.id);
    this.zoomService.setUsers(data, client);
    this.server.emit('msgToClient', this.zoomService.getUsers());
  }

  async handleConnection(client: Socket) {
    this.zoomService.handleConnection(client);
    this.server.emit('msgToClient', this.zoomService.getUsers());
  }

  async handleDisconnect(client: Socket) {
    this.zoomService.handleDisconnect(client);
    this.server.emit('msgToClient', this.zoomService.getUsers());
  }
}
