import { Column, Entity, ManyToMany } from 'typeorm';

import { BaseEntity } from './Base.entity';
import { User } from './User.entity';

@Entity()
export class Topic extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => User, (User) => User.topics)
  users: User[];
}
