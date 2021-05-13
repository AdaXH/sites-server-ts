import { User } from '@/entity/User/interface';
import { CommonObj } from '@/typings';

export default interface UserServiceImpl {
  queryByUserId: (userId: string) => Promise<User>;
  queryByEmail: (email: string) => Promise<User>;
  register: (user: User) => Promise<User>;
  queryMyBasicInfo: (userId: string) => Promise<CommonObj>;
  updateUser: (userId: string, userParam: CommonObj) => Promise<User>;
  checkNameExsit: (userId: string) => Promise<void>;
  login: (loginParam: CommonObj) => Promise<User>;
}
