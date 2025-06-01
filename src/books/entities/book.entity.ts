import { BookCategory } from 'src/common/enums/book-category.enum';
import { BaseEntity } from 'src/config/base.entity';
import { Image } from 'src/images/image.entity';
import { IBook } from 'src/interfaces/book.interface';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Entity()
export class Book extends BaseEntity implements IBook {
  @Index()
  @Column()
  title: string;

  @Index()
  @Column()
  author: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({
    type: 'enum',
    enum: BookCategory,
  })
  category: BookCategory;

  @OneToMany(() => Image, (image) => image.book, { cascade: true })
  images: Image[];
}
