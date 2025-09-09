import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Department } from 'src/common/enums/department.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9+\- ]*$/, {
    message: 'contactPhone must contain only numbers, spaces, + or -',
  })
  contactPhone?: string;

  @IsOptional()
  @IsEnum(Department)
  department?: Department;
}
