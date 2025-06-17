import { Controller, Get } from '@nestjs/common';
import { Genre } from '../../common/enums/book-genre.enum';

@Controller('genres')
export class GenresController {
  @Get()
  findAll() {
    const labels = {
      children: 'Infantil',
      fiction: 'Ciencia ficción',
      mystery: 'Misterio',
      fantasy: 'Fantasía',
      romance: 'Romanticismo',
      history: 'Historia',
      biography: 'Biografía',
      science: 'Ciencia',
      other: 'Otro',
    };

    return Object.values(Genre).map((value) => ({
      label: labels[value],
      value,
    }));
  }
}
