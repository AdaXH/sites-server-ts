import { CommonResponse } from '@/class';
import { CommonObj } from '@/typings';
import { v4 as uuid } from 'uuid';

export default async function (ctx: CommonObj, next: VoidFunction): Promise<void> {
  try {
    await next();
    const { body } = ctx;
    const traceId = uuid();
    ctx.set('Trace-id', traceId);
    ctx.body = { ...JSON.parse(body), traceId };
  } catch (error) {
    ctx.body = CommonResponse.error(error);
  }
}