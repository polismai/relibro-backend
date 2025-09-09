import { Controller, Get } from '@nestjs/common';
import { Department } from 'src/common/enums/department.enum';

@Controller('departments')
export class DepartmentsController {
  @Get()
  findAll() {
    return Object.values(Department);
  }
}
