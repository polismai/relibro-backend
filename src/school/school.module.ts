import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './controllers/school.controller';
import { SchoolYearsController } from './controllers/school-years.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School])],
  controllers: [SchoolController, SchoolYearsController],
  providers: [SchoolService],
  exports: [SchoolService],
})
export class SchoolModule {}
