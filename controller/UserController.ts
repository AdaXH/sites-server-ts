import {
  Autowired,
  param,
  GetMapping,
  request,
  PostMapping,
  TokenValidate,
} from '@/common';
import { User } from '@/entity/User/interface';
import UserService from '@/service/User/UserService';
import { CommonObj } from '../typings';

export default class UserController {
  @Autowired()
  private userService: UserService;

  @GetMapping('/user/:userId')
  public async queryUser(@param('userId') userId: string): Promise<CommonObj> {
    return this.userService.queryByUserId(userId);
  }

  @PostMapping('/register')
  public async insertUser(@request() body: User): Promise<User> {
    return this.userService.register(body);
  }

  @GetMapping('/queryMyBasicInfo/:userId')
  @TokenValidate()
  public async queryMyBasicInfo(@param('userId') userId: string): Promise<CommonObj> {
    return this.userService.queryMyBasicInfo(userId);
  }

  @PostMapping('/updateUser/:userId')
  public async updateUser(
    @param('userId') userId: string,
    @request() updateDto: CommonObj,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateDto);
  }
}
