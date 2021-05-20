import { Context } from 'koa';

export default async function (ctx: Context, next: VoidFunction): Promise<void> {
  const start = Date.now();
  await next();
  const { request, response, body } = ctx;
  console.log('request', request);
  console.log('time', Date.now() - start);
}
