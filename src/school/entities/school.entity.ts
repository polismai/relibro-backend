import { Book } from '../../books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class School {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: 'private' })
  type: 'public' | 'private';

  @OneToMany(() => Book, (book) => book.school)
  books: Book[];
}
