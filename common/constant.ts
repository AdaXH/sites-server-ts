import { BaseSite } from '@/entity/Site/interface';
import TechnologySiteDTO from '@/entity/Site/TechnologySiteDTO';
import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { SiteType } from '@/typings';

export const PARAM_META_KEY = 'param:';

export const QUERY_META_KEY = 'query:';

export const QUERY_ITEM_META_KEY = 'query:item';

export const BODY_META_KEY = 'body:';

export const TOKEN_META_KEY_PREFIX = 'token:';

export const CTX_META_KEY_PREFIX = 'ctx:';

export const CONTEXT_META_KEY_PREFIX = 'ctx:';

/**
 * 站点类型映射实体
 */
type ReturnType = ReturnModelType<AnyParamConstructor<BaseSite>, Record<string, unknown>>;
type TYPE_SITE_DTO = {
  [x in SiteType]?: ReturnType;
};
export const MAP_SITE_DTO: TYPE_SITE_DTO = {
  technology: TechnologySiteDTO as ReturnType,
};

export enum PROCESS_EVENT {
  'CLOSE' = 'CLOSE',
  'RELOAD_DB' = 'RELOAD_DB',
}
