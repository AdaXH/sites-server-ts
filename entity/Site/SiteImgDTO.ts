import { Prop } from '@typegoose/typegoose';

export default class SiteImgDTO {
  @Prop()
  src?: string;
}
