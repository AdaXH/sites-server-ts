import { CommonObj } from '@/typings';
import { getModelForClass, mongoose, Prop, prop } from '@typegoose/typegoose';
import { GenderEnum, SiteInfo, User } from './interface';
import SettingDTO from './SettingDTO';
import { SiteInfoDTO } from './SiteInfoDTO';

class UserDTO implements User {
  /**
   * 用户id
   */
  @prop({ unique: true, auto: true })
  userId!: mongoose.Types.ObjectId;
  /**
   * 用户名
   */
  @Prop({ required: true, maxlength: 20, minlength: 3 })
  name: string;

  /**
   * 密码
   */
  @Prop({ required: true, maxlength: 200, minlength: 10 })
  password: string;

  /**
   * 头像
   */
  @Prop({ maxlength: 500 })
  avatar?: string;

  /**
   * 邮箱
   */
  @Prop({ maxlength: 100 })
  email?: string;

  /**
   * 上次登录时间
   */
  @Prop()
  lastLoginTime?: Date;

  /**
   * 注册时间
   */
  @Prop({ default: Date.now() })
  registerTime?: Date;

  /**
   * 个人简介
   */
  @Prop({ default: '我懒得写简介（其实这句话是默认的）', maxlength: 100 })
  myDesc?: string;

  /**
   * qq sdk返回id
   */
  @Prop()
  unionid?: string;

  /**
   * qq 用户id
   */
  @Prop()
  qqUserId?: string;

  /**
   * 管理员
   */
  @Prop({ default: false })
  admin?: boolean;

  /**
   * 超级管理员
   */
  @Prop({ default: false })
  superAdmin?: boolean;

  @Prop({ enum: GenderEnum, default: 2 })
  gender?: GenderEnum;
  /**
   * 用户站点
   */
  @Prop({ type: [SiteInfoDTO], _id: false })
  mySites?: SiteInfo[];

  /**
   * 用户收藏
   */
  @Prop({ type: [SiteInfoDTO], _id: false })
  myFavorite?: SiteInfo[];

  /**
   * 用户设置
   */
  @Prop({ type: SettingDTO, _id: false })
  setting?: SettingDTO;

  // 查询基本信息
  public queryMyBasicInfo(): User {
    const { avatar, name, gender, myDesc, qqUserId, userId } = this;
    return { avatar, name, gender, myDesc, qqUserId, userId } as User;
  }
}

export default getModelForClass(UserDTO, {
  options: { customName: 'test_users' },
  schemaOptions: {
    timestamps: { createdAt: 'gmtCreate', updatedAt: 'gmtUpdate' },
    versionKey: 'version',
  },
});
