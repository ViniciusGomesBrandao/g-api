import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    NestjsFormDataModule
  ],
  controllers: [ModulesController],
  providers: [ModulesService, PrismaService]
})
export class ModulesModule {}
