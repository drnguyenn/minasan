export class RoomsDto {
  roomIds: Array<number>;
  userId: number;
}

export class MessageDto {
  roomId: number;
  message: string;
  senderId: number;
  senderName: string;
}
