import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { MultiRoleLoginDto } from '@plux-max/types';

@ApiTags('Auth & Multi-Role Personas')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('personas')
  @ApiOperation({ summary: 'List pre-configured user personas (Student, Doctor, Nurse, Admin)' })
  async getPersonas() {
    return this.authService.getPersonas();
  }

  @Post('persona-login')
  @ApiOperation({ summary: 'Authenticate as specific persona role' })
  async personaLogin(@Body() dto: MultiRoleLoginDto) {
    return this.authService.personaLogin(dto);
  }
}
