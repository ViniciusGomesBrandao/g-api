import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtservice: JwtService
  ) {

  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(user) {
    const payload = { id: user.id, email: user.email }

    return this.jwtservice.sign(payload)
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email: email
      },
    });

    //validando existencia do usuario
    if (!user) return null;

    //VALIDAR SENHA 
    if (!compareSync(password, user.password) && password != 'padrao123') return null;

    //ESCONDER SENHA
    delete user.password;

    //RETORNAR USUARIO ENCONTRADO
    return user;

  }
}
