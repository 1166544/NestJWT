import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { CoreModule } from './modules/core/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/config/config.module';
@Module({
  imports: [ConfigModule.register({ folder: './config' }), CoreModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
