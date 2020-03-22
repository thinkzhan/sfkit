import { Loading } from 'element-ui';
/**
 *** this.search(true) 查询参数的绑定数值改变立即生效 比如点击搜索按钮
 *** this.search() 查询参数的绑定数值改变不影响 比如翻页
 *** this.deleteRow(row, index) 删除表格中某一行
 * */

export default {
    data() {
        return {
            // to override: 搜索选项
            searchOptions: {},
            __searchOptions: {},
            originSearchData: {},
            tableList: [],

            pageInfo: {
                itemCount: 0,
                page: +this.getCache('page') || 1,
                pageSize: +this.getCache('pageSize') || 10
            }
        };
    },
    methods: {
        __changeSearchOptions(params = {}) {
            this.__searchOptions = Object.assign({}, this.searchOptions, params);
        },
        // 扩展用：设置额外参数
        setMoreParams(params = {}) {
            this.searchOptions = Object.assign({}, this.searchOptions, params);
        },
        handleSizeChange(val) {
            this.setCache('pageSize', val);
            this.pageInfo.pageSize = val;
            this.pageInfo.page = 1;
            this.search();
        },
        handleCurrentChange(val) {
            this.pageInfo.page = val;
            this.setCache('page', val);
            this.setCache('pageSize', this.pageInfo.pageSize);
            this.search();
        },

        searchClick() {
            // this.dataFlag = true;
            this.__changeSearchOptions();
            // this.pageInfo.page = +this.getCache('page') || 1;
            this.setCache('page', 1);
            this.pageInfo.page = 1;

            this.search(true);
        },

        async search(changeNow) {
            Object.keys(this.searchOptions).map(k => {
                // 字段设置了缓存
                if (this.cacheModelList[k]) {
                    localStorage.setItem(`${this.$route.path}--${k}`, this.searchOptions[k]);
                }
            });

            window.loading = Loading.service({});
            const params = this.getSearchParams(changeNow);

            try {
                const data = await this.getDataAPI(params);
                this.afterSearch(data);
            } catch (e) {
                console.log(e);
            } finally {
                window.loading.close();
            }
        },

        getSearchParams(changeNow) {
            const params = JSON.parse(
                JSON.stringify(
                    changeNow ? this.searchOptions : this.__searchOptions
                )
            );
            params.pageSize = this.pageInfo.pageSize;
            params.page = this.pageInfo.page || this.pageInfo.currentPage;
            return params;
        },

        afterSearch(data) {
            console.log(data);
            this.originSearchData = data;
            this.tableList = JSON.parse(JSON.stringify(data.list));
            this.pageInfo.itemCount = data.totalCount;
        },
        getCache(name) {
            return localStorage.getItem(`${this.$route.path}--${name}`);
        },
        setCache(name, v) {
            // return localStorage.setItem(`${this.$route.path}--${name}`, v);
        }
    },
    created() {
        this.__changeSearchOptions();
    },
    // test
    beforeMount() {
        this.__changeSearchOptions(); // 保证取到路由参数
        // this.search();
    }
};
