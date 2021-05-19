import Application from 'koa';
import { loadController, getEnv, loadPlugin } from '@/common';
import { CommonObj } from '@/typings';
import Database from '@/common/db';
import Router from 'koa-router';

export default class Server {
  private config: CommonObj = {};
  private app: Application;
  private controllers: unknown[];
  private router: Router = new Router();
  private plugins: any[];
  constructor(config: CommonObj) {
    this.config = config;
    this.app = new Application();
    this.plugins = loadPlugin();
    this.init();
  }
  async init(): Promise<void> {
    this.app.env = getEnv();
    this.registerPlugin();
    this.controllers = await loadController(this.config.controllerPath);
    this.registerController();
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
   * 启动服务
   * @param serverConfig
   */
  startServer(): void {
    const { env } = this.app;
    const { host, port } = this.config.serverConfig[env];
    const db = new Database(host);
    db.connect();
    this.app.listen(port);
    console.log('server on ', port);
  }
}
