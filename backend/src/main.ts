import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as csurf from 'csurf';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.enableCors({ origin: '*', credentials: true });

  app.setGlobalPrefix(process.env.GLOBAL_PREFIX);
  setupSwagger(app);
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  await app.listen(process.env.PORT);
}
bootstrap();
