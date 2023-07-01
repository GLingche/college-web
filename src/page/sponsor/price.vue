<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增奖品' : '更新奖品'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      >
      </common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manger-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      :control="false"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
      :manager="false"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { getUser } from "../../api/data";
import {
  adminInsertPrize,
  adminUpdatePrize,
  adminDeletePrize,
  InsertPrize,
  seleteByPage,
  UpdatePrize,
  DeletePrize,
  getusertype,
} from "../../api/test";
export default {
  name: "Price",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      userType: "",
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "id",
          label: "奖品编号",
          type: "input",
        },
        {
          model: "sponsorshipfeeds",
          label: "赞助源",
          type: "input",
        },
        {
          model: "sponsorshipgoals",
          label: "赞助目标",
          type: "input",
        },
        {
          model: "activityname",
          label: "活动",
          type: "input",
        },
        {
          model: "level",
          label: "级别",
          type: "input",
        },
        {
          model: "details",
          label: "内容",
          type: "input",
        },
        {
          model: "image",
          label: "图片",
          type: "input",
        },
        {
          model: "state",
          label: "状态",
          type: "input",
        },
        {
          model: "raceID",
          label: "赛事编号",
          type: "input",
        },
        {
          model: "UAccount",
          label: "用户账号",
          type: "input",
        },
      ],
      operateForm: {
        id: "",
        Sponsorshipfeeds: "",
        Sponsorshipgoals: "",
        activityname: "",
        level: "",
        details: "",
        image: "",
        state: "",
        raceID: "",
        UAccount: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "sponsorshipfeeds",
          label: "赞助源",
        },
        {
          prop: "sponsorshipgoals",
          label: "赞助目标",
        },
        {
          prop: "activityname",
          label: "活动",
        },
        {
          prop: "level",
          label: "级别",
          width: 200,
        },
        {
          prop: "details",
          label: "内容",
          width: 320,
        },
        {
          prop: "id",
          label: "奖品编号",
          width: 320,
        },
        {
          prop: "state",
          label: "状态",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        if (!this.userType) {
          UpdatePrize(this.operateForm).then((res) => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "成功",
              });
            } else {
              this.$message({
                type: "error",
                message: "比赛已经开始，不能编辑奖品信息",
              });
            }
            this.getList();
            this.isShow = false;
          });
        } else {
          adminUpdatePrize(this.operateForm).then((res) => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "成功",
              });
            } else {
              this.$message({
                type: "error",
                message: "比赛已经开始，不能编辑奖品信息",
              });
            }
            this.getList();
            this.isShow = false;
          });
        }
      } else {
        InsertPrize(this.operateForm).then((res) => {
          if (res.data) {
            this.$message({
              type: "success",
              message: "成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "比赛已经开始，不能新增奖品信息",
            });
          }
          this.getList();
          this.isShow = false;
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm("此操作将删除改行，是否继续?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        DeletePrize({
          id: row.id,
          raceID: row.raceID,
          UAccount: "user1",
        }).then((res) => {
          if (res.data) {
            this.getList();
            this.$message({
              type: "success",
              message: "成功删除",
            });
          }
          {
            this.$message({
              type: "error",
              message: "比赛已经开始，不能删除奖品信息",
            });
          }
          console.log(res, "dfffffffffffff22222222222");
          console.log(JSON.stringify(res.data.records), "dsfds");
        });
      });
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      console.log(this.config.page, "test");
      seleteByPage({
        page: this.config.page,
        size: this.config.total,
        activityname: name,
      }).then(({ data: res }) => {
        console.log(res, "dfsfsd11111111111111");
        this.tableData = res.records;
        console.log(this.tableData, "thsaf");
        // this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    getusertype().then(({ data: res }) => {
      if (res == "管理员") {
        this.userType = true;
      } else {
        this.userType = false;
      }
      console.log(this.userType, "toetype去1111");
    });
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
