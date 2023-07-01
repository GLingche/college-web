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
          <el-dropdown-item
            @click.native="$router.push({ path: '/home/profile' })"
            >个人信息</el-dropdown-item
          >
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
import { indentify, refresh, getusertype,SeleteByAccountLogin } from "../api/test";
export default {
  name: "CommonHeader",
  components: {
    CommonForm,
  },
  data() {
    return {
      isShow: false,
      UserName:'',
      UserType:'',
      loginTime:'',
      operateFormLabel: [
        {
          model: "UserName",
          label: "姓名",
          type: "input",
        },

        {
          model: "Nation",
          label: "民族",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "Unit",
          label: "单位",
          type: "input",
        },
        {
          model: "Origin",
          label: "籍贯",
          type: "input",
        },
        {
          model: "Number",
          label: "手机号",
          type: "input",
        },
        {
          model: "Sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: "男",
            },
            {
              label: "女",
              value: "女",
            },
          ],
        },
        {
          model: "birthday",
          label: "出生日期",
          type: "date",
        },
        {
          model: "MAddress",
          label: "地址",
          type: "input",
        },
        {
          model: "UserType",
          label: "账号类型",
          type: "select",
          opts: [
            {
              label: "赞助商",
              value: "赞助商",
            },
            {
              label: "主办方",
              value: "主办方",
            },
          ],
        },
        {
          model: "DocumentType",
          label: "证件类型",
          type: "select",
          opts: [
            {
              label: "中国大陆居民身份证",
              value: "中国大陆居民身份证",
            },
            {
              label: "港澳台特别行政区",
              value: "港澳台特别行政区",
            },
          ],
        },
        {
          model: "DocumentNumber",
          label: "证件号",
          type: "input",
        },
      ],
      operateForm: {
        UserName: "",
        Sex: "",
        Nation: "",
        birthday: "",
        DocumentType: "",
        DocumentNumber: "",
        Number: "",
        Unit: "",
        Origin: "",
        MAddress: "",
        UserType: "",
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
    confirm() {
      console.log(11111111111);
      indentify(this.operateForm)
        .then(({ data: res }) => {
          console.log(res, "1111111111111111111111111");
          this.$message({
            type: "success",
            message: "发送成功",
          });
          this.isShow = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },

  created() {
    getusertype().then(({ data: res }) => {
      this.UserType = res
      console.log(res, "toetype");
    });
    // refresh().then(({ data: res }) => {
    //   console.log(res, "111111111111111111111");
    //   if (res == 3000) {
    //     return;
    //   }
    //   if (res.data.menu) {
    //     console.log(res,"22222222222222222222")
    //     this.$store.commit("setMenu", res.data.menu);
    //     this.$store.commit("setToken", res.data.token);
    //     // this.$store.commit("addMenu", this.$router);
    //   }
    // });
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
