import { Module } from '@nestjs/common';
import { BigdatacorpService } from './bigdatacorp.service';

@Module({
  providers: [BigdatacorpService],
  exports: [BigdatacorpService],
})
export class BigdatacorpModule {}
