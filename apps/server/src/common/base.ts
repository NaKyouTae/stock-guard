import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';

/**
 * 모든 엔티티 공통 Base 규약의 코드 측 구현.
 *
 * Prisma 는 모델 상속이 없으므로, 공통 필드 중 애플리케이션이 채워야 하는 `id` 를
 * 여기 한 곳에서 생성한다. 나머지 공통 필드는 DB/ORM 이 담당한다:
 *   - idx        → PostgreSQL SERIAL (autoincrement)
 *   - createdAt  → @default(now())
 *   - updatedAt  → @updatedAt
 */

/** 32자 hex id (UUID v4 에서 dash 제거) — schema 의 `@db.Char(32)` 와 길이 일치. */
export function genId(): string {
  return randomUUID().replace(/-/g, '');
}

/**
 * Prisma Client 확장 — create/createMany/upsert 시 `id` 가 비어 있으면 자동 주입한다.
 * 이 확장을 붙이면 모든 모델이 별도 처리 없이 32자 id 를 갖게 되어,
 * "Base Entity 를 항상 참조"하는 효과를 낸다.
 */
export const baseIdExtension = Prisma.defineExtension({
  name: 'base-id',
  query: {
    $allModels: {
      create({ args, query }) {
        const data = args.data as Record<string, unknown> | undefined;
        if (data && data.id == null) data.id = genId();
        return query(args);
      },
      createMany({ args, query }) {
        const fill = (row: Record<string, unknown>) => {
          if (row.id == null) row.id = genId();
        };
        if (Array.isArray(args.data)) {
          args.data.forEach((row) => fill(row as Record<string, unknown>));
        } else if (args.data) {
          fill(args.data as Record<string, unknown>);
        }
        return query(args);
      },
      upsert({ args, query }) {
        const create = args.create as Record<string, unknown> | undefined;
        if (create && create.id == null) create.id = genId();
        return query(args);
      },
    },
  },
});
