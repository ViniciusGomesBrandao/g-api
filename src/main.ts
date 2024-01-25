import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false
  });
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('DueGuard API Documentation')
    .setDescription('Rest Full api documentation')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Modules')
    .addTag('Categories')
    .addTag('Reports')
    .addBearerAuth()
    .build();
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
