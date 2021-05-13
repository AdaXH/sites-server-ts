import 'tsconfig-paths/register';
import Koa from 'koa';
import {
  registerRoute,
  registerBasicPlugin as usePlugin,
  connectDb as startServer,
} from './common';
import 'reflect-metadata';
// import tsConfig from './tsconfig.json';

// When path registration is no longer needed
const app = new Koa();

// register pligun
usePlugin(app, { dir: __dirname });

// register router
registerRoute(app, { dir: __dirname });

// start server, connect database
startServer(app);
