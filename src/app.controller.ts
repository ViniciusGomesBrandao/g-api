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
    
    return await this.bigDataService.getRegistrationData({
      name: "Matheus Augusto mendes de Paula",
      // doc: "71109647107",
      // mothername: "MARLA",
      limit: 1,
      phone: ["6293992401"]
    })
  }
}
