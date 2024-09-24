import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(`${process.env.APP_NAME} API document`)
    .setVersion('1.0.0');

  // auth security
  //   documentBuilder.addSecurity(API_SECURITY_AUTH, {
  //     description: 'Auth',
  //     type: 'apiKey',
  //     in: 'header',
  //     name: 'Authorization',
  //   });

  const document = SwaggerModule.createDocument(app, documentBuilder.build(), {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup(process.env.SWAGGER_PATH, app, document);
  // started log
  const logger = new Logger('SwaggerModule');
  logger.log(
    `👉 Swagger Document running on http://localhost:${process.env.PORT}/${process.env.SWAGGER_PATH}`,
  );
}
