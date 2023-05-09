<template>
  <header>
    <div class="l-content">
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- <h3 style="color:#fff">首页</h3> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <span style="margin-right: 36px; cursor: pointer">
        <el-button
          type="primary"
          size="small"
          style=""
          @click="isShow = !isShow"
          >实名认证</el-button
        >
        <el-badge :value="messCount">
          <i
            class="el-icon-bell"
            style="font-size: 32px; margin-left: 12px"
            @click="$router.push({ path: '/home/notify' })"
          >
          </i>
        </el-badge>
      </span>
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog title="实名认证" :visible.sync="isShow">
        <common-form
          :formLabel="operateFormLabel"
          :form="operateForm"
          :inline="true"
          ref="form"
        >
        </common-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="confirm">提交申请</el-button>
        </div>
      </el-dialog>
    </div>
  </header>
</template>

<script>
import CommonForm from "./CommonForm.vue";
import { mapState } from "vuex";
export default {
  name: "CommonHeader",
  components: {
    CommonForm,
  },
  data() {
    return {
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
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
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
          {
          model: "type",
          label: "账号类型",
          type: "input",
        },
          {
          model: "identity",
          label: "身份证号",
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
      messCount: 9,
      userImg: require("../assets/images/user.png"),
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    logOut() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333333;
}
</style>
