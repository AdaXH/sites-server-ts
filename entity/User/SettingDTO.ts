import { Prop } from '@typegoose/typegoose';
import { Setting } from './interface';

class AcessNotification {
  /**
   * 点赞通知
   */
  @Prop({ default: true })
  public upvote: boolean;
  /**
   * 收藏通知
   */
  @Prop({ default: true })
  public collectionNoti: boolean;
  /**
   * 留言回复通知
   */
  @Prop({ default: true })
  public message: boolean;
}

export default class SettingDTO implements Setting {
  @Prop({ type: AcessNotification, _id: false })
  public acessNotification: AcessNotification;
}
