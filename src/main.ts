import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Documentation for To Do List')
  .setDescription('Full documentation created by swagger for client development of To Do list app')
  .setVersion('1.0')
  .addTag('test')
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(5000);
}
bootstrap();
