import { getModelForClass, Prop } from '@typegoose/typegoose';
import BasicSiteDTO from './BasicSiteDTO';

export class TechnologySiteDTO extends BasicSiteDTO {
  @Prop()
  siteType: 'technology';
}

export default getModelForClass(TechnologySiteDTO, {
  schemaOptions: {
    timestamps: {
      createdAt: 'submitDate',
      updatedAt: 'gmtModified',
    },
    versionKey: 'version',
  },
  options: {
    customName: 'technologysites',
  },
});
