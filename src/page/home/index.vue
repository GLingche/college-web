<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="usrinfo">
            <p class="name">{{ UserName }}</p>
            <p class="access">{{ UserType }}</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            上次登录的时间:<span>{{ loginTime }}</span>
          </p>
          <p>上次登录的地点:<span>广州</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top: 20px" :span="16">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- echars图表  -->
      <el-card style="height: 280px">
        <!-- <div style="height:280px" ref="echarts"></div> -->
        <echart :chartData="echartData.order" style="height: 280px" />
      </el-card>
      <div class="graph">
        <!-- 柱状图  -->
        <el-card style="height: 260px">
          <!-- <div style="height:240px" ref="userEcharts"></div> -->
          <echart :chartData="echartData.user" style="height: 240px" />
        </el-card>
        <!-- 饼图 -->
        <el-card style="height: 260px">
          <!-- <div style="height:240px" ref="videoEcharts"></div> -->
          <echart
            :chartData="echartData.video"
            :isAxisChart="false"
            style="height: 240px"
          />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/data";
// import * as echarts from 'echarts'
import Echart from "../../components/ECharts.vue";
import {
  indentify,
  refresh,
  getusertype,
  SeleteByAccountLogin,
} from "../../api/test";
export default {
  name: "home",
  components: {
    Echart,
  },
  data() {
    return {
      UserName: "",
      UserType: "",
      loginTime: "",
      userImg: require("../../assets/images/user.png"),
      tableData: [
        {
          name: "微信小程序大赛",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "ACM大赛",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "蓝桥杯",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "羽毛球比赛",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "网络安全知识竞赛",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "大学生创新创业大赛",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      tableLabel: {
        name: "赛事",
        todayBuy: "今日赛事",
        monthBuy: "本月赛事",
        totalBuy: "总赛事",
      },
      countData: [
        {
          name: "今日赛事",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏赛事",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日收藏赛事",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "今日赛事",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏赛事",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日赛事",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  created() {
    getusertype().then(({ data: res }) => {
      this.UserType = res;
      console.log(res, "toetype");
    });
    SeleteByAccountLogin().then((res) => {
      this.UserName = res.data.records[0].account;

      this.loginTime = res.data.records[0].time;
      console.log(res, "111111111111222111");
      // this.loginLog = res.data.records;
    });
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        // const option = {
        //     xAxis: {
        //        data : xData
        //     },
        //     yAxis:{},
        //     legend:{
        //         data: keyArray
        //     },
        //     series
        // }
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;
        //  const e = echarts.init(this.$refs.echarts)
        //  e.setOption(option)

        //用户柱状图
        //  const userOption = {
        //         legend: {
        //             // 图例文字颜色
        //             textStyle: {
        //             color: "#333",
        //             },
        //         },
        //         grid: {
        //             left: "20%",
        //         },
        //         // 提示框
        //         tooltip: {
        //             trigger: "axis",
        //         },
        //         xAxis: {
        //             type: "category", // 类目轴
        //             data: data.userData.map(item =>item.date),
        //             axisLine: {
        //             lineStyle: {
        //                 color: "#17b3a3",
        //             },
        //             },
        //             axisLabel: {
        //             interval: 0,
        //             color: "#333",
        //             },
        //         },
        //         yAxis: [
        //             {
        //             type: "value",
        //             axisLine: {
        //                 lineStyle: {
        //                 color: "#17b3a3",
        //                 },
        //             },
        //             },
        //         ],
        //         color: ["#2ec7c9", "#b6a2de"],
        //         series: [
        //             {
        //                 name:'新增用户',
        //                 data:data.userData.map(item =>item.new),
        //                 type:'bar'
        //             },
        //               {
        //                 name:'活跃用户',
        //                 data:data.userData.map(item =>item.active),
        //                 type:'bar'
        //             },
        //         ],
        //     }
        this.echartData.user.xData = data.userData.map((item) => item.date);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];

        //   const u = echarts.init(this.$refs.userEcharts)
        //   u.setOption(userOption)

        //饼图
        // const  videoOption = {
        //         tooltip: {
        //             trigger: "item",
        //         },
        //         color: [
        //             "#0f78f4",
        //             "#dd536b",
        //             "#9462e5",
        //             "#a6a6a6",
        //             "#e1bb22",
        //             "#39c362",
        //             "#3ed1cf",
        //         ],
        //         series: [
        //             {
        //                 data : data.videoData,
        //                 type:'pie'
        //             }
        //         ],
        //     }
        //      const v = echarts.init(this.$refs.videoEcharts)
        //      v.setOption(videoOption)

        this.echartData.video.series = [
          {
            data: data.videoData,
            type: "pie",
          },
        ];
      }
      console.log(res);
    });
  },
};
</script>

<style></style>
