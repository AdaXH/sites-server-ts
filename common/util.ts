import User from '@/entity/User';
import { CommonObj } from '@/typings';
import jwt from 'jsonwebtoken';
import { BizError } from '.';
import { Validate } from './diMethods';

function getJWTPayload(token) {
  // 验证并解析JWT
  if (!token) return;
  return jwt.verify(token, 'secret');
}
export function parseToken(authorization: string): unknown {
  try {
    const tokenParse = getJWTPayload(authorization);
    if (!tokenParse) throw new Error('你还没有登陆噢~');
    return tokenParse;
  } catch (error) {
    throw new BizError('鉴权失败，请重新登录', '-1', error);
  }
}

/**
 * 根据验证选项验证token
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
    throw new Error('用户已不存在');
  }
  const { admin, superAdmin } = user;
  if (needAdmin && !admin) {
    throw new Error('账号无权限');
  }
  if (needSuperAdmin && !superAdmin) {
    throw new Error('账号无权限');
  }
}

/**
 * 更新用户信息，以下字段不能带入body
 * @param updParam
 */
export function validateUpdUserParam(updParam: CommonObj): void {
  if ('admin' in updParam) {
    delete updParam.admin;
  }
  if ('superAdmin' in updParam) {
    delete updParam.superAdmin;
  }
  if ('userId' in updParam) {
    delete updParam.userId;
  }
  if ('_id' in updParam) {
    delete updParam._id;
  }
  if ('mySites' in updParam) {
    delete updParam.mySites;
  }
  if ('myFavorite' in updParam) {
    delete updParam.myFavorite;
  }
}
