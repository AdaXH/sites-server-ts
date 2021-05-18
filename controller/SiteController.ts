import { Autowired, PostMapping, request } from '@/common';
import { BaseSite } from '@/entity/Site/interface';
import SiteService from '@/service/Site/SiteService';
import { querySiteInfoDTO, querySitesDTO } from '@/service/Site/SiteServiceImpl';

export default class SiteController {
  @Autowired()
  private siteService: SiteService;

  @PostMapping('/submitSite')
  public async submitSite(@request() body: BaseSite): Promise<BaseSite> {
    return this.siteService.submitSite(body);
  }

  @PostMapping('/querySites')
  public async querySites(@request() body: querySitesDTO): Promise<BaseSite[]> {
    return this.siteService.querySites(body);
  }

  @PostMapping('/querySite')
  public async querySite(@request() body: querySiteInfoDTO): Promise<BaseSite> {
    return this.siteService.querySite(body);
  }
}
