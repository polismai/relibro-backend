import { Book } from '../books/entities/book.entity';
import { BaseEntity } from '../config/base.entity';
import { IImage } from '../common/interfaces/image.interface';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Image extends BaseEntity implements IImage {
  @Column()
  url: string;

  @ManyToOne(() => Book, (book) => book.images, { onDelete: 'CASCADE' })
  book: Book;
}
