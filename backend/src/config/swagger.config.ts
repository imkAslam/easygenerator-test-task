import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_SECURITY_AUTH } from 'src/common/decorators/swagger.decorator';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(`${process.env.APP_NAME} API document`)
    .setVersion('1.0.0');

  // auth security
  documentBuilder.addSecurity(API_SECURITY_AUTH, {
    name: 'Authorization',
    description:
      'JWT Authorization header using the Bearer scheme. Example: Bearer <token>',
    type: 'apiKey',
    in: 'header',
  });

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
