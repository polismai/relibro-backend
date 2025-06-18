import { Controller, Get } from '@nestjs/common';
import { BookCategory } from '../common/enums/book-category.enum';

@Controller('categories')
export class CategoriesController {
  @Get()
  findAll() {
    const labels = {
      school: 'Libros escolares',
      story: 'Libros de literatura',
    };

    return Object.values(BookCategory).map((value) => ({
      label: labels[value],
      value,
    }));
  }
}
