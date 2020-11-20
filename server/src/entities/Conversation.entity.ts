import { Column, Entity } from 'typeorm';
import { BaseEntity } from './Base.entity';

@Entity()
export class Conversation extends BaseEntity {
  @Column({name: 'user_1_id',  type: 'int', nullable: false })
  user1Id: number;


  @Column({name: 'user_2_id',  type: 'int', nullable: false })
  user2Id: number;
}