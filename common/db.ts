import mongoose from 'mongoose';

const MAX_CONNECT_TIME = 100;

export default class Datebase {
  constructor(host: string) {
    this.host = host;
  }
  private host: string;
  private time = 0;

  async init(): Promise<Error | void> {
    try {
      await mongoose.connect(this.host);
      console.log('connected db');
    } catch (error) {
      throw new Error(error);
    }
  }

  async connect(): Promise<void> {
    try {
      await this.init();
    } catch (error) {
      console.log('db error ', error);
      this.time += 1;
      if (this.time > MAX_CONNECT_TIME) {
        console.log('max connect times');
        return;
      }
      await this.init();
    }
  }
}
