import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user && !await compare(password, user?.password))
      throw new UnauthorizedException();

    const payload = { 
      id: user.id, 
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      permission: user.permission,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
