import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BigdatacorpService } from '@app/bigdatacorp';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private bigDataService: BigdatacorpService
    ) {}

  @Get()
  async getHello(): Promise<any> {
    
    return await this.bigDataService.getNegativeCertificateLaborDebtsCompany({
      doc: "44170913000121",
      limit: 1,
    })
  }
}
