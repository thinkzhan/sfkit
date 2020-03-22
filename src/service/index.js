/**
 * 统一处理api数据
 * lib/proxy可以代理访问api的方法,不处理数据无需写在此处
 * 使用：const data = await this.$serv.opList();
*/
import API from 'api';
import Proxy from 'lib/proxy';

export default Proxy({
    async list(params) {
        const res =  await API.list(params);
        res.isTest = true;
        return res;
    }
}, API);
