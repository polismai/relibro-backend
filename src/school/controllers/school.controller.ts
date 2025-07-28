import { Controller, Get, Post, Body } from '@nestjs/common';
import { SchoolService } from '../school.service';
import { CreateSchoolDto } from '../dto/create-school.dto';
import { School } from '../entities/school.entity';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  createSchool(@Body() createSchoolDto: CreateSchoolDto): Promise<School> {
    return this.schoolService.createSchool(createSchoolDto);
  }

  @Get()
  findAll(): Promise<School[]> {
    return this.schoolService.findSchools();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.schoolService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
  //   return this.schoolService.update(+id, updateSchoolDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.schoolService.remove(+id);
  // }
}
