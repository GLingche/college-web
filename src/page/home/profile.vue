<template>
  <div class="profile">
    <div class="header">
      <i class="el-icon-arrow-left"></i>
      <span class="btn" @click="$router.push({ path: '/home' })">返回</span>
      <span class="content">个人账号信息</span>
    </div>
    <el-card class="profile-card">
      <div slot="header">个人账号信息</div>
      <div class="title">
        <span>基本信息</span>
      </div>
      <div class="base-info">
        <div class="base-info-item">
          <div class="flex">
            <div class="key">头像：</div>
            <img class="user" src="../../assets/images/user.png" />
          </div>
        </div>
        <div class="base-info-item">
          <div class="flex">
            <div class="key">用户姓名：</div>
            <div class="value">
              {{ accountInfo.adminName || accountInfo.userName }}
            </div>
          </div>
          <el-button
            type="text"
            @click="openModifyDialog('修改姓名', 'adminName')"
            >修改</el-button
          >
        </div>
        <div class="base-info-item">
          <div class="flex">
            <div class="key">单位：</div>
            <div class="value">{{ accountInfo.unit }}</div>
          </div>
          <el-button
            type="text"
            @click="openModifyDialog('修改所属单位', 'unit')"
            >修改</el-button
          >
        </div>
        <div class="base-info-item">
          <div class="flex">
            <div class="key">手机号码：</div>
            <div class="value">{{ accountInfo.number }}</div>
          </div>
          <el-button
            type="text"
            @click="openModifyDialog('修改所属手机号码', 'number')"
            >修改</el-button
          >
        </div>
        <div class="base-info-item">
          <div class="flex">
            <div class="key">性别：</div>
            <div class="value">{{ accountInfo.sex }}</div>
          </div>
        </div>
        <div class="base-info-item">
          <div class="flex">
            <div class="key">编号：</div>
            <div class="value">{{ accountInfo.id }}</div>
          </div>
        </div>
        <div class="base-info-item">
          <div class="flex">
            <div class="key">籍贯：</div>
            <div class="value">{{ accountInfo.origin }}</div>
          </div>
        </div>
      </div>
      <div class="title">登录记录</div>
      <el-table class="table" :data="loginLog" height="342">
        <el-table-column
          label="登录账号"
          width="auto"
          prop="account"
        ></el-table-column>
        <el-table-column
          label="登录方式"
          width="auto"
          prop="how"
        ></el-table-column>
        <el-table-column
          label="登录IP"
          width="auto"
          prop="ip"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          width="auto"
          prop="time"
        ></el-table-column>
      </el-table>
    </el-card>
    <!-- 更改手机号码和密码的弹窗 -->
    <el-dialog
      :title="title"
      :visible.sync="showDialog"
      width="30%"
      class="change"
      :close-on-click-modal="false"
    >
      <div class="dialogContainer">
        <div class="info" v-for="(item, index) in userTenantList" :key="index">
          <!-- <div class="avatar">
                        <img :src="item.companyLogo" alt="" />
                    </div> -->
          <span class="name">{{ item.name }}</span>
        </div>
        <div class="inputPassword" v-if="changeType === false" key="password">
          <el-form
            label-position="top"
            label-width="50px"
            :model="password"
            :rules="pwrules"
            size="small"
            ref="passwordForm"
          >
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input v-model="password.oldPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword" required>
              <el-input
                v-model="password.newPassword"
                show-password
                placeholder="不低于8位的数字、字母组合"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="再次输入新密码"
              prop="newPasswordTwice"
              required
            >
              <el-input
                v-model="password.newPasswordTwice"
                show-password
                placeholder="不低于8位的数字、字母组合"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="inputPhone" v-else key="phone">
          <el-form
            label-position="top"
            label-width="50px"
            :model="phone"
            :rules="phrules"
            size="small"
            ref="phoneForm"
          >
            <el-form-item label="输入原登录手机号码" prop="oldPhone" required>
              <el-input v-model="phone.oldPhone"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="oldSmsCode">
              <el-input
                v-model="phone.oldSmsCode"
                style="width: 280px; margin-right: 15px"
              ></el-input>
              <el-button
                type="primary"
                @click="getOldSmsCode"
                :disabled="getOldCode"
                :plain="oldCode"
                style="width: 100px"
                >{{ oldCodeButton }}</el-button
              >
            </el-form-item>
            <el-form-item label="输入新登录手机号码" prop="newPhone" required>
              <el-input v-model="phone.newPhone"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="newSmsCode">
              <el-input
                v-model="phone.newSmsCode"
                style="width: 280px; margin-right: 15px"
              ></el-input>
              <el-button
                type="primary"
                @click="getNewSmsCode"
                :disabled="getNewCode"
                :plain="newCode"
                style="width: 100px"
                >{{ newCodeButton }}</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer">
        <div v-if="changeType === false" key="pwSure">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submitChange">确定</el-button>
        </div>
        <div v-else key="phSure">
          <el-button @click="cancel">取消</el-button>
          <el-button @click="changePassword">更改密码</el-button>
          <el-button type="primary" @click="submitChange">完成更改</el-button>
        </div>
      </span>
    </el-dialog>
    <!-- 操作结果 -->
    <el-dialog
      title="操作结果"
      :visible.sync="resultDialog"
      width="30%"
      class="resultDialog"
      :show-close="showClose"
    >
      <div class="result">
        <!-- <img src="../../../assets/res-success.png" alt="" v-if="result === true" />
                <img src="../../../assets/res-fail.png" alt="" v-else /> -->
        <div :class="result ? 'success' : 'fail'">{{ resultText }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pushTo">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改个人信息 -->
    <el-dialog
      :title="operationType.label"
      :visible.sync="modifyDialog"
      width="30%"
      :show-close="true"
    >
      <el-form :model="operationForm" :rules="operationRules">
        <el-form-item
          v-if="
            operationType.value == 'adminName' ||
            operationType.value == 'userName'
          "
          prop="adminName"
        >
          <el-input
            v-model="operationForm.adminName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="operationType.value == 'unit'" :prop="unit">
          <el-input
            v-model="operationForm.unit"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="operationType.value == 'number'" :prop="number">
          <el-input
            v-model="operationForm.number"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="dialog-btn">
            <el-button @click="closeModifyDialog">取消</el-button>
            <el-button
              type="primary"
              @click="onSubmitOperation(operationType.value)"
              >确定</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 更换头像dialog -->
    <el-dialog
      title="上传头像"
      :visible.sync="uploadDialog"
      width="50%"
      :show-close="true"
    >
      <upload
        ref="upload"
        width="350"
        accept=".png,.jpg"
        :autoUpload="false"
        :fixedUploadBtn="false"
        :limit="1"
        @fileUrl="uploadAvatar"
      ></upload>
      <div class="dialog-btn">
        <el-button @click="closeUploadDialog">取消</el-button>
        <el-button type="primary" @click="onUpload">上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  SeleteByAccountLog,
  SeleteByAccountLogin,
  UpdateByIdLog,
} from "../../api/test";
export default {
  components: {},
  created() {},
  watch: {},
  data() {
    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("密码不能为空"));
      } else if (!Regexp.isPassword(value)) {
        return callback(new Error("密码必须数字与字母混合且不低于8位！"));
      } else {
        callback();
      }
    };
    let validatePasswordTwice = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请再次输入新密码"));
      } else if (value !== this.password.newPassword) {
        return callback(new Error("两次输入密码不一致!"));
      } else if (!Regexp.isPassword(value)) {
        return callback(new Error("密码必须数字与字母混合且不低于8位！"));
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("手机号码不能为空"));
      } else if (!Regexp.isTelephoneValid(value)) {
        return callback(new Error("手机号码不合法！"));
      } else {
        return callback();
      }
    };
    return {
      accountInfo: "",
      loginLog: [],
      STATIC_URL: "sys/common/static/",
      identity: "",
      tenantInfo: "",
      userTenantList: [],
      pageTitle: "",

      // 更换操作 数据 begin
      title: "", //弹窗标题
      showDialog: false,
      changeType: false, // 修改类型，true为手机号码更换，false为密码更换
      // 更换操作 数据 end

      // 操作结果 数据 begin
      resultDialog: false, //操作结果弹窗
      resultText: "", //操作结果弹窗的显示文本
      result: false, //操作结果
      // 操作结果 数据 end

      // 验证码 数据 begin
      getOldCode: false,
      getNewCode: false,
      oldCode: false,
      newCode: false,
      oldCodeButton: "获取验证码",
      newCodeButton: "获取验证码",
      // 验证码 数据 end

      showClose: true, //操作结果弹窗的关闭图标

      // 更换密码 数据 begin
      // 更换密码表单数据对象
      password: {
        oldPassword: "",
        newPassword: "",
        newPasswordTwice: "",
      },
      // 更换密码表单验证规则
      pwrules: {
        oldPassword: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            validator: validatePassword,
            trigger: ["blur", "change"],
          },
        ],
        newPasswordTwice: [
          {
            validator: validatePasswordTwice,
            trigger: ["blur", "change"],
          },
        ],
      },
      // 更换密码 数据 end

      // 更换手机号码 数据 begin
      // 更换手机号码表单数据
      phone: {
        oldPhone: "",
        newPhone: "",
        oldSmsCode: "",
        newSmsCode: "",
      },
      // 更换手机号码表单验证规则
      phrules: {
        oldPhone: [{ validator: validatePhone, trigger: ["blur", "change"] }],
        newPhone: [{ validator: validatePhone, trigger: ["blur", "change"] }],
        oldSmsCode: {
          required: true,
          message: "验证码不能为空",
          trigger: ["blur", "change"],
        },
        newSmsCode: {
          required: true,
          message: "验证码不能为空",
          trigger: ["blur", "change"],
        },
      },
      // 更换手机号码 数据 end

      /**修改个人信息 */
      operationType: {
        label: "",
        value: "",
      },
      modifyDialog: false,
      uploadDialog: false,
      operationRules: {
        name: [
          {
            required: true,
            message: "请输入新的姓名",
            trigger: "blur",
          },
        ],
      },
      operationForm: {
        name: "",
        currentValue: "",
      },
      options: [],
      operationBtn: true, //dialog 提交按钮开关
      //部门列表
      departList: [],
      //岗位列表
      stationList: [
        {
          label: "普通员工",
          value: 1,
        },
        {
          label: "经理",
          value: 2,
        },
        {
          label: "主管",
          value: 3,
        },
        {
          label: "部长",
          value: 4,
        },
        {
          label: "组长",
          value: 5,
        },
        {
          label: "总监",
          value: 6,
        },
        {
          label: "管理层",
          value: 7,
        },
        {
          label: "高级管理层",
          value: 8,
        },
        {
          label: "总经理",
          value: 9,
        },
      ],
      //职务列表
      postList: [
        "行政",
        "客服",
        "设计",
        "研发",
        "财务",
        "人事",
        "IT",
        "市场",
        "运营",
        "产品",
        "采购",
        "销售",
        "其它",
      ],
      SEX: [
        {
          label: "男",
          value: 1,
        },
        {
          label: "女",
          value: 2,
        },
      ],
    };
  },
  methods: {
    onSubmitOperation(type) {
      console.log(this.operationForm, this.operationType.value, "1afatestests");
       UpdateByIdLog(this.operationForm).then((res) => {
          console.log(res, "111111111111111");
          this.getList();
        });
      this.modifyDialog = false;
    },
    getList() {
      SeleteByAccountLogin().then((res) => {
        console.log(res, "111111111111222111");
        this.loginLog = res.data.records;
      });
      SeleteByAccountLog().then((res) => {
        console.log(res, "111111111111111");
        this.accountInfo = res.data.records[0];
        this.operationForm = res.data.records[0];
      });
    },
    openModifyDialog(label, value) {
      this.operationType = { label, value };
      this.modifyDialog = true;
      switch (value) {
        case "adminName":
          this.operationForm.adminName = this.accountInfo.adminName;
          break;
        case "unit":
          this.operationForm.unit = this.accountInfo.unit;
          break;
        case "number":
          this.operationForm.number = this.accountInfo.number;
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.profile {
  position: relative;
  top: 0;
  bottom: 0;
  background-color: #f1f5f9;

  .header {
    background: #fff;
    margin-bottom: 20px;
    padding: 22px 30px 0;
    height: 66px;
    font-size: 16px;
    text-align: left;
    color: #25262b;
    filter: drop-shadow(0 3px 6px rgba(183, 191, 208, 0.3));

    .btn {
      margin-left: 14px;
      font-family: "PingFang SC Medium";
      font-weight: 500;
      cursor: pointer;
    }

    .btn::after {
      content: "";
      width: 1px;
      height: 22px;
      border: 0.5px solid #25262b;
      margin: 0px 20px;
    }

    .content {
      font-family: "PingFang SC Bold";
      font-weight: bold;
    }
  }

  .profile-card {
    position: relative;
    bottom: 20px;
    width: 62%;
    margin: 60px 19% 0 19%;

    .title {
      font-family: "PingFang SC Bold";
      font-weight: bold;
      font-size: 16px;
      text-align: left;
      color: #25262b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title:not(:first-child) {
      margin-top: 40px;
    }

    .el-button--text {
      color: #409eff !important;
      text-align: right;
    }

    .base-info {
      background-color: #f6f8fa;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 20px;

      .base-info-item {
        width: 33.33%;
        display: grid;
        padding: 5px 20px;
        grid-template-areas: "value action";
        font-family: "PingFang SC Medium";
        font-weight: 500;
        font-size: 14px;
        text-align: left;
        color: #25262b;

        .key,
        .value {
          padding: 12px 0;
        }

        .key {
          grid-area: value;
          opacity: 0.4;
        }

        .value {
          grid-area: value;
          opacity: 1;
        }

        el-button {
          grid-area: action;
        }
      }

      .base-info-item:last-child {
        padding: 0 20px !important;
      }
    }

    .table {
      margin-top: 20px;

      thead th {
        background-color: #f6f8fa !important;
        padding: 0 !important;
      }

      td {
        padding: 20px 0 !important;
      }
    }

    .doc-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .doc-list-item {
        width: 40%;
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        font-family: "PingFang SC Medium";
        font-weight: 500;
        font-size: 14px;
        color: #25262b;

        .doc-time {
          opacity: 0.4;
        }
      }
    }
  }

  .change {
    .dialogContainer {
      .info {
        border: 1.5px solid rgba(228, 228, 228, 0.5);
        border-radius: 5px;
        padding: 12px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        .avatar {
          display: inline-block;

          img {
            width: 48px;
            height: 48px;
            border-radius: 8px;
          }
        }

        .name {
          margin-left: 12px;
        }
      }
    }
  }

  .resultDialog {
    .result {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      img {
        width: 65px;
        height: 65px;
      }

      .success {
        margin-top: 30px;
        color: #409eff;
      }

      .fail {
        margin-top: 30px;
        color: #eb8c8f;
      }
    }
  }

  .dialog-btn {
    display: flex;
    flex-direction: row-reverse;
    gap: 10px;
  }
}

.user {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-left: 12px;
}
</style>
