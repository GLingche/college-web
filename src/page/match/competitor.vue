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
          <el-option label="姓名" value="1"></el-option>
          <el-option label="事项" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
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
import { SelectPlayer, Update2ById, Delete2ById } from "../../api/test";
export default {
  name: "Competitor",
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
          model: "id",
          label: "id",
          type: "input",
        },
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "school",
          label: "学校",
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
          model: "time",
          label: "起始时间",
          type: "date",
        },
        {
          model: "position",
          label: "名次",
          type: "input",
        },
        {
          model: "status",
          label: "状态",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value:"男",
            },
            {
              label: "女",
              value: "女",
            },
          ],
        },
        {
          model: "address",
          label: "地点",
          type: "input",
        },
      ],
      operateForm: {
        id: "",
        name: "",
        sex: "",
        school: "",
        type: "",
        items: "",
        time: "",
        address: "",
        position: "",
        status: "",
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
          prop: "name",
          label: "姓名",
        },
        {
          prop: "sex",
          label: "性别",
        },
        {
          prop: "id",
          label: "编号",
        },
        {
          prop: "school",
          label: "学校",
          width: 200,
        },
        {
          prop: "items",
          label: "事项",
          width: 320,
        },
              {
          prop: "type",
          label: "类型",
          width: 320,
        },
        {
          prop: "time",
          label: "起始时间",
          width: 320,
        },
        {
          prop: "address",
          label: "地点",
          width: 320,
        },
        {
          prop: "position",
          label: "名次",
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
        Update2ById(this.operateForm).then((res) => {
          this.getList();
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
        id: "",
        name: "",
        sex: "",
        school: "",
        type: "",
        items: "",
        time: "",
        address: "",
        position: "",
        status: "",
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
        Delete2ById({
          id: row.id,
        }).then((res) => {
          this.getList();
          this.$message({
            type: "success",
            message: "成功",
          });
          console.log(res, "dfffffffffffff22222222222");
          console.log(JSON.stringify(res.data.records), "dsfds");
        });
      });
    },
    getList(type = "", input = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      console.log(this.config.page, "test");
      SelectPlayer({
        page: this.config.page,
        size: this.config.total,
        token: "11fdafa",
        sponsors: input,
        type: type,
      }).then(({ data: res }) => {
        this.tableData = res.records;
        console.log(this.tableData,"1111111111111111")
        // this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    this.getList(this.select,this.input);
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
