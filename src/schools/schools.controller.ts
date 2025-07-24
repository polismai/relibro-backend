import { Controller, Get } from '@nestjs/common';
import { PrivateSchool } from '../common/enums/schools.enum';
import { enumToArray } from '../common/utils/enum-to-array';

@Controller('schools')
export class SchoolsController {
  @Get()
  getSchools() {
    return enumToArray(PrivateSchool);
  }
}
