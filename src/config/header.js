import { getMainDomain } from 'lib/tool';
export default {
    mainUrl: 'https://house.focus.cn/',
    siteUrl: '',
    siteName: '内部管理后台',
    platformUrl: `//shengtai-op${getMainDomain()}`,
    logoutUrl: `//common-ldap${getMainDomain()}/logout?ru=${location.href}`
};
