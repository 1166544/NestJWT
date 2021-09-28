import { Module } from '@nestjs/common';
import { CatsController } from './CatsController';
import { CatsService } from './CatsService';

/**
 * demo module
 * 
 * @export
 * @class CatsModule
 */
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
