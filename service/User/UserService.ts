import { BizError, ErrorCodeEnum } from '@/class';
import UserInstance from '@/entity/User';
import { User } from '@/entity/User/interface';
import { CommonObj } from '@/typings';
import UserServiceImpl from './UserServiceImpl';

export default class UserService implements UserServiceImpl {
  /**
   * 注册
   * @param user User
   * @returns {User}
   */
  public async register(user: User): Promise<User> {
    await this.queryUserByName(user.name);
    const res = await UserInstance.create(user);
    res.password = null;
    return res;
  }

  /**
   * 根据userId查询用户信息
   * @param userId string
   * @return {User}
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

  /**
   * 根据name查用户
   * @param name string
   * @returns {User}
   */
  public async queryUserByName(name: string): Promise<void> {
    const user = await UserInstance.findOne({ name });
    if (user) {
      throw new BizError('用户名已存在', ErrorCodeEnum.EXSIT_DATA);
    }
  }

  /**
   * 查询用户基础信息
   * @param userId string
   * @returns
   */
  async queryMyBasicInfo(userId: string): Promise<CommonObj> {
    const user = await UserInstance.findOne({ userId });
    const basicInfo: CommonObj = user.queryMyBasicInfo();
    return basicInfo;
  }

  /**
   * 更新用户信息
   * @param userId
   * @param updateDto
   */
  async updateUser(userId: string, updateDto: CommonObj): Promise<User> {
    const { name } = await this.queryByUserId(userId);
    if (updateDto.name && updateDto.name !== name) {
      await this.queryUserByName(updateDto.name);
    }
    const updateUser = await UserInstance.findOneAndUpdate({ userId }, updateDto, {
      runValidators: true,
      new: true,
    });
    return updateUser;
  }
}
