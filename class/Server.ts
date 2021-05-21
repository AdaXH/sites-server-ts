import Application, { Context, DefaultContext, ParameterizedContext } from 'koa';
import { loadController, getEnv, loadPlugin, loadMiddleware } from '@/common';
import { ServerConfig } from '@/typings';
import { Database } from '.';
import Router from 'koa-router';
import { IncomingMessage, ServerResponse } from 'http';

export class Server extends Application {
  private config: ServerConfig;
  private app: Application;
  private controllers: unknown[];
  private router: Router = new Router();
  private plugins: VoidFunction[];
  private middlewares: Promise<VoidFunction>[];

  constructor(config: ServerConfig) {
    super();
    this.config = config;
    this.app = new Application();
    this.init();
  }

  async init(): Promise<void> {
    this.app.env = getEnv();
    this.middlewares = await loadMiddleware(this.config.middlewarePath);
    this.controllers = await loadController(this.config.controllerPath);
    this.plugins = await loadPlugin();

    await this.useMiddleware();
    this.registerPlugin();
    this.registerController();
  }

  createContext(
    req: IncomingMessage,
    res: ServerResponse,
  ): ParameterizedContext<any, DefaultContext, unknown> {
    const context = super.createContext(req, res);
    return context as Context;
  }

  /**
   * 路由注册
   */
  registerController(): void {
    this.controllers.forEach(({ url, route, method }) => {
      this.router[method](url, route);
    });
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }

  /**
   * 注册plugin
   */
  registerPlugin(): void {
    this.plugins.forEach(plugin => this.app.use(plugin));
  }

  /**
   * 注册中间件
   */
  async useMiddleware(): Promise<void> {
    this.middlewares.forEach(async item => {
      const middleware = await item;
      this.app.use(middleware);
    });
  }

  /**
   * 启动服务
   */
  startServer(): void {
    const { env } = this.app;
    const { host, port } = this.config.bootConfig[env];
    const db = new Database(host);
    db.connect();
    this.app.listen(port);
    // eslint-disable-next-line no-console
    console.log('server on ', port);
  }
}
