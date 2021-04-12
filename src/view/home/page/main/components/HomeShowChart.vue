<template>
  <div class="home-show-chart" ref="chart" :style="{width: '165px', height: '42px'}"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    data: Array,
    color: Array,
  },
  data() {
    return {
      chart: null
    }
  },
  methods: {
    initChart() {
      var myChart = echarts.init(this.$refs.chart)
      this.chart = myChart
      myChart.showLoading()
    },
    setChart() {
      if(this.chart && this.data) {
        this.chart.hideLoading()
        this.chart.setOption({
          xAxis: {
            show: false,
            boundaryGap: false,
            min: 'dataMin',
            max: 'dataMax',
            data: this.data.map((item,index) => index.toString())
          },
          grid: {
            left: 0,
            right: 0,
            top: 1,
            bottom: 1
          },
          yAxis: {
            show: false,
            type: 'value',
            boundaryGap: false,
            min: 'dataMin',
            max: 'dataMax'
          },
          series: {
            data: this.data,
            type: 'line',
            smooth: true,
            clip: false,
            symbol: 'none',
            sampling: 'average',
            data: this.data,
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: this.color
              }
            }
          }
        })
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.initChart()
      this.setChart()
    },100)
  },
  watch: {
    data() {
      this.setChart()
    }
  }
}
</script>
