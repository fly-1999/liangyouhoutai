<template>
    <table class="home">
      <tr class="home-data">
        <td class="home-data-day-batch" @click="goDayBatch">
          <div class="home-data-header">
            <div class="home-data-header-title">当天批次数量</div>
            <div class="home-data-header-day-batch-number">{{totlaData.todayBatch}}批</div>
          </div>
          <div class="home-data-content">
            <HomeShowChart :data="batch.day[1]" :color="[{offset: 0, color: 'rgb(184, 118, 235)'}, {offset: 1, color: 'rgb(200, 184, 249)'}]" :style="{width: '165px', height: '42px'}"/>
            <div>
              <p class="home-data-content-rate">{{totlaData.todayBatchRate}}%</p>
              <p class="home-data-content-words">相比上一天变化</p>
            </div>
          </div>
        </td>
        <td class="home-data-day-warn" @click="goDayWarn">
          <div class="home-data-header">
            <div class="home-data-header-title">当天高风险次数</div>
            <div class="home-data-header-day-warn-number">{{totlaData.todayHighRisk}}次</div>
          </div>
          <div class="home-data-content">
            <HomeShowChart :data="warn.day[1]" :color="[{offset: 0, color: 'rgb(0, 201, 255)'}, {offset: 1, color: 'rgb(155, 254, 165)'}]" />
            <div>
              <p class="home-data-content-rate">{{totlaData.todayHighRiskRate}}%</p>
              <p class="home-data-content-words">相比上一天变化</p>
            </div>
          </div>
        </td>
        <td class="home-data-month-batch" @click="goMonthBatch">
          <div class="home-data-header">
            <div class="home-data-header-title">本月批次数量</div>
            <div class="home-data-header-month-batch-number">{{totlaData.monthBatch}}批</div>
          </div>
          <div class="home-data-content">
            <HomeShowChart :data="batch.month[1]" :color="[{offset: 0, color: 'rgb(115, 174, 234)'}, {offset: 1, color: 'rgb(165, 209, 253)'}]" />
            <div>
              <p class="home-data-content-rate">{{totlaData.monthBatchRate}}%</p>
              <p class="home-data-content-words">相比上月变化</p>
            </div>
          </div>
        </td>
        <td class="home-data-month-warn" @click="goMonthWarn">
          <div class="home-data-header">
            <div class="home-data-header-title">本月高风险次数</div>
            <div class="home-data-header-month-warn-number">{{totlaData.monthHighRisk}}次</div>
          </div>
          <div class="home-data-content">
            <HomeShowChart :data="warn.month[1]" :color="[{offset: 0, color: 'rgb(248, 141, 156)'}, {offset: 1, color: 'rgb(244, 180, 252)'}]" />
            <div>
              <p class="home-data-content-rate">{{totlaData.monthHighRiskRate}}%</p>
              <p class="home-data-content-words">相比上月变化</p>
            </div>
          </div>
        </td>
      </tr>
      <tr class="home-show">
        <td class="home-show-basic-data">
          <div class="home-show-header">
            <div class="home-show-header-title">基本信息</div>
            <div class="home-show-header-button" @click="goInformation"><img :src="require('@/assets/images/main/button.png')" alt=""></div>
          </div>
          <div class="home-show-content">
            <img :src="require('@/assets/images/main/basicImg.png')" alt="" class="home-show-basic-data-picture">
          </div>
        </td>
        <td class="home-show-statistics" colspan="2">
          <div class="home-show-header">
            <div class="home-show-header-title">年度统计</div>
            <div class="home-show-header-button" @click="goYearStatistics"><img :src="require('@/assets/images/main/button.png')" alt=""></div>
          </div>
          <div class="home-show-content">
            <YearChart class="home-show-content-chart" style="height: 31.25rem; width: 100%" :data="chartData.data" :column="chartData.column"/>
          </div>
        </td>
        <td class="home-show-weather">
          <div class="home-show-header">
            <div class="home-show-header-title">环境监测</div>
            <div class="home-show-header-button" @click="goWeather"><img :src="require('@/assets/images/main/button.png')" alt=""></div>
          </div>
          <div class="home-show-content home-show-weather-content">
            <Spin fix v-if="!weatherData.weatherNow.temp">
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            </Spin>
            <div class="home-show-weather-data">
              <img :src="require(`@/assets/images/main/weather/${weatherData.weatherNow.icon || 999}.png`)" alt="" class="home-show-weather-data-img">
              <div class="home-show-weather-data-words">
                <div class="home-show-weather-data-words-number">{{weatherData.weatherNow.temp}}℃</div>
                <div class="home-show-weather-data-words-place">{{place}}</div>
              </div>
            </div>
            <div class="home-show-weather-date">
              <div class="home-show-weather-date-alldate">
                <p class="home-show-weather-date-title">日期</p>
                <p class="home-show-weather-date-value">{{weatherData.weatherNow.time}}</p>
              </div>
              <div class="home-show-weather-date-day">
                <p class="home-show-weather-date-title">周期</p>
                <p class="home-show-weather-date-value">星期{{weatherData.weatherNow.day}}</p>
              </div>
              <div class="home-show-weather-date-speed">
                <p class="home-show-weather-date-title">风速</p>
                <p class="home-show-weather-date-value">{{weatherData.weatherNow.windScale}}</p>
              </div>
            </div>
          </div>
          <WeatherChart :weather="dailyTemp"/>
        </td>
      </tr>
    </table>
</template>
<script>
import HomeShowChart from './components/HomeShowChart'
import YearChart from '../components/YaerChart'
import WeatherChart from './components/weatherChart'
import {weather} from '@/api/weather/weather.js'
export default {
  name: 'Main',
  components: {
    HomeShowChart,
    YearChart,
    WeatherChart
  },
  props: {
    weatherData: Object,
    place: String,
    batch: Object,
    warn: Object,
    basicData: Array,
    totlaData: Object
  },
  computed: {
    chartData() {
      let timeArr = []
      let salesArr = []
      let warnArr = []
      let scanArr = []
      this.basicData.forEach(item => {
        timeArr.push(item.time)
        salesArr.push(item.sales)
        warnArr.push(item.warnNum)
        scanArr.push(item.scanNum)
      })
      return {column: timeArr, data:[salesArr, warnArr, scanArr]}
    },
    dailyTemp() {
      if(this.weatherData.weather7d.length === 0) {
        return {}
      }
      let result = {}
      let maxArr = []
      let minArr = []
      let weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
      let day = new Date(this.weatherData.weather7d[0].fxDate).getDay()
      result.day = [...weeks.slice(day) , ...weeks.slice(0, day)]
      this.weatherData.weather7d.forEach(item => {
        maxArr.push(item.tempMax)
        minArr.push(item.tempMin)
      })
      result.data = [maxArr, minArr]
      return result
    }
  },
  methods: {
    goInformation() {
      this.$router.push('/information')
    },
    goWeather() {
      this.$router.push('/home/weather')
    },
    goDayBatch() {
      this.$router.push('/home/day/batch')
    },
    goDayWarn() {
      this.$router.push('/home/day/warn')
    },
    goMonthBatch() {
      this.$router.push('/home/Month/batch')
    },
    goMonthWarn() {
      this.$router.push('/home/month/warn')
    },
    goYearStatistics() {
      this.$router.push('/home/year/statistics')
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
