import { Controller, Get } from '@nestjs/common';
import { BookGenre } from '../../common/enums/book-genre.enum';

@Controller('genres')
export class GenresController {
  @Get()
  findAll() {
    const labels = {
      children: 'Infantil',
      young_adult: 'Juvenil',
      novel: 'Novela',
      short_story: 'Cuento',
      manual: 'Manual/Guía',
      dictionary: 'Diccionario',
      educational: 'Didáctico/Pedagógico',
      comic: 'Cómic/Historieta',
      other: 'Otros',
    };

    return Object.values(BookGenre).map((value) => ({
      label: labels[value],
      value,
    }));
  }
}
