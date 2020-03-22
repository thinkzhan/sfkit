import { domain } from './domain';
export default {
    mainUrl: 'https://house.focus.cn/',
    siteUrl: '',
    siteName: '内部管理后台',
    platformUrl: `//shengtai-op${domain}`,
    logoutUrl: `//common-ldap${domain}/logout?ru=${location.href}`
};
