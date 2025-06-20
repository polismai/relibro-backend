import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Req,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BooksService } from '../books.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { BookFilterOptionsDto } from '../dto/book-filter-options.dto';

@Controller('books')
@UseGuards(AuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  public async createBook(
    @Body() createBookDto: CreateBookDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req,
  ) {
    const userId = req.user.id;
    return await this.booksService.createBookWithImages(
      createBookDto,
      files,
      userId,
    );
  }

  @PublicAccess()
  @Get('filter')
  public async findBooks(@Query() filters: BookFilterOptionsDto) {
    return await this.booksService.findBooks(filters);
  }

  @PublicAccess()
  @Get(':id')
  public async findBookById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.booksService.findBookById(id);
  }

  @Patch(':id')
  public async updateBook(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return await this.booksService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  public async deleteBook(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.booksService.deleteBook(id);
  }
}
