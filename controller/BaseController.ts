import { Context } from 'koa';
import { Ctx } from '@/common';

export default class BaseController {
  context: Context;

  setContext(@Ctx() context: Context): void {
    this.context = context;
  }
}
