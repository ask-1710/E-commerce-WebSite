
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  const viewsPath = join(__dirname, '../public/views');

  app.set('views', viewsPath);

  app.setViewEngine('hbs') ;

  await app.listen(5000);

  console.log('App running at ', await app.getUrl()) ;
  
}
bootstrap();

// to run : npm start

// to start a new project 
// sudo npm i -g @nestjs/cli
// nest new ProjectName