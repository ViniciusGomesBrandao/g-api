import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BigdatacorpService } from '@app/bigdatacorp';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, BigdatacorpService],
})
export class AppModule {}
