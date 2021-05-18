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
