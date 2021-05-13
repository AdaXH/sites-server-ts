import Application from 'koa';
import BodyParser from 'koa-body';
import Json from 'koa-json';

function getEnv(): string {
  const args = process.argv;
  return args[args.length - 1].replace(/--env=/, '');
}

export function registerBasicPlugin(app: Application, config?: { dir: string }): void {
  app.env = getEnv();
  const { dir } = config || {};
  const plugins = [
    BodyParser({
      jsonLimit: '9mb',
      formLimit: '9mb',
      textLimit: '9mb',
    }),
    new Json(),
  ];
  plugins.forEach(plugin => app.use(plugin));
}
