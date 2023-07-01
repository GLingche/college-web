<template>
  <div class="common-table">
    <el-table :data="tableData" height="90%" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="350">
        <template slot-scope="scope">
          <el-button size="mini" @click="handerEdit(scope.row)" v-if="isEdit"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handerDelete(scope.row)"
            >删除</el-button
          >
          <el-button
            v-if="manager"
            size="mini"
            type="primary"
            @click="authManager(scope.row)"
            >授权管理员</el-button
          >
          <el-button
            v-if="manager"
            size="mini"
            type="info"
            @click="changeStatus(scope.row)"
            >注销</el-button
          >
          <el-button
            v-if="manager"
            size="mini"
            type="success"
            @click="changeStatus2(scope.row)"
            >启用</el-button
          >
          <el-switch
            style="margin-left: 16px"
            v-show="control"
            :active-value="1"
            :inactive-value="0"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#eeee"
            @change="change(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      layout="prev,pager,next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="20"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
    control: Boolean,
    manager: {
      type: Boolean,
      default: true,
    },
    isEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return { value: 1, show: this.control };
  },
  methods: {
    handerEdit(row) {
      this.$emit("edit", row);
    },
    handerDelete(row) {
      this.$emit("del", row);
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
    change(row) {
      this.$confirm("此操作将改变当前的审批状态，是否继续", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("authManager", row);
        })
        .catch(() => {
          if (row.state == 1) {
            row.state = 0;
          } else {
            row.state = 1;
          }
        });
    },
    changeStatus(row) {
      this.$emit("cancal", row);
    },
    changeStatus2(row) {
      this.$emit("cancal2", row);
    },
    authManager(row) {
      this.$emit("authManager", row);
    },
  },
};
</script>

<style lang="less" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .page {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
