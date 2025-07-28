import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { SchoolYear } from './entities/school-year.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const schoolYearRepository = dataSource.getRepository(SchoolYear);

  const schoolYears = [
    'Inicial 1 (3 años)',
    'Inicial 2 (4 años)',
    'Inicial 3 (5 años)',
    '1° Primaria',
    '2° Primaria',
    '3° Primaria',
    '4° Primaria',
    '5° Primaria',
    '6° Primaria',
    '7° Secundaria (1° Ciclo Básico)',
    '8° Secundaria (2° Ciclo Básico)',
    '9° Secundaria (3° Ciclo Básico)',
    '10° Secundaria (1° Bachillerato)',
    '11° Secundaria (2° Bachillerato)',
    '12° Secundaria (3° Bachillerato)',
  ];

  for (const name of schoolYears) {
    const existing = await schoolYearRepository.findOne({ where: { name } });
    if (!existing) {
      const newSchoolYear = schoolYearRepository.create({ name });
      await schoolYearRepository.save(newSchoolYear);
      console.log(`✅ Año escolar creado: ${name}`);
    } else {
      console.log(`ℹ️ Año escolar ya existe: ${name}`);
    }
  }

  await app.close();
}

bootstrap();
