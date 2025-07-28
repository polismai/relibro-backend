import { Controller, Get } from '@nestjs/common';
import { enumToArray } from '../../common/utils/enum-to-array';
import { SchoolYear } from '../../common/enums/school-years.enum';

@Controller('school-years')
export class SchoolYearsController {
  @Get()
  getSchoolYears(): string[] {
    return enumToArray(SchoolYear);
  }
}
