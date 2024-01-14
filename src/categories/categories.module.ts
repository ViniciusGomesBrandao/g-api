import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    NestjsFormDataModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, JwtService]
})
export class CategoriesModule {}
