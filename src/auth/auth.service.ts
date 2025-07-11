import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      user,
      token: this.jwtService.sign({ sub: user.id, email: user.email }),
    };
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email); // ✅ add await
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      user,
      token: this.jwtService.sign({ sub: user.id, email: user.email, name: user.name }),
    };
  }
}
