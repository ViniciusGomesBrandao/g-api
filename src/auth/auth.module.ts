import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      privateKey: "vinicius",
      signOptions: {
        expiresIn: '3600s'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy]
})
export class AuthModule { }
