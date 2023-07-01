<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增广告' : '更新广告'"
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
  getusertype,
  selectAds,
  updateAds,
  AupdateAds,
  AcreateAds,
  deleteAds,
  createAds,
  AdeleteAds,
} from "../../api/test";
export default {
  name: "Ad",
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
          model: "adsID",
          label: "广告id",
          type: "input",
        },
        {
          model: "sponsors",
          label: "广告商",
          type: "input",
        },
        {
          model: "adsType",
          label: "类型",
          type: "input",
        },
        {
          model: "videoAdress",
          label: "视频地址",
          type: "input",
        },
        {
          model: "imageAdress",
          label: "图片地址",
          type: "input",
        },
        {
          model: "state",
          label: "状态",
          type: "input",
        },
        {
          model: "items",
          label: "项目",
          type: "input",
        },
        {
          model: "id",
          label: "id",
          type: "input",
        },
        {
          model: "UAccount",
          label: "账号",
          type: "input",
        },
      ],
      operateForm: {
        adsID: "",
        sponsors: "",
        adsType: "",
        videlAdress: "",
        imageAdress: "",
        state: "",
        items: "",
        id: "",
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
          prop: "sponsors",
          label: "广告商",
        },
        {
          prop: "id",
          label: "编号",
        },
        {
          prop: "items",
          label: "项目",
        },
        {
          prop: "adsType",
          label: "类型",
        },
        {
          prop: "videoAdress",
          label: "视频地址",
          width: 200,
        },
        {
          prop: "imageAdress",
          label: "图片地址",
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
          updateAds(this.operateForm).then((res) => {
            if (res.data) {
              this.$message({
                type: "success",
                message: "成功",
              });
            } else {
              this.$message({
                type: "error",
                message: "比赛已经开始，不能编辑广告信息",
              });
            }
            this.getList();
            this.isShow = false;
          });
        } else {
          AupdateAds(this.operateForm).then((res) => {
            this.getList();
            this.$message({
              type: "success",
              message: "成功",
            });
            this.isShow = false;
            console.log(res, "dfffffffffffff22222222222");
            console.log(JSON.stringify(res.data.records), "dsfds");
          });
        }
        this.getList();
        this.isShow = false;
      } else {
        createAds(this.operateForm).then((res) => {
          if (res.data) {
            this.getList();
            this.$message({
              type: "success",
              message: "成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "比赛已经开始，不能新增广告信息",
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
        adsID: "",
        sponsors: "",
        adsType: "",
        videlAdress: "",
        imageAdress: "",
        state: "",
        Items: "",
        id: "",
        UAccount: "",
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
        console.log(row, "this");
        if (!this.userType) {
          deleteAds({
            id: row.id,
            adsID: row.adsID,
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
                message: "比赛已经开始，不能删除广告信息",
              });
            }
            console.log(res, "dfffffffffffff22222222222");
            console.log(JSON.stringify(res.data.records), "dsfds");
          });
        } else {
          AdeleteAds({
            id: row.id,
          }).then((res) => {
            this.getList();
            this.$message({
              type: "success",
              message: "成功删除",
            });
            console.log(res, "dfffffffffffff22222222222");
            console.log(JSON.stringify(res.data.records), "dsfds");
          });
        }
      });
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      console.log(this.config.page, "test");
      selectAds({
        page: this.config.page,
        size: this.config.total,
        sponsors: name,
      }).then(({ data: res }) => {
        this.tableData = res.records;
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
