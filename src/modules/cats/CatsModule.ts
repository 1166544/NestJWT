import { Module } from '@nestjs/common';
import { CatsController } from './CatsController';
import { CatsService } from './CatsService';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
