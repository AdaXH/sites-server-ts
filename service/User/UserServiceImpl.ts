import { User } from '@/entity/User/interface';
import { CommonObj } from '@/typings';

export default interface UserServiceImpl {
  queryByUserId: (userId: string) => Promise<User>;
  queryUserByName: (name: string) => Promise<void>;
  register: (user: User) => Promise<User>;
  queryMyBasicInfo: (userId: string) => Promise<CommonObj>;
  updateUser: (userId: string, updateDto: CommonObj) => Promise<User>;
  getUserInfo: (token: string) => Promise<User>;
}
