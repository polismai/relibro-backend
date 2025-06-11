import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/common/utils/error.manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email, password } = createUserDto;

      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        throw new ErrorManager({
          type: 'CONFLICT',
          message: 'El usuario ya existe con ese correo.',
        });
      }

      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.HASH_SALT),
      );

      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se encontraron usuarios',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUserById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `Usuario con id ${id} no fue encontrado`,
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `El email ${email} no pertenece a un usuario registrado`,
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      await this.findUserById(id);

      const result = await this.userRepository.update(id, updateUserDto);

      if (result.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar el usuario',
        });
      }

      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult> {
    try {
      await this.findUserById(id);

      const result = await this.userRepository.delete(id);

      if (result.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el usuario',
        });
      }

      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
