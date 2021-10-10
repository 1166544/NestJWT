import { CacheModule, Module } from '@nestjs/common';
import { TransferController } from './TransferController';
import { TransferService } from './TransferService';

/**
 * transfer module
 * 
 * @export
 * @class CatsModule
 */
@Module({
  imports: [CacheModule.register()],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
