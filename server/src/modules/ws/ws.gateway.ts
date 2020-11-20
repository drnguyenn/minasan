import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../message/messages.service';

// NOTE: just a simple version of ws for chatRoom, lack of errors handler, be carefull :D 
@WebSocketGateway()
export class WsGateway {
  constructor(public messsageService: MessagesService) {}

  @WebSocketServer()
  server: Server

  /**
   * handle request joinRooms from client
   * @param client 
   * @param payload: { userInfo, roomIds } 
   */
  @SubscribeMessage('joinRooms')
  handleJoinRooms(client: Socket, payload: any) {
    const { userInfo, roomIds } = payload
    roomIds.map((roomId: string) => {
      client.join(roomId)
      this.server.to(roomId).emit('clientJoinedRoom', userInfo)
    });
  }

  /**
   * handle message sent from a client to chatRoom
   * @param client 
   * @param payload: { roomId, msg, senderId }
   */
  @SubscribeMessage('sendMsg')
  async handleSendMsg(client: Socket, payload: any) {
    const { roomId, msg, senderId } = payload;
    if (!roomId || !msg || !senderId) {
      throw new WsException('bad_request');
    }
    // Save message to database
    await this.messsageService.saveMessage(roomId, senderId, msg);
    // Broadcast to other users
    this.server.to(roomId).emit('broadcastMsg', { senderId, msg });
  }
}
