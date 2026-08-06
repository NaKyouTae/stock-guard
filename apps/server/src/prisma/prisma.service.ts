import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const adapter = new PrismaMariaDb(process.env.DATABASE_URL ?? '');
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('MySQL 연결 성공');
    } catch (e) {
      // 뼈대 단계 — DB가 아직 없어도 서버는 기동되도록 경고만 남긴다
      this.logger.warn(
        `MySQL 연결 실패 (DATABASE_URL 설정 후 이용): ${(e as Error).message}`,
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
