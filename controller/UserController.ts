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

  @PostMapping('/add-user')
  public async insertUser(@request() body: User): Promise<CommonObj> {
    return this.userService.insertUser(body);
  }

  @GetMapping('/queryMyBasicInfo/:userId')
  @TokenValidate()
  public async queryMyBasicInfo(@param('userId') userId: string): Promise<CommonObj> {
    return this.userService.queryMyBasicInfo(userId);
  }
}
