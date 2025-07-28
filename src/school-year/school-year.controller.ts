import { Controller, Get, Post, Body } from '@nestjs/common';
import { SchoolYearService } from './school-year.service';
import { CreateSchoolYearDto } from './dto/create-school-year.dto';

@Controller('school-year')
export class SchoolYearController {
  constructor(private readonly schoolYearService: SchoolYearService) {}

  @Post()
  create(@Body() createSchoolYearDto: CreateSchoolYearDto) {
    return this.schoolYearService.createSchoolYear(createSchoolYearDto);
  }

  @Get()
  findAll() {
    return this.schoolYearService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.schoolYearService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSchoolYearDto: UpdateSchoolYearDto) {
  //   return this.schoolYearService.update(+id, updateSchoolYearDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.schoolYearService.remove(+id);
  // }
}
