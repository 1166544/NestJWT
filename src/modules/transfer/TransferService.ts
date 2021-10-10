import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class TransferService {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache){
    // hole
  }
  

  async findAll(): Promise<any> {
    // add global store keys
    await this.cacheManager.set('key', 'sds');
    const value = await this.cacheManager.get('key');
    return value;
  }
}
