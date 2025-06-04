import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Book } from './entities/book.entity';
import { User } from '../users/entities/user.entity';
import { Image } from '../images/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Image, User]), CloudinaryModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
