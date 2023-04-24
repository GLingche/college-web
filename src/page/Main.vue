<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-asideVue></common-asideVue>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <common-tag></common-tag>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAsideVue from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonTag from "../components/CommonTag.vue";
export default {
  name: "Main",
  components: {
    CommonAsideVue,
    CommonHeader,
    CommonTag,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: rgba(10, 10, 10, 0.5);
}
.el-main {
  padding-top: 0;
}
</style>
