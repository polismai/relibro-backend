import { BookCategory } from 'src/common/enums/book-category.enum';
import { IImage } from './image.interface';

export interface IBook {
  title: string;
  author: string;
  description: string;
  price: number;
  isAvailable: boolean;
  category: BookCategory;
  images: IImage[];
}
