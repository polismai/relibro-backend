import { Book } from 'src/books/entities/book.entity';
import { BaseEntity } from 'src/config/base.entity';
import { IUser } from 'src/interfaces/user.interface';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity implements IUser {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Book, (book) => book.owner)
  books: Book[];
}
