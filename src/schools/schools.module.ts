import { Module } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { SchoolYearsController } from './school-years.controller';

@Module({
  controllers: [SchoolsController, SchoolYearsController],
})
export class SchoolsModule {}
