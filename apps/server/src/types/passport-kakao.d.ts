// passport-kakao 는 타입 정의를 배포하지 않아 최소 선언만 제공한다.
declare module 'passport-kakao' {
  import { Strategy as PassportStrategy } from 'passport';

  export interface StrategyOptions {
    clientID: string;
    clientSecret?: string;
    callbackURL: string;
  }

  export type VerifyFunction = (
    accessToken: string,
    refreshToken: string,
    profile: KakaoProfile,
    done: (error: unknown, user?: unknown, info?: unknown) => void,
  ) => void;

  export interface KakaoProfile {
    id: number | string;
    displayName?: string;
    username?: string;
    _json?: {
      kakao_account?: {
        email?: string;
        profile?: {
          nickname?: string;
          profile_image_url?: string;
        };
      };
    };
    [key: string]: unknown;
  }

  export class Strategy extends PassportStrategy {
    constructor(options: StrategyOptions, verify: VerifyFunction);
    name: string;
  }
}
