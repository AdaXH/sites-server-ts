/* eslint-disable no-console */
import mongoose from 'mongoose';

export class Database {
  static max = 100;

  constructor(host: string) {
    this.host = host;
  }
  private host: string;
  private time = 0;

  async init(): Promise<void> {
    await mongoose.connect(this.host);
    console.log('connected db');
  }

  async connect(): Promise<void> {
    try {
      await this.init();
    } catch (error) {
      console.log('db error ', error);
      this.time += 1;
      if (this.time > Database.max) {
        console.log('max connect times');
        return;
      }
      await this.init();
    }
  }
}
