import { logger, PROCESS_EVENT } from '@/common';
import mongoose from 'mongoose';

export class Database {
  static max = 10;

  constructor(host?: string) {
    this.host = host;
  }

  host: string;
  time = 0;

  async init(host?: string): Promise<void> {
    await mongoose.connect(host || this.host);
    logger.info('connected db');
  }

  async connect(host?: string): Promise<void> {
    try {
      await this.init(host || this.host);
    } catch (error) {
      logger.error(`db error ${error}`);
      this.time += 1;
      if (this.time >= Database.max) {
        logger.error('max connect times');
        this.setTime(0);
        process.send({ pid: process.pid, eventName: PROCESS_EVENT.RELOAD_DB });
        return;
      }
      await this.init(host || this.host);
    }
  }

  disConnect(): void {
    mongoose.disconnect();
  }

  setTime(time: number): void {
    this.time = time;
  }
}

export interface DatabaseInstance {
  host?: string;
  time?: number;
  init: (host?: string) => Promise<void>;
  connect: (host?: string) => Promise<void>;
  disConnect: VoidFunction;
  setTime: (time: number) => void;
}
