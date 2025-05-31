import { BaseEntity } from 'src/config/base.entity';
import { IUser } from 'src/interfaces/user.interface';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity implements IUser {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
