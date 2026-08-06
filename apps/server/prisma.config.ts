import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // 마이그레이션/CLI 는 Supabase direct connection(5432)을 사용해야 한다.
    // (Transaction pooler 6543 으로는 migrate 불가) — 없으면 DATABASE_URL 로 폴백.
    url: process.env['DIRECT_URL'] ?? process.env['DATABASE_URL'],
  },
});
