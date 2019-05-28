<template>
  <div id="app">
    <img class="bg_left" src="./assets/bg_left.png">
    <div class="month">{{month}}月</div>
    <div id="main" style="width: 1200px;height:700px;"></div>
    <div class="bg_right">
      <div class="top">
        <img class="avatar" :src="avatarList[0].portrait">
        <img class="avatar_top" src="./assets/avatar_top.png">
        <img class="avatar_footer" src="./assets/avatar_footer.png">
        <div class="avatar_footer number1">NO.1</div>
        <div class="title">{{avatarList[0].realname}}</div>
        <div class="disc">{{avatarList[0].departname}}</div>
      </div>
      <div class="left">
        <img class="avatar" :src="avatarList[1].portrait">
        <img class="avatar_top" src="./assets/avatar_top.png">
        <img class="avatar_footer" src="./assets/avatar_footer.png">
        <div class="avatar_footer number">NO.2</div>
        <div class="title">{{avatarList[1].realname}}</div>
        <div class="disc">{{avatarList[1].departname}}</div>
      </div>
      <div class="right1">
        <img class="avatar_right" :src="avatarList[2].portrait">
        <img class="avatar_top" src="./assets/avatar_top.png">
        <img class="avatar_footer" src="./assets/avatar_footer.png">
        <div class="avatar_footer number">NO.3</div>
        <div class="title">{{avatarList[2].realname}}</div>
        <div class="disc">{{avatarList[2].departname}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { setTimeout } from "timers";
const echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");

let dataList;
export default {
  name: "app",
  components: {},
  data() {
    return {
      month: "",
      avatarList: [
        {
          realname: "",
          departname: "",
          portrait: ""
        },
        {
          realname: "",
          departname: "",
          portrait: ""
        },
        {
          realname: "",
          departname: "",
          portrait: ""
        }
      ]
    };
  },
  methods: {
    getData() {
      let date = new Date();
      this.month = this.transMonth(date.getMonth());
      if (date.getDate() <= 20) {
        this.type = "做账";
      } else {
        this.type = "报税";
      }
      let Month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      return axios.get("/order/accounter/honorOfAccountantListOfNew", {
        params: {
          date: `${date.getFullYear()}${Month}`
        }
      });
    },
    handleData() {
      var myChart = echarts.init(document.getElementById("main"));
      let xAxis;
      this.getData().then(v => {
        dataList = v.data.data;
        this.avatarList = dataList.grList;
        if (dataList.grList) {
          this.avatarList.forEach((v, i) => {
            this.avatarList[i].portrait = `/api/assets/${v.portrait}`;
          });
        }
        this.xAxis = dataList.groupList.map(v => v.departname);
        this.noFinish = dataList.groupList.map(
          v => (v.notFinish / v.allCount) * v.personCount
        );
        this.todayFinish = dataList.groupList.map(
          v => (v.todayFinish / v.allCount) * v.personCount
        );
        this.finished = dataList.groupList.map(
          v => (v.finish / v.allCount) * v.personCount
        );

        myChart.setOption({
          title: {
            text: "报税进度展示",
            left: "460",
            top: "80",
            textStyle: {
              fontSize: 30
            }
          },
          tooltip: {},
          xAxis: {
            data: this.xAxis
          },
          legend: {
            data: ["本月未完", "今日完成", "本月完成"],
            bottom: "100",
            left: "-10",
            orient: "vertical"
          },
          yAxis: {
            show: false
          },
          series: [
            {
              name: "本月未完",
              type: "bar",
              stack: "报税",
              data: this.noFinish
            },
            {
              name: "今日完成",
              type: "bar",
              stack: "报税",
              data: this.todayFinish
            },
            {
              name: "本月完成",
              type: "bar",
              stack: "报税",
              data: this.finished
            }
          ]
        });
      });
    },
    transMonth(index) {
      const dic = [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二"
      ];
      return dic[index];
    }
  },
  mounted() {
    this.handleData();
    setInterval(() => {
      this.handleData();
    }, 180000);
  }
};
</script>

<style>
body {
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;
}
#app {
  font-size: 0;
  background: url("./assets/background.png");
  width: 100vw;
  height: 100vh;
  padding-top: 1px;
  overflow: hidden;
  position: relative;
}

.month {
  position: absolute;
  font-size: 30px;
  font-weight: 700;
  color: #ffffff;
  left: 400px;
  top: 130px;
}

.bg_left {
  position: absolute;
  top: 280px;
  left: 65px;
  height: 640px;
  width: 1200px;
}
.bg_right {
  position: absolute;
  top: 280px;
  right: 100px;
  height: 600px;
  width: 440px;
  background: url("./assets/bg_right.png") no-repeat;
  background-size: 400px 600px;
}
.top {
  position: relative;
}
.number1 {
  margin-left: 40px;
  font-size: 24px;
  color: #000;
}
.number {
  margin-left: 20px;
  font-size: 20px;
  color: #000;
}
.avatar {
  box-sizing: content-box;
  display: block;
  margin: 60px auto 0;
  padding-right: 10px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.left img,
.right img {
  width: 100px;
  height: 100px;
}
.avatar_top {
  position: absolute;
  top: -16px;
  height: 47px;
  width: 57px;
  left: 228px;
}

.avatar_footer {
  position: absolute;
  height: 33px;
  width: 130px;
  top: 124px;
  left: 148px;
}
.title {
  margin: 10px 10px 0 0;
  text-align: center;
  font-size: 20px;
  color: #000;
}
.disc {
  margin: 10px 10px 0 0;
  text-align: center;
  font-size: 20px;
  color: #000;
}
.left {
  position: relative;
}

.left .avatar {
  position: absolute;
  top: 8px;
  height: 92px;
  width: 92px;
  left: 59px;
}
.left .avatar_top {
  position: absolute;
  top: 50px;
  height: 40px;
  width: 47px;
  left: 109px;
}
.left .avatar_footer {
  position: absolute;
  height: 29px;
  width: 89px;
  top: 134px;
  left: 60px;
}
.right1 .avatar_top {
  position: absolute;
  top: -13px;
  height: 40px;
  width: 47px;
  left: 54px;
}
.right1 .avatar_footer {
  position: absolute;
  height: 27px;
  width: 87px;
  top: 75px;
  left: 2px;
}
.left .title {
  position: absolute;
  bottom: -187px;
  left: 62px;
  margin: 10px 10px 0 0;
  text-align: center;
  font-size: 20px;
  color: #000;
}
.left .disc {
  position: absolute;
  bottom: -220px;
  left: 58px;
  margin: 10px 10px 0 0;
  text-align: center;
  font-size: 20px;
  color: #000;
}
.right1 .title {
}
.right1 .disc {
}
.right1 {
  position: absolute;
  right: 79px;
  bottom: 97px;
}
.avatar_right {
  display: block;
  /* margin: 60px auto 0; */
  /* padding-right: 20px; */
  width: 89px;
  height: 89px;
  border-radius: 50%;
}
#main {
  position: relative;
  z-index: 100;
  margin-top: 240px;
  margin-left: 100px;
}
</style>
