import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ErrorManager } from 'src/common/utils/error.manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Image } from 'src/images/image.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

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

  async createBookWithImages(
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

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
