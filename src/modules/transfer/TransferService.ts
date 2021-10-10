import { Injectable } from '@nestjs/common';

@Injectable()
export class TransferService {
  private readonly cats: any = [];

  findAll(): any {
    return this.cats;
  }
}
