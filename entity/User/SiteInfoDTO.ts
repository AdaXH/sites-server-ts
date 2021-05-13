import { SITETYPE } from '@/typings';
import { Prop } from '@typegoose/typegoose';
import { SiteInfo } from './interface';

export class SiteInfoDTO implements SiteInfo {
  @Prop()
  public siteType: SITETYPE;
  @Prop()
  public siteId: string;
}
