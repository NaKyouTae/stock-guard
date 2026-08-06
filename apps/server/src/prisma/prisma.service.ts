import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { baseIdExtension } from '../common/base';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL ?? '',
    });
    super({ adapter });

    // Base 규약: 모든 모델 create/upsert 시 32자 id 자동 주입.
    // 확장 프록시를 인스턴스로 반환해 주입되는 PrismaService 가 곧 확장 클라이언트가 되게 한다.
    return this.$extends(baseIdExtension) as unknown as PrismaService;
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('PostgreSQL 연결 성공');
    } catch (e) {
      // 뼈대 단계 — DB가 아직 없어도 서버는 기동되도록 경고만 남긴다
      this.logger.warn(
        `PostgreSQL 연결 실패 (DATABASE_URL 설정 후 이용): ${(e as Error).message}`,
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
