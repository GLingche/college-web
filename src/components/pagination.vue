
<template>
    <div class="pageStyle">
        <el-pagination 
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, slot, prev, pager, next, jumper"
        :total="total" 
        :hide-on-single-page="hidden"
        class="pagination">
        <span
            style="color: #606266; font-weight: normal;"
            class="">
            每页
            <el-select
                v-model="value"
                @change="handleSizeChange"
                placeholder="请选择"
            >
                <el-option
                    v-for="item in options"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
            &nbsp;条
        </span>
    </el-pagination>
    </div>
</template>

<script>
export default {
    
    props: {
        'total': Number,
        'pageSize': Number,
        'currentPage': Number,
        'handleSizeChange': Function,
        'handleCurrentChange': Function
    },
    data () {
        
        return {
            // 分页数据
            value:8,
            hidden: true,
            options:[8,16,24,32,40],
        }
    },
}
</script>
<style lang="scss" scoped>
.pageStyle ::v-deep button, .pageStyle ::v-deep .el-pager li {
    background-color: transparent !important;
    color: #323233 !important;
    border: 1px solid #d1d3d4;
    font-weight: 400;
}
.pageStyle ::v-deep .el-pagination.is-background .el-pager li:not(.disable).active {
    background-color: #347efe !important;
    color: white !important;
}
::v-deep .el-pagination .el-select .el-input{
    width: 56px !important;
}
::v-deep .el-pagination .el-select .el-input .el-input__inner {
    padding: 0 0 0 10px !important;
    text-align: left !important;
    height: 28px;
}
::v-deep .el-select .el-input .el-select__caret{
    transform: rotateZ(180deg) translateY(-5px);
}
::v-deep .el-select .el-input .el-select__caret.is-reverse {
    transform: rotateZ(0deg) translateY(-6px);
}
</style>
