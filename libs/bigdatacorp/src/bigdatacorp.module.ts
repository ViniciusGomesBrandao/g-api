import { Module } from '@nestjs/common';
import { BigdatacorpService } from './bigdatacorp.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/../../../../libs/bigdatacorp/.bigdatacorp.env`,
    }),
  ],
  providers: [BigdatacorpService],
  exports: [BigdatacorpService],
})
export class BigdatacorpModule {}
