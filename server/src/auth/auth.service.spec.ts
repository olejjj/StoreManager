import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, pass: string, role?: UserRole) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Użytkownik o tym emailu już istnieje!');
    }

    // Szyfrowanie hasła 
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pass, saltRounds);

    const newUser = await this.userService.create({
      email,
      password: hashedPassword,
      role: role || UserRole.USER,
    });

    // Zwracamy użytkownika bez hasła
    const { password, ...result } = newUser;
    return result;
  }

  async login(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Błędne dane logowania');
    }

    // porownuje haslo z tym zaszyfrowanym w bazie
    const isPasswordMatching = await bcrypt.compare(pass, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Błędne dane logowania');
    }

    // jesli wszystko ok, generuje token jwt 
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}