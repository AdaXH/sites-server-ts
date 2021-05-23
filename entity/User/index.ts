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
  @Prop({ required: true, minlength: 3, maxlength: 15 })
  name: string;

  /**
   * 密码
   */
  @Prop({ required: true, minlength: 6, maxlength: 20 })
  password: string;

  /**
   * 头像
   */
  @Prop({ maxlength: 100 })
  avatar?: string;

  /**
   * 邮箱
   */
  @Prop({ maxlength: 50 })
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
  @Prop({ maxlength: 200 })
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
  public queryMyBasicInfo(): CommonObj {
    const { avatar, name, gender, myDesc, qqUserId, userId } = this;
    return { avatar, name, gender, myDesc, qqUserId, userId };
  }

  public setMySites(mySites: SiteInfoDTO[]): void {
    this.mySites = mySites;
  }

  public setMyFavorite(myFavorite: SiteInfoDTO[]): void {
    this.myFavorite = myFavorite;
  }
}

export default getModelForClass(UserDTO, {
  options: { customName: 'test_users' },
  schemaOptions: {
    timestamps: { createdAt: 'gmtCreate', updatedAt: 'gmtModified' },
    versionKey: 'version',
  },
});
