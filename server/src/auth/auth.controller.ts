import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '../user/entities/user.entity';

export class AuthDto {
  email!: string;
  password!: string;
  role?: UserRole;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: AuthDto) {
    console.log('Dane z Postmana (Register):', body); 
    return this.authService.register(body?.email, body?.password, body?.role);
  }

  @Post('login')
  login(@Body() body: AuthDto) {
    console.log('Dane z Postmana (Login):', body); 
    return this.authService.login(body?.email, body?.password);
  }
}