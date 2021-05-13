import { BizError, ErrorCodeEnum, validateUpdUserParam } from '@/common';
import UserInstance from '@/entity/User';
import { User } from '@/entity/User/interface';
import { CommonObj } from '@/typings';
import UserServiceImpl from './UserServiceImpl';

export default class UserService implements UserServiceImpl {
  /**
   * 注册
   * @param user {User}
   * @returns {User}
   */
  public async register(user: User): Promise<User> {
    await this.checkNameExsit(user.name);
    validateUpdUserParam(user);
    const res = await UserInstance.create(user);
    return res;
  }

  /**
   * 登录
   * @param user {User}
   * @returns {User}
   */
  public async login(loginParam: CommonObj): Promise<User> {
    const { name, password } = loginParam;
    if (!name || !password) {
      throw new BizError('账号密码参数必填', ErrorCodeEnum.REQUIRED_ARGUMENUT);
    }
    try {
      await this.queryByUserId(name);
    } catch (error) {
      await this.queryByEmail(name);
    }
    let user = null;
    user = await UserInstance.findOne({ name, password });
    if (!user) {
      user = await UserInstance.findOne({ email: name, password });
    }
    if (!user) {
      throw new BizError('账号密码不正确', ErrorCodeEnum.ACCOUNT_PASSWORD_NOT_MATCH);
    }
    return user;
  }

  /**
   * 根据userId查询用户信息
   * @param userId string
   * @return {User}
   */
  public async queryByUserId(userId: string): Promise<User> {
    if (!userId) {
      throw new BizError('缺少参数：userId', ErrorCodeEnum.REQUIRED_ARGUMENUT);
    }
    const user = UserInstance.findOne({ userId }, { password: 0 });
    if (!user) {
      throw new BizError('用户不存在', ErrorCodeEnum.NOT_FOUND);
    }
    return user;
  }

  /**
   * 根据email查询用户信息
   * @param email
   * @returns {User}
   */
  public async queryByEmail(email: string): Promise<User> {
    const user = UserInstance.findOne({ email }, { password: 0 });
    if (!user) {
      throw new BizError('用户不存在', ErrorCodeEnum.NOT_FOUND);
    }
    return user;
  }

  /**
   * 校验用户名是否存在
   * @param name {string}
   */
  public async checkNameExsit(name: string): Promise<void> {
    if (!name) {
      throw new BizError('缺少参数：name', ErrorCodeEnum.REQUIRED_ARGUMENUT);
    }
    const userNameCount = await UserInstance.find({ name }).count();
    if (userNameCount >= 1) {
      throw new BizError('名字已被占用', ErrorCodeEnum.ARGUMRNT_EXIST);
    }
  }

  /**
   * 查询用户基础信息
   * @param userId string
   * @returns {User}
   */
  public async queryMyBasicInfo(userId: string): Promise<User> {
    const user = await UserInstance.findOne({ userId });
    const basicInfo: User = user.queryMyBasicInfo();
    return basicInfo;
  }

  /**
   * 更新用户信息
   * @param userId
   * @param userParam
   * @returns {User}
   */
  public async updateUser(userId: string, userParam: CommonObj): Promise<User> {
    if (!userId) {
      throw new BizError('缺少参数：userId', ErrorCodeEnum.REQUIRED_ARGUMENUT);
    }
    if (!userParam) {
      throw new BizError('缺少更新参数', ErrorCodeEnum.REQUIRED_ARGUMENUT);
    }
    if (userParam.name) {
      await this.checkNameExsit(userParam.name);
    }
    validateUpdUserParam(userParam);
    const user = await UserInstance.findOneAndUpdate(
      { userId },
      { ...userParam, $inc: { version: 1 } },
      {
        new: true,
        runValidators: true,
      },
    );
    return user;
  }
}
