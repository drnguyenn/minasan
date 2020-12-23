import { Column, Entity, ManyToMany } from 'typeorm';

import { BaseEntity } from './Base.entity';
import { User } from './User.entity';

@Entity()
export class Hobby extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => User, (User) => User.hobbies)
  users: User[];
}
