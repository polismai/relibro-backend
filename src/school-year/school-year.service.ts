import { Injectable } from '@nestjs/common';
import { CreateSchoolYearDto } from './dto/create-school-year.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolYear } from './entities/school-year.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from '../common/utils/error.manager';

@Injectable()
export class SchoolYearService {
  constructor(
    @InjectRepository(SchoolYear)
    private readonly schoolYearRepository: Repository<SchoolYear>,
  ) {}

  async createSchoolYear(createSchoolYearDto: CreateSchoolYearDto) {
    const exists = await this.schoolYearRepository.findOne({
      where: { name: createSchoolYearDto.name },
    });

    if (exists) {
      throw new ErrorManager({
        type: 'CONFLICT',
        message: 'Este año escolar ya existe',
      });
    }

    const schoolYear = this.schoolYearRepository.create(createSchoolYearDto);
    return this.schoolYearRepository.save(schoolYear);
  }

  async findAll(): Promise<SchoolYear[]> {
    return this.schoolYearRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} schoolYear`;
  // }

  // update(id: number, updateSchoolYearDto: UpdateSchoolYearDto) {
  //   return `This action updates a #${id} schoolYear`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} schoolYear`;
  // }
}
