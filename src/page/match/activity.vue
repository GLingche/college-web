<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增赛事活动' : '更新赛事活动'"
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
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="input-with-select"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="姓名" value="姓名"></el-option>
          <el-option label="事项" value="事项"></el-option>
          <el-option label="类型" value="类型"></el-option>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getList(select, input)"
        ></el-button>
      </el-input>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      :control="userType"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
      @authManager="ChangeMatchState"
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
  SeleteAll,
  UpdateById,
  DeleteById,
  ChangeMatchState,
  BuildMatch,
} from "../../api/test";
export default {
  name: "Activity",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      userType: "",
      input: "",
      select: "",
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "unit",
          label: "单位",
          type: "input",
        },
        {
          model: "unitAddress",
          label: "单位地址",
          type: "input",
        },
        {
          model: "id",
          label: "编号",
          type: "input",
        },
        {
          model: "type",
          label: "类型",
          type: "input",
        },
        {
          model: "items",
          label: "事项",
          type: "input",
        },
        {
          model: "matchTime",
          label: "起始时间",
          type: "date",
        },
        {
          model: "place",
          label: "地点",
          type: "input",
        },
        {
          model: "number",
          label: "编号",
          type: "input",
        },
        {
          model: "documentNumber",
          label: "证件号码",
          type: "input",
        },
        {
          model: "state",
          label: "状态",
          type: "input",
        },
      ],
      operateForm: {
        unit: "",
        id: "",
        unitAddress: "",
        type: "",
        items: "",
        matchTime: "",
        place: "",
        number: "",
        documentNumber: "",
        state: "",
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
          prop: "unit",
          label: "单位",
        },
        {
          prop: "unitAddress",
          label: "单位地址",
        },
        {
          prop: "id",
          label: "编号",
        },
        {
          prop: "type",
          label: "类型",
          width: 200,
        },
        {
          prop: "items",
          label: "事项",
          width: 320,
        },
        {
          prop: "matchTime",
          label: "起始时间",
          width: 320,
        },
        {
          prop: "place",
          label: "地点",
          width: 320,
        },
        {
          prop: "state",
          label: "状态",
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
        UpdateById(this.operateForm).then(() => {
          this.$message({
            type: "success",
            message: "成功改变",
          });
          this.isShow = false;
          this.getList(this.input, this.select);
        });
      } else {
        BuildMatch(this.operateForm).then(() => {
          this.$message({
            type: "success",
            message: "成功改变",
          });
          this.isShow = false;
          this.getList(this.input, this.select);
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        unit: "",
        id: "",
        unitAddress: "",
        type: "",
        items: "",
        matchTime: "",
        place: "",
        number: "",
        documentNumber: "",
        state: "",
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
        DeleteById({
          id: row.id,
        }).then(() => {
          this.$message({
            type: "success",
            message: "成功改变",
          });
          this.getList(this.input, this.select);
        });
      });
    },
    getList(type = "", input = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      console.log(this.config.page, "test");
      SeleteAll({
        page: this.config.page,
        size: this.config.total,
        token: "11fdafa",
        sponsors: input,
        type: type,
      }).then(({ data: res }) => {
        console.log(res, "thisacrivty");
        res.records.map((item) => {
          if (item.state == "Y") {
            item.state = 1;
          } else if (item.state == "N") {
            item.state = 0;
          }
          return item;
        });
        this.tableData = res.records;
        // this.config.total = res.count;
        this.config.loading = false;
      });
    },

    ChangeMatchState(row) {
      console.log(row, "this.row");
      ChangeMatchState({
        id: row.id,
      }).then(() => {
        this.$message({
          type: "success",
          message: "成功改变",
        });
        // this.getList(this.input, this.select);
      });
    },
    UpdateById(row) {
      UpdateById().then(() => {
        this.$message({
          type: "success",
          message: "成功改变",
        });
        this.getList(this.input, this.select);
      });
    },
    DeleteById(row) {
      DeleteById().then(() => {
        this.$message({
          type: "success",
          message: "成功改变",
        });
        this.getList(this.input, this.select);
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
    this.getList(this.input, this.select);
  },
  beforeMount() {
    getusertype().then(({ data: res }) => {
      if (res == "管理员") {
        this.userType = true;
      } else {
        this.userType = false;
      }
      console.log(this.userType, "toetype去1111");
    });
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
