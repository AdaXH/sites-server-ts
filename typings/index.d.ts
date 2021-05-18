import { Context } from 'koa';

type CommonObj = {
  [x?: string]: any;
};

interface CommonCtx extends Context {
  request: {
    body: CommonObj;
  };
}

type SiteType = 'technology' | 'life' | 'info' | 'others';
