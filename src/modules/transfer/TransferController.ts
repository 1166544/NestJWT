import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../common/guards/GuardRoles';
import { TransferService } from './TransferService';

@UseGuards(RolesGuard)
@Controller('mock-api/v1')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get('users/test')
  async saveUserInfo(): Promise<any> {
    return this.transferService.findAll();
  }
}
