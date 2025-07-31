import { Book } from '../../books/entities/book.entity';
import { BaseEntity } from '../../config/base.entity';
import { IUser } from '../../common/interfaces/user.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '../../common/enums/role.enum';

@Entity()
export class User extends BaseEntity implements IUser {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
