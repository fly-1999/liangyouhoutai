<template>
  <div class="weather">
    <div class="weather-header">
      <div class="weather-header-title">未来七日的环境监测</div>
      <Button to="/home" type="primary" ghost :class="'weather-header-button'">返回</Button>
    </div>
    <div class="weather-content">
      <div class="weather-content-now">
        <div class="weather-content-now-absolute-day">周{{weatherData.weatherNow.day}}</div>
        <img :src="require(`@/assets/images/main/weather/${weatherData.weatherNow.icon || 999}.png`)" alt="" class="weather-content-now-img">
        <p class="weather-content-now-place">{{place}}</p>
        <div class="weather-content-now-date">
          <div class="weather-content-now-date-alldate">
            <p class="weather-content-now-date-title">日期</p>
            <p class="weather-content-now-date-value">{{weatherData.weatherNow.time}}</p>
          </div>
          <div class="weather-content-now-date-day">
            <p class="weather-content-now-date-title">周期</p>
            <p class="weather-content-now-date-value">星期{{weatherData.weatherNow.day}}</p>
          </div>
          <div class="weather-content-now-date-speed">
            <p class="weather-content-now-date-title">风速</p>
            <p class="weather-content-now-date-value">{{weatherData.weatherNow.windScale}}</p>
          </div>
        </div>
      </div>
      <div class="weather-content-other">
        <div class="weather-content-7d">
          <div class="weather-content-7d-item" v-for="(item, index) in weatherData6d" :key="index">
            <div class="weather-content-7d-item-header">
              <div class="weather-content-7d-item-header-light" :class="`weather-content-7d-item-header-light-${item.lightIndex}`"></div>
              <div class="weather-content-7d-item-header-title">周{{item.day}}</div>
            </div>
            <div class="weather-content-7d-item-content">
              <div class="weather-content-7d-item-content-place">{{place}}</div>
              <div class="weather-content-7d-item-content-temp">{{item.tempMax}}℃</div>
            </div>
          </div>
        </div>
        <div class="weather-content-data">
          <div class="weather-content-table">
            <div class="weather-content-table-header">
              <div class="weather-content-table-header-light"></div>
              <div class="weather-content-table-header-title">天气表</div>
            </div>
            <Table class="weather-content-table-context" disabled-hover :columns="weatherTable.columns" :data="weatherTable.data"></Table>
          </div>
          <div class="weather-content-7d-chart">
            <div class="weather-content-7d-chart-header">
              <div class="weather-content-7d-chart-header-light"></div>
              <div class="weather-content-7d-chart-header-title">实时数据</div>
            </div>
            <NowChart style="height: 18.75rem" :weather-data="weatherData7d"/>
          </div>
        </div>
      </div>
    </div>
    <div class="weather-24h-charts">
      <Weather24hChart style="width: 100%; height: 100%" :weather24h="weather24h"/>
    </div>
  </div>
</template>

<script>
import NowChart from './components/nowChart'
import Weather24hChart from './components/Weather24hChart'
import api from '@/api'
const {weather} = api
export default {
  name: 'Weather',
  props: {
    weatherData: Object,
    place: String
  },
  data() {
    return ({
      weather24h: null
    })
  },
  components: {
    NowChart,
    Weather24hChart
  },
  computed: {
    weatherData7d() {
      return this.weatherData.weather7d.map((item,index) => {
        let weeks = ["日", "一", "二", "三", "四", "五", "六"]
        let day = weeks[new Date(item.fxDate).getDay()]
        return (
          {
            ...item,
            lightIndex: index % 4,
            day
          }
        )
      })
    },
    weatherData6d() {
      return this.weatherData7d.slice(1)
    },
    weatherTable() {
      let columns = [
        {
          title: '日期',
          key: 'date',
          align: 'center',
          className: 'weather-content-table-iview',
          minWidth: 40
        },
        {
          title: '星期',
          key: 'day',
          align: 'center',
          className: 'weather-content-table-iview',
          maxWidth: 80
        },
        {
          title: '地区',
          key: 'place',
          align: 'center',
          className: 'weather-content-table-iview',
        },
        {
          title: '温度',
          key: 'temp',
          align: 'center',
          className: 'weather-content-table-iview',
          maxWidth: 80
        },
        {
          title: '风速',
          key: 'speed',
          align: 'center',
          className: 'weather-content-table-iview',

        }
      ]
      let weatherData5d = this.weatherData6d.slice(1)
      let data = weatherData5d.map(item => {
        if(parseInt(item.windScaleDay.slice(0,1)) === 0) {
            item.windScaleDay = '无风'
        }else if(parseInt(item.windScaleDay.slice(0,1)) > 0 && parseInt(item.windScaleDay.slice(0,1)) < 4) {
            item.windScaleDay = '微风'
        }else if(parseInt(item.windScaleDay.slice(0,1)) >= 4 && parseInt(item.windScaleDay.slice(0,1)) <= 5) {
            item.windScaleDay = '清风'
        }else {
            item.windScaleDay = '强风'
        }
        return {
          date: item.fxDate.replace(/-/g, "/"),
          day: item.day,
          place: this.place,
          temp: item.tempMax,
          speed: item.windScaleDay
        }
      })
      return {columns, data }
    }
  },
  mounted() {
    weather.getWeather24hByName({name: this.place}).then(res => {
      this.weather24h = res.hourly.map(item => {
        item.date = item.fxTime.slice(0, 10)
        item.time = item.fxTime.slice(11, 16)
        return item
      })
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style >
.weather-content-table-iview {
  font-size: 16px;
  color:#9A9A9A;
}
</style>
<style lang="less" scoped>
@import "./index.less";
</style>