import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as Config from 'config';
import { AppConfig, SwaggerConfig } from './app.types';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
  // create NestJS application
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // enable CORS for NG Application's calls
  await app.enableCors({ origin: config.cors });

  // use global pipe validation
  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // create swagger options
  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag(swaggerConfig.tag)
    .build();

  // create swagger document
  const userDocument = SwaggerModule.createDocument(app, options);

  // setup swagger module
  SwaggerModule.setup(swaggerConfig.path, app, userDocument);

  // launch server
  await app.listen(config.port, config.host);
  Logger.log(
    `Application served at http://${config.host}:${config.port}`,
    'bootstrap',
  );
}

bootstrap(
  Config.get<AppConfig>('server'),
  Config.get<SwaggerConfig>('swagger'),
);
