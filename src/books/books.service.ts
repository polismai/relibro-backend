import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ErrorManager } from '../common/utils/error.manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Image } from '../images/image.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { BookFilterOptionsDto } from './dto/book-filter-options.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  public async createBookWithImages(
    createBookDto: CreateBookDto,
    files: Express.Multer.File[],
    userId: string,
  ): Promise<Book> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user)
      throw new ErrorManager({
        type: 'NOT_FOUND',
        message: 'Usuario no encontrado',
      });

    const book = this.bookRepository.create({
      ...createBookDto,
      user,
    });

    const savedBook = await this.bookRepository.save(book);

    const imageEntities = await Promise.all(
      files.map(async (file) => {
        const uploadResult = await this.cloudinaryService.uploadFile(file);
        const image = this.imageRepository.create({
          url: uploadResult.secure_url,
          book: savedBook,
        });
        return this.imageRepository.save(image);
      }),
    );

    savedBook.images = imageEntities;
    return savedBook;
  }

  public async findBooks(filters: BookFilterOptionsDto): Promise<Book[]> {
    const query = this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.images', 'image');

    if (filters.category) {
      query.andWhere('book.category = :category', {
        category: filters.category,
      });
    }

    if (filters.genre) {
      query.andWhere('book.genre = :genre', { genre: filters.genre });
    }

    if (filters.minPrice !== undefined) {
      query.andWhere('book.price >= :minPrice', { minPrice: filters.minPrice });
    }

    if (filters.maxPrice !== undefined) {
      query.andWhere('book.price <= :maxPrice', { maxPrice: filters.maxPrice });
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          query.orderBy('book.price', 'ASC');
          break;
        case 'price_desc':
          query.orderBy('book.price', 'DESC');
          break;
        case 'title_asc':
          query.orderBy('book.title', 'ASC');
          break;
        case 'title_desc':
          query.orderBy('book.title', 'DESC');
          break;
      }
    }

    return query.getMany();
  }

  public async findBookById(id: string): Promise<Book> {
    try {
      const book = await this.bookRepository.findOne({
        where: { id },
        relations: ['images'],
      });

      if (!book) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Libro con id ${id} no fue encontrado`,
        });
      }

      return book;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateBook(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<UpdateResult> {
    try {
      await this.findBookById(id);

      const result = await this.bookRepository.update(id, updateBookDto);

      if (result.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El libro no se pudo actualizar',
        });
      }

      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteBook(id: string): Promise<DeleteResult> {
    try {
      await this.findBookById(id);

      const result = await this.bookRepository.delete(id);

      if (result.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El libro no se pudo eliminar',
        });
      }

      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
