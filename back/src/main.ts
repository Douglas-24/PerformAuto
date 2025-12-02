import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './core/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    credentials: false, 
  });

  const jwtAuthGuard = app.get(JwtAuthGuard)
  app.useGlobalGuards(jwtAuthGuard)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
