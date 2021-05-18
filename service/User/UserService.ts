import { BizError, ErrorCodeEnum } from '@/common';
import UserInstance from '@/entity/User';
import { User } from '@/entity/User/interface';
import { CommonObj } from '@/typings';
import UserServiceImpl from './UserServiceImpl';

export default class UserService implements UserServiceImpl {
  public async insertUser(user: User): Promise<User> {
    const res = await UserInstance.create(user);
    return res;
  }

  /**
   * 根据userId查询用户信息
   * @param userId string
   * @return User
   */
  public async queryByUserId(userId: string): Promise<User> {
    if (!userId) {
      throw new BizError('用户缺少参数：id', ErrorCodeEnum.REQUIRED_ARGUMENUT);
    }

    const user = UserInstance.findOne({ userId }, { password: 0, _id: 0 });
    if (!user) {
      throw new BizError('用户不存在', ErrorCodeEnum.NOT_FOUND);
    }
    return user;
  }

  public async queryUserByName(name: string): Promise<User> {
    const res = await UserInstance.findOne({ name });
    return res;
  }

  async queryMyBasicInfo(userId: string): Promise<CommonObj> {
    const user = await UserInstance.findOne({ userId });
    const basicInfo: CommonObj = user.queryMyBasicInfo();
    return basicInfo;
  }
  // updateMySetting
}
