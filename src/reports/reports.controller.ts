import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetPdfReportDto } from './dto/get-pdf-report.dto';


@Controller('reports')
@ApiTags('Reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // Main

  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get('pdf')
  getPdf(@Res() res: Response) {
    return ""
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAll(@Res() res: Response, @Req() req: any, @Query() params: GetPdfReportDto) {
    const pdfBuffer = await this.reportsService.getPdfReport(req.user.id, params);
    // console.log(pdfBuffer)
    // return pdfBuffer;

    
    if (pdfBuffer.success) {
      // console.log(pdfBuffer)
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="relatorio.pdf"');
      res.send(pdfBuffer.data);
    } else {
      console.error('Erro ao gerar o PDF:', pdfBuffer.message);
      res.status(500).send({
        success: false,
        message: pdfBuffer.message
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }

  // PDFs

  

}
