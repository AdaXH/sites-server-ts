import 'tsconfig-paths/register';
import 'reflect-metadata';
import Server from './class/Server';
import serverConfig from './config/port';

const server = new Server({
  controllerPath: `${__dirname}/controller`,
  rootPath: __dirname,
  serverConfig,
});

server.startServer();
