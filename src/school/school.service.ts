import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from '../common/utils/error.manager';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
  ) {}

  async createSchool(createSchoolDto: CreateSchoolDto): Promise<School> {
    const existing = await this.schoolRepository.findOne({
      where: { name: createSchoolDto.name },
    });

    if (existing) {
      throw new ErrorManager({
        type: 'CONFLICT',
        message: 'Ya existe un colegio con ese nombre',
      });
    }

    const school = this.schoolRepository.create(createSchoolDto);
    return this.schoolRepository.save(school);
  }

  async findSchools(): Promise<School[]> {
    return this.schoolRepository.find();
  }
}
//   findOne(id: number) {
//     return `This action returns a #${id} school`;
//   }

//   update(id: number, updateSchoolDto: UpdateSchoolDto) {
//     return `This action updates a #${id} school`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} school`;
//   }
//
