/*
* this.$serv
*/
import Proxy from 'lib/proxy';
import API from 'api';
import Match from 'lib/match';

export default Proxy({
    async getAdminInfo(params) {
        const resData = await API.getAdminInfo(params);
        return Match(resData, {
            username: '{{showname}}',
            userEmail: '{{username}}'
        });
    }
}, API);
