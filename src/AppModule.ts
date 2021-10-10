import { CacheModule, Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/CatsModule';
import { CoreModule } from './modules/core/CoreModule';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { ConfigModule } from './modules/configuration/ConfigurationModule';
import { TransferModule } from './modules/transfer/TransferModule';

@Module({
  imports: [CacheModule.register(), ConfigModule.register({ folder: './config' }), CoreModule, CatsModule, TransferModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
