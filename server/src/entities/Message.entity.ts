import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from './Base.entity';
import { Conversation } from './Conversation.entity';
import { User } from './User.entity';

@Entity()
export class Message extends BaseEntity {
  @Column()
  message: string;

  @Column()
  conversationId: number;

  @Column()
  senderId: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @ManyToOne(() => User, (user) => user.messages)
  sender: User;
}
