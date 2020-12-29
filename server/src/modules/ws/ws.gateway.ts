import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { WSEvent } from '../../shared/Enums/ws-event.enum';
import { MessagesService } from '../message/messages.service';
import { MessageDto, RoomsDto } from './ws.dto';

@WebSocketGateway()
export class WsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(public messageService: MessagesService) {}
  private logger = new Logger('WebSocket');

  private onlineUsers = [];

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log('WebSocket initialized');
  }

  handleConnection(client: Socket) {
    this.logger.debug(`User ${client.handshake.query['userId']} connected`);
    this.onlineUsers.push({ userId: parseInt(client.handshake.query['userId']), wsId: client.id });
    this.logger.debug(`Online User: ${JSON.stringify(this.onlineUsers)}`);
  }

  handleDisconnect(client: Socket) {
    const user = this.onlineUsers.find((user) => user.wsId === client.id);
    this.logger.debug(`User ${user.userId} disconnected`);
    this.onlineUsers = this.onlineUsers.filter((user) => user.wsId !== client.id);
    this.logger.debug(`Online User: ${JSON.stringify(this.onlineUsers)}`);
  }

  @SubscribeMessage(WSEvent.JOIN_ROOMS)
  handleJoinRooms(@ConnectedSocket() client: Socket, @MessageBody() { roomIds, userId }: RoomsDto) {
    if (!roomIds || !userId) throw new WsException('Bad Request');

    roomIds.forEach((roomId: number) => {
      client.join(roomId.toString());
      this.logger.debug(`User ${userId} joined room ${roomId}`);
      client.to(roomId.toString()).broadcast.emit(WSEvent.JOINED_ROOM, `User ${userId} joined room ${roomId}`);
    });
  }

  @SubscribeMessage(WSEvent.SEND_MESSAGE)
  async handleSendMessage(@ConnectedSocket() client: Socket, @MessageBody() { roomId, message, senderId, senderName }: MessageDto) {
    if (!roomId || !message || !senderId) throw new WsException('Bad Request');

    this.logger.debug(`User ${senderId} sends '${message}' to room ${roomId}`);
    await this.messageService.saveMessage(roomId, message, senderId);
    client.to(roomId.toString()).broadcast.emit(WSEvent.BROADCAST_MESSAGE, { roomId, message, senderId, senderName });
  }

  handleNewRoom(partnerId: number, conversationId: number): void {
    const partner = this.onlineUsers.find((user) => user.userId === partnerId);
    if (partner) this.server.to(partner.wsId).emit(WSEvent.NEW_ROOM, { roomId: conversationId });
  }
}
