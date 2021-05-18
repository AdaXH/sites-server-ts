import { SiteType } from '@/typings';
import { mongoose } from '@typegoose/typegoose';

export interface SiteImg {
  src?: string;
}

export interface BaseSite {
  siteId?: mongoose.Types.ObjectId;
  siteName?: string;
  siteVerrify?: boolean;
  siteDesc?: string;
  submitDate?: Date;
  siteLink?: string;
  siteImg?: SiteImg[];
  userId?: string;
  siteUpvotes?: string[];
  isQuickSubmit?: boolean;
  notiEmail?: string;
  rss?: string;
  hot?: number;
  siteType?: SiteType;
}
