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
    <div class="manger-header">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="姓名" value="姓名"></el-option>
          <el-option label="单位" value="单位"></el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getList(select, input)"
        ></el-button>
      </el-input>
      <!-- <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </common-form> -->
    </div>
    <common-table
      :control="false"
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
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
  selectAds,
  updateAds,
  AupdateAds,
  AcreateAds,
  createAds,
  DeleteAll,
  UserUpdateById2,
  SelectAdmin2,
} from "../../api/test";
export default {
  name: "User",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      input: "",
      select: "",
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "userType",
          label: "用户类型",
          type: "input",
        },

        {
          model: "account",
          label: "账号",
          type: "input",
        },
        {
          model: "adminName",
          label: "姓名",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "unit",
          label: "单位",
          type: "input",
        },
        {
          model: "address",
          label: "地址",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "number",
          label: "手机号码",
          type: "input",
        },
        {
          model: "origin",
          label: "籍贯",
          type: "input",
        },
        {
          model: "id",
          label: "id",
          type: "input",
        },
      ],
      operateForm: {
        userType: "",
        account: "",
        adminName: "",
        sex: "",
        id: "",
        unit: "",
        address: "",
        age: "",
        number: "",
        origin: "",
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
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sex",
          label: "性别",
        },
        {
          prop: "birthday",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "maddress",
          label: "地址",
          width: 320,
        },
        {
          prop: "origin",
          label: "籍贯",
        },
        {
          prop: "unit",
          label: "单位",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 15,
      },
    };
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        UserUpdateById2(this.operateForm).then((res) => {
          this.getList(this.select, this.input);
          this.$message({
            type: "success",
            message: "成功",
          });
          this.isShow = false;
          console.log(res, "dfffffffffffff22222222222");
          console.log(JSON.stringify(res.data.records), "dsfds");
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
        usertype: "",
        account: "",
        userName: "",
        sex: "",
        id: "",
        unit: "",
        address: "",
        age: "",
        number: "",
        origin: "",
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
        const id = row.id;
        console.log(row, "this");
        DeleteAll({
          id: row.id,
          userType: row.userType,
        }).then((res) => {
          this.getList(this.select, this.input);
          this.$message({
            type: "success",
            message: "成功",
          });
          console.log(res, "dfffffffffffff22222222222");
          console.log(JSON.stringify(res.data.records), "dsfds");
        });
      });
    },
    getList(type, input = "") {
      this.config.loading = true;
      console.log(this.config.page, "test");
      SelectAdmin2({
        page: this.config.page,
        size: this.config.total,
        token: "11fdafa",
        sponsors: input,
        type: type,
      }).then(({ data: res }) => {
        this.tableData = res.records;
        // this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    this.getList(this.select, this.input);
    // UserUpdateById(this.operateForm).then((res) => {
    //   this.getList();
    //   this.$message({
    //     type: "success",
    //     message: "成功",
    //   });
    //   this.isShow = false;
    //   console.log(res, "dfffffffffffff22222222222");
    //   console.log(JSON.stringify(res.data.records), "dsfds");
    // });
  },
};
</script>

<style lang="less" scoped>
.manger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-input-group {
  width: 50%;
}
::v-deep .el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
