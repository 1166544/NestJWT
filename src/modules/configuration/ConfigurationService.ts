import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { CONFIG_OPTIONS } from './ConfigurationConstants';
import { ConfigOptions, EnvConfig } from './interfaces';
import cacheManager from 'cache-manager';
import redisStore from 'cache-manager-redis-store';

/**
 * 配置服务
 * 
 * @export
 * @class ConfigService
 */
@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
    // 读取本地配置
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));

    // connect redis

  }

  get(key: string): string {
    return this.envConfig[key];
  }

  /**
   * 从缓存中获取内容
   * 
   * @param {string} key 
   * @returns {string} 
   * 
   * @memberOf ConfigService
   */
  public getCache(key: string): string {
    return key;
  }

  /**
   * 设置缓存
   * 
   * @param {string} key 
   * @param {*} value 
   * 
   * @memberOf ConfigService
   */
  public setCache(key: string, value: any): void {
    // hole
  }

  /**
   * 移除缓存
   * 
   * @param {string} key 
   * @returns {boolean} 
   * 
   * @memberOf ConfigService
   */
  public delCahe(key: string): boolean {
    return false;
  }
}
