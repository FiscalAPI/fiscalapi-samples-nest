import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';

// Cargar variables de entorno
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Fiscalapi Nest Samples')
    .setDescription('Integración Fiscalapi con NestJs (nodejs) para la generación de facturas electrónicas CFDI')
    .setVersion('1.0')
    //.addTag('todos')
    .addTag('productos')
    .addTag('facturas')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  // Obtener el puerto del entorno o usar 3000 como valor predeterminado
  const port = process.env.PORT || 3000;
  
  // Iniciar el servidor y esperar a que esté listo
  await app.listen(port);
  
  // Obtener la URL base del servidor
  const serverUrl = await app.getUrl();
  
  console.log();
  console.warn(`Running on: http://localhost:${port}/api-docs`);
  console.log();

}
bootstrap();