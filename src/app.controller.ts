import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { BigdatacorpService } from '@app/bigdatacorp';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private bigDataService: BigdatacorpService
  ) { }

  @Get()
  async getHello(@Res() res: Response): Promise<any> {

    // return await this.bigDataService.getNegativeCertificateLaborDebtsCompany({
    //   doc: "44170913000121",
    //   limit: 1,
    // });

    const pdfBuffer = await this.appService.getHello();
    if (pdfBuffer.success) {

      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfBuffer.data);
    } else {
      console.error('Erro ao gerar o PDF:', pdfBuffer.message);
      res.status(500).send('Erro ao gerar o PDF');
    }



  }
}
