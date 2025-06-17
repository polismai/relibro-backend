import { Controller, Get } from '@nestjs/common';
import { BookCategory } from '../common/enums/book-category.enum';

@Controller('categories')
export class CategoriesController {
  @Get()
  findAll() {
    const labels = {
      school: 'Escolar',
      story: 'Literatura',
    };

    return Object.values(BookCategory).map((value) => ({
      label: labels[value],
      value,
    }));
  }
}
