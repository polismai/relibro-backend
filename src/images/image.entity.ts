import { Book } from 'src/books/entities/book.entity';
import { BaseEntity } from 'src/config/base.entity';
import { IImage } from 'src/interfaces/image.interface';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Image extends BaseEntity implements IImage {
  @Column()
  url: string;

  @ManyToOne(() => Book, (book) => book.images, { onDelete: 'CASCADE' })
  book: Book;
}
