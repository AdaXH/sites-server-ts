import { BaseSite } from '@/entity/Site/interface';
import { SiteType } from '@/typings';

export interface querySitesDTO {
  siteType: SiteType;
  page?: number;
  pageSize?: number;
  sortType?: string;
  filterType?: string;
}

export interface querySiteInfoDTO {
  siteType: SiteType;
  siteId: string;
}

export default interface SiteServiceImpl {
  querySites: (arg: querySitesDTO) => Promise<BaseSite[]>;
  querySite: (arg: querySiteInfoDTO) => Promise<BaseSite>;
  submitSite: (arg: BaseSite) => Promise<BaseSite>;
}
