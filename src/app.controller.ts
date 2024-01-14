import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { BigdatacorpService } from '@app/bigdatacorp';
import { Response } from 'express';
import { IOutput } from './_helpers/default-returns';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private bigDataService: BigdatacorpService
  ) { }

  @Get()
  async getHello(@Res() res: Response): Promise<any> {

    const data = await this.bigDataService.getFinancialInformation({doc: "00250076292"});
    console.log(data)
    return data;

  }
  @Get("test")
  async test() : Promise<IOutput>{
    const data = await this.bigDataService.getProfessionalData({doc: "80874835372"});
    console.log(data)
    return data;
  }
}
