import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './users.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateUserDto) {
    try {
      await this.prisma.user.create({
        data: {
          ...payload,
          password: await hash(payload.password, 16),
          permission: +payload.permission,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(email: string): Promise<User | undefined> {
    return (this.prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        permission: true,
      },
    }) as unknown) as User | undefined;
  }
}
