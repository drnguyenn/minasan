import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'typeorm';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  if (process.env.NODE_ENV !== 'PRODUCTION') {
    const options = new DocumentBuilder().setTitle('Minasan API v1').addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/', app, document, { swaggerOptions: { docExpansion: 'none' } });
  }

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
