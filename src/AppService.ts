import { Injectable } from '@nestjs/common';
import { ConfigService } from './modules/configuration/ConfigurationService';

@Injectable()
export class AppService {
  private helloMessage: string;

  constructor(configService: ConfigService) {
    this.helloMessage = configService.get('HELLO_MESSAGE');
  }

  getHello(): string {
    return this.helloMessage;
  }
}
