import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from '../role/role.decorator';
import { RoleGuard } from '../role/role.guard';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: any) {
    const jwt = this.authService.login(body.username, body.password);
    return { token: jwt };
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RoleGuard)
  @Get('test')
  test(@Req() req) {
    const user = req.user;
    return `Test username: ${user.username}`;
  }
}
