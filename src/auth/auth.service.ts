import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(data: AuthDto) {
    const { username, password } = data;
    const user = await this.usersService.find(username, password);
    const body = { username: user.username, id: user.id, roles: user.roles };

    return { access_token: this.jwtService.sign(body) };
  }
}
