import { get, post } from 'lib/req';

export default {
    getSystemAuth: get('account/auth/list'),
    getAdminInfo: get(`account/info`),
    demoList: get(`demo/list`),
    demoUpdate: post('demo/update')
};
