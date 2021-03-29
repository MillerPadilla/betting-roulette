import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerConfig(app);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000);
}

function swaggerConfig (app){
  const config = new DocumentBuilder()
  .setTitle('Betting Roulette API')
  .setDescription('Proof of concept of a real betting roulette wheel')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
