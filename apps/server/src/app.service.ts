import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health() {
    return {
      service: 'stock-guard-server',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
