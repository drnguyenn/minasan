import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './Base.entity';
import { Message } from './Message.entity';
import { User } from './User.entity';

@Entity()
export class Conversation extends BaseEntity {
  @Column()
  user1Id: number;

  @Column()
  user2Id: number;

  @OneToMany(() => Message, (message) => message.conversation, { cascade: true })
  messages: Message[];

  @ManyToOne(() => User, (user) => user.conversations1, { eager: true, cascade: true })
  user1: User;

  @ManyToOne(() => User, (user) => user.conversations2, { eager: true, cascade: true })
  user2: User;
}
