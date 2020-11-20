import { BaseEntity  } from './Base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Message extends BaseEntity {
  @Column({ name: 'conversation_id', type: 'text', nullable: false})
  conversationId: number;
  
  @Column({ name: 'message', type: 'varchar', nullable: false})
  message: string;

  @Column({ name: 'sender_id', type: 'int', nullable: false})
  senderId: number;
}
