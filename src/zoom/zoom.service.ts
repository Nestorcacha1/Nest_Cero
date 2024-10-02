import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
@Injectable()
export class ZoomService {
  private users: { [key: string]: string } = {};

  async handleConnection(client: Socket) {
    console.log('handleConnection', client.id);
  }

  async handleDisconnect(client: Socket) {
    console.log('handleDisconnect', client.id);
  }

  async setUsers(data: { user: string }, client: Socket) {
    this.users[client.id] = data.user;
  }

  getUsers(): { [key: string]: string } {
    return this.users;
  }
}
