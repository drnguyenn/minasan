import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/shared/Base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  hashedPassword: string;
}
