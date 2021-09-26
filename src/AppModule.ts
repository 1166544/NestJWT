import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/CatsModule';
import { CoreModule } from './modules/core/CoreModule';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { ConfigModule } from './modules/configuration/ConfigurationModule';
@Module({
  imports: [ConfigModule.register({ folder: './config' }), CoreModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
