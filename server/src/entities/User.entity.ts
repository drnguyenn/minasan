import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './Base.entity';
import { Conversation } from './Conversation.entity';
import { Message } from './Message.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  hashedPassword: string;

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @OneToMany(() => Conversation, (conversation) => conversation.user1)
  conversations1: Conversation[];

  @OneToMany(() => Conversation, (conversation) => conversation.user2)
  conversations2: Conversation[];
}
