import { SiteType } from '@/typings';
import { mongoose, Prop } from '@typegoose/typegoose';
import { BaseSite, SiteImg } from './interface';
import SiteImgDTO from './SiteImgDTO';

export default class BasicSiteDTO implements BaseSite {
  /**
   * 站点id
   */
  @Prop({ unique: true, auto: true })
  siteId: mongoose.Types.ObjectId;

  /**
   * 站点名称
   */
  @Prop({ required: true, minlength: 3, maxlength: 100 })
  siteName: string;

  /**
   * 站点审核状态
   */
  @Prop({ default: false })
  siteVerrify?: boolean;

  /**
   * 站点描述
   */
  @Prop({ minlength: 10, maxlength: 200 })
  siteDesc?: string;

  submitDate?: Date;

  /**
   * 站点链接
   */
  @Prop({ maxlength: 100, required: true })
  siteLink: string;

  /**
   * 站点图标
   */
  @Prop({ type: [SiteImgDTO] })
  siteImg?: SiteImg[];

  /**
   * 站长id
   */
  @Prop()
  userId?: string;

  /**
   * 点赞的站点id列表
   */
  @Prop({ type: [String] })
  siteUpvotes?: string[];

  /**
   * 是否是快速提交
   */
  @Prop()
  isQuickSubmit?: boolean;

  /**
   * 快速提交时的通知邮件
   */
  @Prop({ maxlength: 100 })
  notiEmail?: string;

  @Prop({ maxlength: 100 })
  rss?: string;

  /**
   * 热度
   */
  hot?: number;
  siteType?: SiteType;
}
