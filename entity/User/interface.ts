import { mongoose } from '@typegoose/typegoose';
import SettingDTO from './SettingDTO';

export interface SiteInfo {
  siteType: string;
  siteId: string;
}

export enum GenderEnum {
  '女' = 0,
  '男' = 1,
  '小猫咪' = 2,
}

export interface User {
  userId: mongoose.Types.ObjectId;
  name: string;
  password: string;
  avatar?: string;
  email?: string;
  lastLoginTime?: Date;
  registerTime?: Date;
  myDesc?: string;
  unionid?: string;
  admin?: boolean;
  superAdmin?: boolean;
  qqUserId?: string;
  gender?: GenderEnum;
  mySites?: SiteInfo[];
  myFavorite?: SiteInfo[];
  setting?: SettingDTO;
}

export interface Setting {
  acessNotification: {
    /**
     * 点赞通知
     */
    upvote: boolean;
    /**
     * 收藏通知
     */
    collectionNoti: boolean;
    /**
     * 留言回复通知
     */
    message: boolean;
  };
}
