import { Context } from 'koa';

type CommonObj = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x?: string]: any;
};

interface CommonCtx extends Context {
  request: {
    body: CommonObj;
  };
}

type SiteType = 'technology' | 'life' | 'info' | 'others';

interface ServerConfig {
  controllerPath: string;
  middlewarePath: string;
  rootPath: string;
  bootConfig: {
    [x: string]: {
      host: string;
      port: number | string;
    };
  };
}
