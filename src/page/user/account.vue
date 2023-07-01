<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
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
    <common-table
      :control="false"
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @del="delUser"
      @authManager="authManager"
      @cancal="cancal"
      @cancal2="cancal2"
      :isEdit="false"
    ></common-table>
    <el-dialog
      :visible.sync="managerDialog"
      title="设置企业管理员"
      :close-on-click-modal="false"
      width="548px"
    >
      <el-card class="box-card">
        <div
          v-for="(val, key) in managerVO"
          :key="key"
          class="text item flex items-center justify-between"
          style="margin: 20px auto"
        >
          <span style="color: #a9aeb8"> {{ val.label }}: </span>
          <span>{{ val.value }}</span>
        </div>
      </el-card>
      <div class="flex py-5 justify-end space-x-4">
        <el-button @click="managerDialog = false">我再想想</el-button>
        <el-button type="primary" @click="handleManager">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { getUser } from "../../api/data";
import {
  getUserInfo,
  SelectUser,
  SelectAdmin,
  cancels,
  Usercancels,
  Enable,
  selePMess,
  changePMess,
  delePMess,
  DeleteAll,
  SPUpUserType,
} from "../../api/test";
export default {
  name: "Account",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      userType: "",
      operateType: "add",
      isShow: false,
      managerDialog: false,
      managerVO: {
        id: {
          label: "id",
          value: "",
        },
        tenantName: {
          label: "姓名",
          value: "",
        },
        managerNameOld: {
          label: "账号",
          value: "",
        },
        managerPhoneOld: {
          label: "原账号类型",
          value: "",
        },
        managerNameNew: {
          label: "新账号类型",
          value: "管理员",
        },
      },
      operateFormLabel: [
        {
          model: "adminName",
          label: "管理员姓名",
          type: "input",
        },
        {
          model: "userName",
          label: "用户姓名",
          type: "input",
        },
        {
          model: "state",
          label: "状态",
          type: "select",
          opts: [
            {
              label: "启用",
              value: 1,
            },
            {
              label: "申请中",
              value: 0,
            },
            {
              label: "已注销",
              value: 2,
            },
          ],
        },
        {
          model: "account",
          label: "账号",
          type: "input",
        },
        {
          model: "userType",
          label: "类型",
          type: "input",
        },
        {
          model: "number",
          label: "手机号",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
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
          prop: "adminName",
          label: "管理员姓名",
        },
        {
          prop: "userName",
          label: "用户姓名",
        },
        {
          prop: "account",
          label: "账号",
        },
        {
          prop: "state",
          label: "状态",
        },
        {
          prop: "userType",
          label: "类型",
          width: 200,
        },
        {
          prop: "number",
          label: "手机号",
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
    //授权管理员
    handleManager() {
      SPUpUserType({
        id: this.managerVO.id.value,
        userType: this.managerVO.managerNameNew.value,
      }).then((res) => {
        this.$message({
          type: "success",
          message: "成功",
        });
        this.managerDialog = false;
        this.getList();
        console.log(res, "dfffffffffffff22222222222");
        // console.log(JSON.stringify(res.data.records), "dsfds");
      });
    },
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
        });
      } else {
        this.$http.post("/user/add", this.operateForm).then((res) => {
          console.log(res);
          this.isShow = false;
          this.getList();
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
        console.log(row, "this");
        DeleteAll({
          id: row.id,
          userType: row.userType,
        }).then((res) => {
          this.getList();
          this.$message({
            type: "success",
            message: "成功删除",
          });
          console.log(res, "dfffffffffffff22222222222");
          // console.log(JSON.stringify(res.data.records), "dsfds");
        });
      });
    },
    async getList(name = "") {
      let adminList = await this.SelectAdmin(name);
      let userList = await this.SelectUser(name);

      this.$nextTick(() => {
        this.tableData = [...adminList, ...userList];
        console.log(this.tableData, "this.tableData");
      });
    },
    getUserInfo(name) {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      return getUserInfo({
        page: this.config.page,
      }).then((res) => {
        console.log(res, "dsfds");
      });
    },
    authManager(row) {
      console.log(row);
      this.managerVO.id.value = row.id;

      this.managerVO.managerPhoneOld.value = row.userType;
      this.managerVO.tenantName.value = row.userName
        ? row.userName
        : row.adminName;
      this.managerVO.managerNameOld.value = row.account;
      this.managerDialog = !this.managerDialog;
    },
    cancal(row) {
      this.$confirm("此操作将注销该账号，是否继续?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(row, "this");
        cancels({
          ID: row.id,
          UserType: row.userType,
        }).then((res) => {
          this.$message({
            type: "success",
            message: "成功",
          });
          this.getList();
          console.log(res, "dfffffffffffff22222222222");
          // console.log(JSON.stringify(res.data.records), "dsfds");
        });
      });
    },
    cancal2(row) {
      this.$confirm("此操作将启用该账号，是否继续?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(row, "this");
        Enable({
          ID: row.id,
          UserType: row.userType,
        }).then((res) => {
          this.$message({
            type: "success",
            message: "成功",
          });
          this.getList();
          console.log(res, "dfffffffffffff22222222222");
          // console.log(JSON.stringify(res.data.records), "dsfds");
        });
      });
    },

    SelectUser(name) {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      return SelectUser({
        page: this.config.page,
      }).then((res) => {
        console.log(JSON.stringify(res.data.records), "dsfds");
        return res.data.records;
      });
    },

    SelectAdmin(name) {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      return SelectAdmin({
        page: this.config.page,
      }).then((res) => {
        console.log(res);
        console.log(JSON.stringify(res.data.records), "dsfds");

        return res.data.records;
      });
    },
  },

  async created() {
    this.getList();
    getusertype().then(({ data: res }) => {
      this.userType = res.data;
      console.log(res.data, "toetype");
    });
    // this.handleManager();
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
