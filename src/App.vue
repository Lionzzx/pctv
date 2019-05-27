<template>
  <div id="app">
    <img
      class="bg_left"
      src="./assets/bg_left.png"
    >
    <div
      id="main"
      style="width: 1200px;height:700px;"
    ></div>
    <div class="bg_right">
      <div class="top">
        <img
          class="avatar"
          src="./assets/bg_left.png"
        />
        <img
          class="avatar_top"
          src="./assets/avatar_top.png"
        />
        <img
          class="avatar_footer"
          src="./assets/avatar_footer.png"
        />
        <div class="avatar_footer number1">NO.1</div>
        <div class="title">{{avatarList[0].realname}}</div>
        <div class="disc">{{avatarList[0].departname}}</div>
      </div>
      <div class="left">
        <img
          class="avatar"
          src="./assets/bg_left.png"
        />
        <img
          class="avatar_top"
          src="./assets/avatar_top.png"
        />
        <img
          class="avatar_footer"
          src="./assets/avatar_footer.png"
        />
        <div class="avatar_footer number">NO.2</div>
        <div class="title">{{avatarList[0].realname}}</div>
        <div class="disc">{{avatarList[0].departname}}</div>
      </div>
      <div class="right1">
        <img
          class="avatar_right"
          src="./assets/bg_left.png"
        />
        <img
          class="avatar_top"
          src="./assets/avatar_top.png"
        />
        <img
          class="avatar_footer"
          src="./assets/avatar_footer.png"
        />
        <div class="avatar_footer number">NO.3</div>
        <div class="title">{{avatarList[0].realname}}</div>
        <div class="disc">{{avatarList[0].departname}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend')

let dataList;
export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      avatarList: [{
        realname: '',
        departname: ''
      }]
    }
  },
  methods: {
    getData() {
      let date = new Date();
      let Month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      return axios.post('http://localhost:3000/getList', {
        date: `${date.getFullYear()}${Month}`
      })
    }
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main'));
    let xAxis;
    this.getData().then(v => {
      dataList = v.data.data;
      this.avatarList = dataList.grList
      console.log(this.avatarList)
      console.log(dataList)
      this.xAxis = dataList.groupList.map(v => v.departname)
      myChart.setOption({
        title: {
          text: '报税进度展示',
          left: '460',
          top: '80',
          textStyle: {
            fontSize: 30
          }
        },
        tooltip: {},
        xAxis: {
          data: this.xAxis
        },
        legend: {
          data: ['本月未完', '今日完成', '本月完成'],
          bottom: '100',
          left: '-10',
          orient: 'vertical'
        },
        yAxis: {
          show: false
        },
        series: [{
          name: "本月未完",
          type: 'bar',
          stack: '报税',
          data: [120, 132, 101, 134]
        },
        {
          name: "今日完成",
          type: 'bar',
          stack: '报税',
          data: [120, 132, 101, 134]
        }, {
          name: "本月完成",
          type: 'bar',
          stack: '报税',
          data: [120, 132, 101, 134]
        }]
      });
    })
  }
}
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
  display: block;
  margin: 60px auto 0;
  padding-right: 20px;
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
