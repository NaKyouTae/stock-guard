import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  // Kakao 로그인 페이지로 리다이렉트 (guard 가 처리)
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  kakaoLogin() {}

  // Kakao 콜백 — 로그인 확정 후 프론트 세션 라우트로 토큰 전달.
  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  kakaoCallback(@Req() req: Request, @Res() res: Response) {
    const { userId } = req.user as { userId: string };
    const { accessToken } = this.authService.generateToken(userId);
    const clientUrl =
      this.config.get<string>('CLIENT_URL') ?? 'http://localhost:16000';
    return res.redirect(
      `${clientUrl}/api/auth/session?token=${encodeURIComponent(accessToken)}`,
    );
  }

  // 현재 로그인 사용자 조회 (프록시가 Bearer 로 호출)
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: Request) {
    const user = req.user as { id: string };
    return this.authService.getProfile(user.id);
  }
}
