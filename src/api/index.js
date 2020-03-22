import { get, post } from 'lib/req';
// import { domain } from 'conf/domain';
export default {
    login: post('login'),
    logout: post('logout'),
    list: get('list'),
    getUser: get('getUser')
};
