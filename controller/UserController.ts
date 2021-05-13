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
  public async register(@request() body: User): Promise<CommonObj> {
    return this.userService.register(body);
  }

  @PostMapping('/login')
  public async login(@request() body: User): Promise<CommonObj> {
    return this.userService.login(body);
  }

  @GetMapping('/queryMyBasicInfo/:userId')
  @TokenValidate()
  public async queryMyBasicInfo(@param('userId') userId: string): Promise<CommonObj> {
    return this.userService.queryMyBasicInfo(userId);
  }

  @PostMapping('/test-upd/:userId')
  public async testUpd(
    @param('userId') userId: string,
    @request() body: CommonObj,
  ): Promise<CommonObj> {
    return this.userService.updateUser(userId, body);
  }
}
