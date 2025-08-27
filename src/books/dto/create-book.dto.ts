import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { BookCategory } from '../../common/enums/book-category.enum';
import { BookGenre } from '../../common/enums/book-genre.enum';

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
  @IsUUID('4', { message: 'Invalid school ID' })
  schoolId?: string | null;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsUUID('4', { message: 'Invalid schoolYear ID' })
  schoolYearId?: string | null;

  @IsOptional()
  @IsString()
  conditionNote?: string;

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
