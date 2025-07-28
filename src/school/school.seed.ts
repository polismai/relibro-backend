// src/school/school.seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { School } from './entities/school.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const schoolRepository = dataSource.getRepository(School);

  const schools = [
    'International College',
    'Instituto Uruguayo Argentino',
    'St. Clare’s College',
    'St. Joseph Mary College',
    'Woodside School',
    'Dreamdays College',
    'Hnas. Capuchinas',
    'Colegio Virgen del Santander',
    'Pinares del Este',
    'Metropolitan School',
    'Colegio Maldonado',
    'CEM Trapani',
  ];

  for (const name of schools) {
    const existing = await schoolRepository.findOne({ where: { name } });
    if (!existing) {
      const newSchool = schoolRepository.create({ name });
      await schoolRepository.save(newSchool);
      console.log(`✅ Colegio creado: ${name}`);
    } else {
      console.log(`ℹ️ Colegio ya existe: ${name}`);
    }
  }

  await app.close();
}

bootstrap();
