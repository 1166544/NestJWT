import { Module } from '@nestjs/common';
import { TransferController } from './TransferController';
import { TransferService } from './TransferService';

/**
 * transfer module
 * 
 * @export
 * @class CatsModule
 */
@Module({
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
