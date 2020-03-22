import { getMainDomain } from 'lib/tool';
const byProxy = process.env.NODE_ENV === 'development';

export const domain = byProxy ? '/MOCK' : `//test${getMainDomain()}`;

