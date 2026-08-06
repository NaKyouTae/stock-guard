import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, KakaoProfile } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { AuthProvider } from '@prisma/client';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    config: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: config.get<string>('KAKAO_CLIENT_ID')!,
      clientSecret: config.get<string>('KAKAO_CLIENT_SECRET') ?? '',
      callbackURL: config.get<string>('KAKAO_CALLBACK_URL')!,
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: KakaoProfile,
    done: (error: unknown, user?: unknown) => void,
  ) {
    const kakaoAccount = profile._json?.kakao_account;
    const result = await this.authService.resolveOAuthLogin({
      provider: AuthProvider.KAKAO,
      providerId: String(profile.id),
      nickname: kakaoAccount?.profile?.nickname ?? profile.displayName,
      email: kakaoAccount?.email,
      profileImage: kakaoAccount?.profile?.profile_image_url,
    });
    done(null, result);
  }
}
