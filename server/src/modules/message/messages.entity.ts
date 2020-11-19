import { BaseEntity } from 'src/shared/Base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Message extends BaseEntity {
  @Column({ name: 'message', type: 'varchar', nullable: false})
  message: string;

  @Column({ name: 'sender_id', type: 'int', nullable: false})
  senderId: number;

  @Column({ name: 'recipient_id', type: 'int', nullable: false})
  recipientId: number;
}
