import { Prop } from '@typegoose/typegoose';
import { SiteInfo } from './interface';

export class SiteInfoDTO implements SiteInfo {
  @Prop()
  public siteType: string;
  @Prop()
  public siteId: string;
}
