import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API 전역 prefix
  app.setGlobalPrefix('api');

  // DTO 검증
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  // CORS (프론트 도메인 허용)
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? true,
    credentials: true,
  });

  // Cloudtype은 PORT 환경변수를 주입한다
  const port = process.env.PORT ?? 18070;
  await app.listen(port);
  console.log(`🛡️  Stock Guard API on http://localhost:${port}/api`);
}
bootstrap();
