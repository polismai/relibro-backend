import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './controllers/books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Book } from './entities/book.entity';
import { User } from '../users/entities/user.entity';
import { Image } from '../images/image.entity';
import { GenresController } from './controllers/genres.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Image, User]),
    CloudinaryModule,
    UsersModule,
  ],
  controllers: [BooksController, GenresController],
  providers: [BooksService],
})
export class BooksModule {}
