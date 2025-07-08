import { BookCategory } from '../../common/enums/book-category.enum';

export class BookFilterOptionsDto {
  category?: BookCategory;
  genre?: string;
  minPrice?: number;
  maxPrice?: number;
  school?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'title_asc' | 'title_desc';
  search?: string;
}
