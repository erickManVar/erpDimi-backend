import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = app.getHttpAdapter().getInstance();

  // Configurar CORS para permitir solicitudes desde múltiples orígenes
  expressApp.use(cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://192.168.0.123:3000',
      'http://192.168.0.123:3001',
    ],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  }));

  // Middleware para parsear el cuerpo de las solicitudes como JSON
  expressApp.use(express.json());

  // Definir tus rutas aquí
  expressApp.get('/projects', (req, res) => {
    res.json([{ id: 1, name: 'Project 1' }, { id: 2, name: 'Project 2' }]);
  });

  await app.listen(3000);
}

bootstrap();
