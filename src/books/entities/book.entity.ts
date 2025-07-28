import { BookCategory } from '../../common/enums/book-category.enum';
import { BaseEntity } from '../../config/base.entity';
import { Image } from '../../images/image.entity';
import { IBook } from '../../common/interfaces/book.interface';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { BookGenre } from '../../common/enums/book-genre.enum';
import { School } from '../../school/entities/school.entity';
import { SchoolYear } from '../../school-year/entities/school-year.entity';

@Entity()
export class Book extends BaseEntity implements IBook {
  @Index()
  @Column()
  title: string;

  @Index()
  @Column({ nullable: true })
  author?: string;

  @Column({
    type: 'enum',
    enum: BookGenre,
    nullable: true,
  })
  genre?: BookGenre;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  conditionNote?: string;

  @Column({ nullable: true })
  subject?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @Transform(({ value }) => parseFloat(value))
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
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => School, (school) => school.books, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'school_id' })
  school?: School;

  @ManyToOne(() => SchoolYear, (schoolYear) => schoolYear.books, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'school_year_id' })
  schoolYear?: SchoolYear;
}
