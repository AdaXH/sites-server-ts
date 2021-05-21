/* eslint-disable no-console */
import { CommonObj } from '@/typings';
import log4js from 'log4js';
import { Context } from 'koa';

log4js.configure({
  appenders: {
    trace: {
      type: 'file',
      filename: `logs/trace.log`,
      maxLogSize: '2048K',
      daysToKeep: 2,
    },
    error: {
      type: 'file',
      filename: `logs/error.log`,
      maxLogSize: '2048K',
      daysToKeep: 2,
    },
  },
  categories: {
    default: { appenders: ['trace'], level: 'info' },
    trace: { appenders: ['trace'], level: 'info' },
    error: { appenders: ['error'], level: 'info' },
  },
});

const traceLogger = log4js.getLogger('trace');
const errorLogger = log4js.getLogger('error');

export default async function (ctx: Context, next: VoidFunction): Promise<void> {
  const start = Date.now();
  await next();
  const { request, body, params, query } = ctx;
  const { method, body: req, url } = request;
  const reqString = JSON.stringify({
    ...(req || {}),
    ...(params || {}),
    ...(query || {}),
  });
  const responseBody: CommonObj = body || {};
  const { success } = responseBody;
  const targetLogger = success ? traceLogger : errorLogger;
  const responseStr = JSON.stringify(responseBody);
  const traceId = responseBody.traceId || '';
  const log = `${traceId} ${method} ${url} ${Date.now() - start}ms
  req: ${reqString}
  res: ${responseStr}
  `;
  targetLogger.fatal(log);
}