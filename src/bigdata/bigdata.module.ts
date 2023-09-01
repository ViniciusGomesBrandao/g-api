import { Module } from '@nestjs/common';
import { BigDataController } from './bigdata.controller';
import { BigDataService } from './bigdata.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { BigdatacorpModule } from '@app/bigdatacorp';


@Module({
  imports: [
    NestjsFormDataModule,
    BigdatacorpModule
  ],
  controllers: [BigDataController],
  providers: [BigDataService],
})

export class BigDataModule {
    
}
