import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BookCategory } from '../../common/enums/book-category.enum';
import { BookGenre } from '../../common/enums/book-genre.enum';
import { SchoolYear } from 'src/common/enums/school-years.enum';
import { PrivateSchool } from 'src/common/enums/schools.enum';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsEnum(BookGenre)
  genre?: BookGenre;

  @IsOptional()
  @IsEnum(PrivateSchool, { message: 'Invalid school' })
  school?: PrivateSchool;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsEnum(SchoolYear, { message: 'Invalid school year' })
  schoolYear?: SchoolYear;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsNotEmpty()
  @IsEnum(BookCategory)
  category: BookCategory;
}
