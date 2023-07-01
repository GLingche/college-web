<template>
  <div class="notify h-full">
    <div class="header">
      <i class="el-icon-arrow-left"></i>
      <span class="btn" @click="goBack">返回</span>
      <span class="content">消息通知</span>
    </div>
    <el-card class="msg-card">
      <div slot="header">消息通知</div>
      <div class="msg-type">
        <el-button
          type="primary"
          id="platform"
          @click="onTypeChange('platform')"
          >通知公告</el-button
        >
        <el-button type="" id="warring" @click="onTypeChange('approval')"
          >审批</el-button
        >
      </div>
      <div class="msg-ctrl">
        <el-checkbox v-model="checkAll">全选</el-checkbox>
        <div>
          <el-button
            :disabled="!btnActive"
            type="primary"
            v-if="msgType == 'approval'"
            @click="onApproval(undefined, true, true)"
            >同意</el-button
          >
          <el-button
            :disabled="!btnActive"
            v-if="msgType == 'approval'"
            @click="onApproval(undefined, false, true)"
            >拒绝</el-button
          >
          <el-button @click="delMsg(msgType)">删除</el-button>
          <el-button
            v-if="msgType != 'approval'"
            type="primary"
            @click="readAll"
            >全部已读</el-button
          >
        </div>
      </div>
      <!-- 消息 -->
      <div class="msg-content" v-if="msgType != 'approval'">
        <div class="msg-item" v-for="item in msgList" :key="item.id">
          <div class="msg-title">
            <el-checkbox
              v-model="item.selected"
              @change="onValueChange(item.id, item.selected)"
            ></el-checkbox>
            <!-- <div class="msg-tip-icon" v-show="!item.isRead"></div> -->
            <span>{{ item.message }}</span>
          </div>
          <div class="item-content" @click="readMsg(item)">
            <span v-html="item.context" style="padding-left: 34px"></span>
            <span>{{ item.time }}</span>
          </div>
        </div>
      </div>
      <!-- 审核 -->
      <div class="msg-content" v-if="msgType == 'approval'">
        <div class="msg-item" v-for="item in examineList" :key="item.id">
          <div class="msg-title">
            <el-checkbox
              v-model="item.selected"
              @change="onValueChange(item.id, item.selected)"
            ></el-checkbox>
            <!-- <div class="msg-tip-icon" v-show="!item.isChecked"></div> -->
            <span>{{ item.message }}</span>
          </div>
          <div class="item-content" @click="readMsg(item)">
            <span v-html="item.time"></span>
          </div>
          <span class="msg-item-btn">
            <el-button type="text" @click="onApproval(item.id, true, false)"
              >同意</el-button
            >
            <el-button type="text" @click="onApproval(item.id, false, false)"
              >拒绝</el-button
            >
          </span>
        </div>
      </div>
      <div class="pagin flex-end">
        <Pagin
          :total="pageConfig.total"
          :pageSize="pageConfig.size"
          :currentPage="pageConfig.index"
          :handleSizeChange="onSizeChange"
          :handleCurrentChange="onIndexChange"
        >
        </Pagin>
      </div>
    </el-card>
    <!-- 消息细节 -->
    <el-dialog
      :visible.sync="detialDialog"
      title="查看消息"
      @close="dialogClose"
    >
      <div class="detial-container">
        <div class="detial-title">{{ detialData.title }}</div>
        <div class="detial-time">平台运营组发布于{{ detialData.sendTime }}</div>
        <div class="detial-context" v-html="detialData.context"></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagin from "../../components/pagination.vue"; //分页组件
import {
  SelectAdminNotice,
  SelectUserNotice,
  ChangeUserState,
  SelectByAccount,
  SeleteByUserType,
  ChangeMatchState,
} from "../../api/test";
export default {
  components: { Pagin },
  created() {
    // this.countNoRead();
    // this.loadData();
  },
  watch: {},
  data() {
    return {
      msgType: "platform",
      noRead: 0,
      msgList: [],
      examineList: [],
      temp: [],
      selectedItem: [],
      checkAll: false,
      pageConfig: {
        total: 0,
        index: 1,
        size: 50,
      },
      btnActive: false,

      detialDialog: false,
      detialData: {},
    };
  },
  methods: {
    onTypeChange(type) {
      console.log(type, "1111111111111111111");
      const btnGroup = this.$el.querySelector(".msg-type").children;
      console.log(btnGroup, "1111111111111111111");
      const btns = [...btnGroup];
      console.log(btns, "1111111111111111111");
      const className = "el-button--primary";
      btns.forEach((e) => {
        if (e.id == type) {
          e.classList.add(className);
        } else {
          e.classList.remove(className);
        }
      });
      console.log(type, "11111111111111111114324");
      this.msgType = type;
    },
    SelectAdminNotice() {
      SelectAdminNotice({
        page: this.pageConfig.index,
      }).then((res) => {
        console.log(res);
        this.msgList = res.data;
      });
    },
    goBack() {
      this.$router.push({ path: "/home" });
    },
    onApproval(id) {
      ChangeUserState(id)
        .then((res) => {
          this.$message({
            type: "success",
            message: "成功改变改审核状态",
          });
          console.log(res, "thisqqqqqqqqqqqqqqqqqqqq");
          this.getList();
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "修改状态异常",
          });
        });
    },

    getList() {
      SelectByAccount({
        page: this.pageConfig.index,
        size: this.pageConfig.size,
      }).then((res) => {
        console.log(res);
        this.msgList = res.data.records;
      });
      SelectAdminNotice({
        page: this.pageConfig.index,
        size: this.pageConfig.size,
      }).then((res) => {
        console.log(res, "111111111111111");
        this.examineList = res.data.records;
      });
    },
  },
  created() {
    this.getList();
    // ChangeMatchState().then((res) => {
    //       console.log(res);
    //       this.msgList = res.data;
    //     });
    // SelectByAccount().then((res) => {
    //   console.log(res);
    //   this.msgList = res.data;
    // });
    // ChangeUserState().then((res) => {
    //   console.log(res,"thisqqqqqqqqqqqqqqqqqqqq");
    // });
  },
};
</script>
<style lang="scss">
li {
  list-style: none;
}

.notify {
  position: relative;
  top: 0;
  bottom: 0;
  background-color: #f1f5f9;
  .header {
    margin-bottom: 20px;
    padding: 22px 30px 0;
    height: 66px;
    background: #fff;
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
  .msg-card {
    position: relative;
    top: 20px;
    bottom: 20px;
    width: 62%;
    margin: 20px 19%;
    .msg-ctrl {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
    .msg-content {
      max-height: 58vh;
      overflow: scroll;
      .msg-item {
        position: relative;
        height: 67px;
        border-bottom: 1px solid #e9e9e9;
        font-family: ".PingFang SC Light";
        font-weight: 300;
        font-size: 14px;
        text-align: left;
        color: #25262b;
        padding: 20px 0;
        .msg-title {
          position: relative;
          .msg-tip-icon {
            position: absolute;
            display: inline;
            top: 6px;
            left: 24px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #f56760;
            z-index: 99;
          }
        }
        span {
          margin-right: 10px;
        }
        .item-content {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        .msg-item-btn {
          position: absolute;
          right: 0;
          top: 20px;
          span {
            color: #409eff;
          }
        }
      }
    }
    .pagin {
      display: flex;
      flex-direction: row-reverse;
      margin-top: 40px;
    }
  }
  .detial-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "PingFang SC Medium";
    font-weight: 500;
    color: #27292b;
    .detial-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .detial-time {
      margin-bottom: 20px;
    }
    .detial-context {
      display: flex;
      width: 100%;
      padding: 0 8px;
    }
  }
}
</style>
