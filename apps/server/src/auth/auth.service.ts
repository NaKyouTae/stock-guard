import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthProvider } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface OAuthProfile {
  provider: AuthProvider;
  providerId: string;
  nickname?: string;
  email?: string;
  profileImage?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  /**
   * 소셜 로그인 결과 처리.
   * (provider, providerId)로 기존 계정을 찾고, 없으면 user + account 를 즉시 생성한다.
   * baby-rang 과 달리 별도 온보딩/약관 단계 없이 로그인 즉시 세션을 확립한다.
   */
  async resolveOAuthLogin(profile: OAuthProfile): Promise<{ userId: string }> {
    const existing = await this.prisma.account.findUnique({
      where: {
        provider_providerId: {
          provider: profile.provider,
          providerId: profile.providerId,
        },
      },
    });

    if (existing) {
      return { userId: existing.userId };
    }

    // 신규 가입: user + account 동시 생성 (id 는 Prisma 확장이 자동 주입).
    const user = await this.prisma.user.create({
      data: {
        email: profile.email ?? null,
        nickname: profile.nickname ?? null,
        profileImage: profile.profileImage ?? null,
        accounts: {
          create: {
            provider: profile.provider,
            providerId: profile.providerId,
          },
        },
      },
    });

    return { userId: user.id };
  }

  generateToken(userId: string) {
    return { accessToken: this.jwt.sign({ sub: userId }) };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        nickname: true,
        profileImage: true,
        createdAt: true,
      },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
