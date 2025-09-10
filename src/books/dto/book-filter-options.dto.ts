import { BookCategory } from '../../common/enums/book-category.enum';

export class BookFilterOptionsDto {
  onlyAvailable?: boolean;
  category?: BookCategory;
  genre?: string;
  department?: string;
  subject?: string;
  schoolYear?: string;
  minPrice?: number;
  maxPrice?: number;
  school?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'title_asc' | 'title_desc';
  search?: string;
}
