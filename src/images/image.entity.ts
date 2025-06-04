import { Book } from '../books/entities/book.entity';
import { BaseEntity } from '../config/base.entity';
import { IImage } from '../common/interfaces/image.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Image extends BaseEntity implements IImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Book, (book) => book.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
