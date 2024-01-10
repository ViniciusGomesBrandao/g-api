import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BigdatacorpService } from '@app/bigdatacorp';
import { BigDataModule } from './bigdata/bigdata.module';
import { ResourcesModule } from './resources/resources.module';
import { ModulesModule } from './modules/modules.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [UsersModule, BigDataModule, ResourcesModule, ModulesModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService, BigdatacorpService],
})
export class AppModule {}
