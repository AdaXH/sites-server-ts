import Application, { Context } from 'koa';
import * as fs from 'fs';
import BodyParser from 'koa-body';
import Json from 'koa-json';
import jwt from 'jsonwebtoken';
import session from 'koa-session';
import chalk from 'chalk';
import User from '@/entity/User';
import { CommonObj } from '@/typings';
import { CommonResponse, BizError, ErrorCodeEnum } from '@/class';
import {
  BODY_META_KEY,
  PARAM_META_KEY,
  QUERY_ITEM_META_KEY,
  QUERY_META_KEY,
  TOKEN_META_KEY_PREFIX,
  logger,
  Validate,
} from '.';

export function getJWTPayload(token: string): unknown {
  // 验证并解析JWT
  if (!token) throw new BizError('你还没有登陆噢~', ErrorCodeEnum.NEED_LOGIN);
  return jwt.verify(token, 'secret');
}
export function parseToken(authorization: string): unknown {
  try {
    return getJWTPayload(authorization);
  } catch (error) {
    throw new BizError(
      error?.message || '鉴权失败，请重新登录',
      error?.errorCode || ErrorCodeEnum.PERMISSION_DENIED,
      error,
    );
  }
}

/**
 * 校验token
 * @param validateParam
 * @param authorization
 */
export async function validateToken(
  validateParam: Validate,
  authorization: string,
): Promise<void> {
  const { needAdmin, needSuperAdmin } = validateParam;
  const tokenObj: CommonObj = parseToken(authorization);
  const { userId } = tokenObj;
  const user = await User.findOne({ userId });
  if (!user) {
    throw new BizError('用户已不存在', ErrorCodeEnum.NOT_FOUND);
  }
  const { admin, superAdmin } = user;
  if (needAdmin && !admin) {
    throw new BizError('账号无权限', ErrorCodeEnum.PERMISSION_DENIED);
  }
  if (needSuperAdmin && !superAdmin) {
    throw new BizError('账号无权限', ErrorCodeEnum.PERMISSION_DENIED);
  }
}

/**
 * 加载controller文件夹
 * @param controllerPath
 * @returns
 */
export async function loadController(controllerPath: string): Promise<unknown[]> {
  const list = await fs.readdirSync(controllerPath);
  const controllers = [];
  await list.forEach(async item => {
    if (item === 'BaseController.ts') return;
    const Controller = await import(`${controllerPath}/${item}`);
    const instance = new Controller.default();
    const property = Object.getPrototypeOf(instance);
    const fnNames = Object.getOwnPropertyNames(property).filter(
      item => item !== 'constructor' && typeof property[item] === 'function',
    );
    fnNames.forEach(fn => {
      const { method, url } = Reflect.getMetadata(fn, property);
      logger.info(`register route: ${chalk.blue(`[${method}]`)} ${chalk.green(url)} `);
      controllers.push({
        method: method.toLowerCase(),
        url,
        route: async (ctx: Context) => {
          try {
            const {
              params,
              query,
              request: { body },
              headers: { authorization },
            } = ctx;
            const target = property[fn];
            property.ctx = ctx;
            // 获取param参数信息元数据 - restful
            const paramData = Reflect.getMetadata(PARAM_META_KEY, target);
            const args = [];
            // 获取param元数据 - restful
            if (paramData) {
              const { paramName, index } = paramData;
              args[index] = params[paramName];
            }
            // 获取query参数obj元数据
            const queryObjectIndex = Reflect.getMetadata(QUERY_META_KEY, target);
            if (queryObjectIndex) {
              args[queryObjectIndex] = query;
            }
            // 获取query参数元数据
            const queryItem = Reflect.getMetadata(QUERY_ITEM_META_KEY, target);
            if (queryItem) {
              const { index, queryItemName } = queryItem;
              args[index] = query[queryItemName];
            }
            // 获取request元数据
            const requestIndex = Reflect.getMetadata(BODY_META_KEY, target);
            if (requestIndex >= 0) {
              args[requestIndex] = body;
            }
            // 获取验证token元数据
            const validateParam = Reflect.getMetadata(
              `${TOKEN_META_KEY_PREFIX}${fn}`,
              target,
            );
            // 校验token
            if (validateParam) {
              await validateToken(validateParam, authorization);
            }
            const result: CommonObj = await property[fn](...args);
            const response: CommonResponse<CommonObj> = CommonResponse.success(result);
            ctx.body = response;
          } catch (error) {
            ctx.body = CommonResponse.error(error);
          }
        },
      });
    });
  });
  return controllers;
}

/**
 * 获取env
 * @return {string}
 */
export function getEnv(): string {
  const args = process.argv;
  return args[args.length - 1].replace(/--env=/, '');
}

/**
 * 加载插件
 * @returns
 */
export function loadPlugin(app: Application): VoidFunction[] {
  return [
    BodyParser({
      jsonLimit: '9mb',
      formLimit: '9mb',
      textLimit: '9mb',
    }),
    new Json(),
    session(
      {
        key: 'session_key',
        renew: true,
        maxAge: 172800000,
        beforeSave: (_, session) => {
          logger.info(session);
        },
      },
      app,
    ),
  ];
}

/**
 * 加载中间价
 * @param middlewarePath
 */
export async function loadMiddleware(
  middlewarePath: string,
): Promise<Promise<VoidFunction>[]> {
  const list = await fs.readdirSync(middlewarePath);
  return await list.map(async item => {
    const middlewareFile = await import(`${middlewarePath}/${item}`);
    return middlewareFile.default;
  });
}
