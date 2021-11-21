import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();

// to run : npm start

// to start a new project 
// sudo npm i -g @nestjs/cli
// nest new ProjectName