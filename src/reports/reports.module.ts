import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { BigdatacorpService } from '@app/bigdatacorp';
import { MakePdfService } from 'src/_services/make-pdf/make-pdf.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    NestjsFormDataModule
  ],
  controllers: [ReportsController],
  providers: [ReportsService, PrismaService, BigdatacorpService, MakePdfService, JwtService]
})
export class ReportsModule {}
