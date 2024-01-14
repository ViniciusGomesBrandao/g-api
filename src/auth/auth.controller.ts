import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private prisma: PrismaService
    ) { }

  //-------------------------------------------------------------------
  //LOGIN
  @Post('login')
  @ApiBody({
    description: "Autenticação do usuário.",
    type: LoginDto
  })
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200, description: 'Autenticação de usuário.', schema: {
      type: "object",
      example: {
        success: true,
        message: "Autenticado com sucesso",
        token: "YOUR_TOKEN",
        data: 'YOUR_DATA'
      }
    }
  })
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: any, @Res() res: Response) {

    const token = await this.authService.login(req.user);

    //OBTENDO DADOS DO USUARIO
    let target = await this.prisma.users.findFirst({
      where: {
        id: req.user.id,
        status: 'ACTIVE'
      }
    });

    if (!target) {
      return res.status(HttpStatus.OK).json({
        success: false,
        message: "Usuario não autorizado/encontrado",
      });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Autenticado com sucesso",
      token: token,
      data: req.user
    });
  }
}
