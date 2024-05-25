import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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
