import { BizError, ErrorCodeEnum, MAP_SITE_DTO } from '@/common';
import { BaseSite } from '@/entity/Site/interface';
import SiteServiceImpl, { querySitesDTO, querySiteInfoDTO } from './SiteServiceImpl';

export default class SiteService implements SiteServiceImpl {
  /**
   * 查询站点列表
   * @param querySitesDTO
   */
  public async querySites(querySitesDTO: querySitesDTO): Promise<BaseSite[]> {
    const { filterType, siteType = 'technology', sortType } = querySitesDTO;
    const TargetSite = MAP_SITE_DTO[siteType];
    if (!TargetSite) {
      throw new BizError('不存在的站点类型');
    }
    const { page = 1, pageSize = 12 } = querySitesDTO;
    const queryFilterKey = filterType === 'submitDate' ? '_id' : filterType;
    const sortTypeArg = {
      [queryFilterKey]: sortType === 'up' ? -1 : 1,
    };
    const sitesList = await TargetSite.find(
      { siteVerify: true },
      {
        siteId: 1,
        siteDesc: 1,
        siteName: 1,
        siteType: 1,
        siteLink: 1,
        siteIcon: 1,
        submitDate: 1,
        siteVerify: 1,
        userId: 1,
        rss: 1,
        hot: 1,
        siteImgs: 1,
      },
    )
      .sort(sortTypeArg)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return sitesList;
  }

  /**
   * 查询站点详情
   * @param querySiteDto
   */
  public async querySite(querySiteDto: querySiteInfoDTO): Promise<BaseSite> {
    const { siteType, siteId } = querySiteDto;
    if (!MAP_SITE_DTO[siteType]) {
      throw new BizError('不存在的站点类型');
    }
    const TargetSite = MAP_SITE_DTO[siteType];
    const site = await TargetSite.findOne({ siteId }, { _id: 0 });
    if (!site) {
      throw new BizError('站点不存在', ErrorCodeEnum.NOT_FOUND);
    }
    return site;
  }

  /**
   * 提交站点
   * @param siteInfo
   */
  public async submitSite(siteInfo: BaseSite): Promise<BaseSite> {
    const { siteType } = siteInfo;
    const TargetSite = MAP_SITE_DTO[siteType];
    if (!TargetSite) {
      throw new BizError('不支持的站点类型');
    }
    const newSite = await TargetSite.create(siteInfo);
    return newSite;
  }
}
