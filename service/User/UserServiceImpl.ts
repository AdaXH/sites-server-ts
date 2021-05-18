import { User } from '@/entity/User/interface';
import { CommonObj } from '@/typings';

export default interface UserServiceImpl {
  queryByUserId: (userId: string) => Promise<User>;
  queryUserByName: (name: string) => Promise<User>;
  insertUser: (user: User) => Promise<User>;
  queryMyBasicInfo: (userId: string) => Promise<CommonObj>;
}
