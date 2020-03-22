<template lang="pug">
    div.table-search
        div.table-search__options
            form-maker.table-search__options--item(
                :config="searchConfig"
                v-model="searchOptions"
                @change="onSearchChange"
                @inited="searchClick"
            )
            template(v-if="!hideOperate")
                slot(
                    name="operate"
                    :showDialog="showDialog"
                    :search="searchClick"
                    :download="download"
                )
                    el-button(type="primary" @click="searchClick") 搜索
                    el-button.f-right(type="primary" @click="download") 导出数据
        template
                slot(
                    name="beforeTable"
                    :originSearchData="originSearchData"
                )
        el-table.table(
                :data="tableList" border
                @selection-change="handleSelectionChange"
            )
            template(v-for="(column, index) in tableConfig")
                el-table-column(v-if="column.type==='selection'" type="selection")
                el-table-column(
                    v-else
                    :key="index"
                    :label="column.label"
                    :width="column.width"
                    :min-width="column.minWidth"
                    :align="column.align || 'center'"
                    :fixed="column.fixed"
                    header-align="center"
                    :show-overflow-tooltip="false"
                    )
                    template(slot-scope="scope" )
                        template(
                           v-if="column.action"
                        )
                            template(v-for="ac in column.action")
                                el-button(v-if="ac==='update'" type="primary" plain size="small" @click="showDialog({data: scope.row, update: true, title:'编辑'})") 编辑
                                el-button(v-if="ac==='delete'" type="primary" plain size="small" @click="deleteRow(scope.row, scope.$index)") 删除
                        table-expand(
                            v-if="column.render"
                            :render="column.render"
                            :row="scope.row"
                            :index="index"
                            :column="column"
                        )
                        span(v-else) {{column.format ? column.format(scope.row[column.prop]) : scope.row[column.prop] }}
        el-pagination(
            v-if="!hidePagenation && tableList.length > 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.pageNo"
            :page-size="pageInfo.pageSize"
            :page-sizes="[10, 20, 30, 50]"
            layout="total,sizes, prev, pager, next, jumper"
            :total="pageInfo.itemCount")
        dialog-maker(
            :config="dialogConfig"
            :formConfig="formConfig"
            @add="add"
            @update="update"
        )
            // 配置了formConfig则用默认，否则自定义slot
            template(v-if="!formConfig || !formConfig.data" slot-scope="scope")
                    slot(name="dialog"
                        :dialog="scope.dialogConfig"
                        :add="add"
                        :update="update"
                    )
</template>

<script>
import tableSearchMixin from './table-search';
import TableExpand from './TableExpand';
import DialogMaker from './DialogMaker';
import dialogEditMixin from './DialogMaker/mixin';
import FormMaker from './FormMaker/index.js';

export default {
    mixins: [ tableSearchMixin, dialogEditMixin ],
    components: { TableExpand, DialogMaker, FormMaker },
    props: {
        hideOperate: false,
        // 筛选项配置
        searchConfig: {
            default() {
                return {
                    data: []
                };
            }
        },
        // 表格配置
        tableConfig: {
            default() {
                return [];
            }
        },
        // 编辑框配置
        formConfig: {
            default() {
                return {};
            }
        },
        // 增
        addDataAPI: {
            default() {}
        },
        // 删
        delDataAPI: {
            default() {}
        },
        // 改
        updateDataAPI: {
            default() {}
        },
        // 查
        getDataAPI: {
            default() {}
        },
        // 导出
        downloadDataAPI: {
            default() {}
        },
        hidePagenation: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            cacheModelList: {}
        };
    },
    methods: {
        async add(params) {
            const res = await this.addDataAPI(params);
            this.onDialogAdd(params);
            return res;
        },
        async deleteRow(row, index) {
            await this.$confirm('确认删除？');
            await this.delDataAPI(row);
            this.tableList.splice(index, 1);
            this.notifyOk('删除成功');
        },
        async update(params) {
            const res = await this.updateDataAPI(params);
            this.onDialogUpdate(params);
            return res;
        },
        async download() {
            await this.downloadDataAPI(this.getSearchParams());
        },
        onSearchChange(data, conf) {
            conf.defaultAction === false ? this.$emit(`${conf.type}Change`, conf): this.searchClick();
        },
        handleSelectionChange(val) {
            this.$emit('selection-change', val);
        }
    },
    async created() {
        if (!this.searchConfig.ui) {
            this.searchConfig.ui = {};
        }
        this.searchConfig.ui.inline = true;

        this.searchConfig.data && this.searchConfig.data.forEach(d => {
            if (d.cache) {
                this.cacheModelList[d.model] = true;
                const cache  = localStorage.getItem(`${this.$route.path}--${d.model}`);
                if (cache) {
                    d.modelValue = String(cache);
                }
            }
        });
    }
};

</script>

<style lang="stylus" scoped>
.tab-card .table-search__options
    margin-top: 0
.table-search
    &__options
        position: relative
        overflow: hidden
        margin-top: 30px
        &--item
            float: left
            margin-bottom: 0
</style>

