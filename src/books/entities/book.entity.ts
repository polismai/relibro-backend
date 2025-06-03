import { BookCategory } from '../../common/enums/book-category.enum';
import { BaseEntity } from '../../config/base.entity';
import { Image } from '../../images/image.entity';
import { IBook } from '../../interfaces/book.interface';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.books, { eager: true })
  owner: User;
}
