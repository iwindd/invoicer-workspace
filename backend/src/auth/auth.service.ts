import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user && !await compare(password, user?.password))
      throw new UnauthorizedException();

    return user;
  }
}
