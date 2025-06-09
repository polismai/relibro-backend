import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PublicAccess } from '../auth/decorators/public.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicAccess()
  @Post('register')
  public async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  public async findUsers() {
    return await this.usersService.findUsers();
  }

  @Get(':id')
  public async findUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findUserById(id);
  }

  @Patch(':id')
  public async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.deleteUser(id);
  }
}
