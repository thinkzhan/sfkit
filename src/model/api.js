import request from './request';
import { baseUrl } from './env';
export default {
    checkUserToken(params) {
        return request.get(`${baseUrl}/api`, params);
    }
};
