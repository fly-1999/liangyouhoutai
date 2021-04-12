<template>
    <div ref="chart" style="height: 100%; width: 100%"></div>
</template>

<script>
import echarts from 'echarts'
let chart = null
export default {
  props: {
    data: Array,
    column: Array,
    showColumn: Boolean
  },
  methods: {
    initChart () {
      var myChart = echarts.init(this.$refs.chart)
      chart = myChart
      myChart.showLoading()
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          data: [],
          axisLine: {
            lineStyle: {
              color: '#C0C4C9'
            }
          },
          axisTick: { show: false }
        },
        grid: {
          left:50,
          right: 50,
          top: 100,
          bottom: 40,
          // containLabel: true
        },
        yAxis: [
          {
            name: '销售额',
            type: 'value',
            min: 0,
            max:
                            Math.ceil(Math.max.apply(null, this.data[0]) / 5) *
                            5,
            interval: Math.ceil(
              Math.max.apply(null, this.data[0]) / 5
            ),
            boundaryGap: ['40px', '40px'],
            nameGap: 30,
            axisLabel: {
              formatter: '{value}￥',
              color: '#999999',
              fontSize: 18,
              fontFamily: 'Adobe Heiti Std R'
            },
            nameTextStyle: {
              color: '#999999',
              fontSize: 18,
              fontFamily: 'Adobe Heiti Std R'
            },
            axisLine: {
              lineStyle: {
                color: '#C0C4C9'
              }
            },
            axisTick: { show: false }
          },
          {
            name: '扫码次数',
            type: 'value',
            min: 0,
            max:
                            Math.ceil(
                              Math.max.apply(null, [
                                ...this.data[1],
                                ...this.data[2]
                              ]) / 5
                            ) * 5,
            interval: Math.ceil(
              Math.max.apply(null, [
                ...this.data[1],
                ...this.data[2]
              ]) / 5
            ),
            nameGap: 30,
            boundaryGap: ['40px', '40px'],
            axisLabel: {
              formatter: '{value}次',
              color: '#999999',
              fontSize: 18,
              fontFamily: 'Adobe Heiti Std R'
            },
            nameTextStyle: {
              color: '#999999',
              fontSize: 18,
              fontFamily: 'Adobe Heiti Std R'
            },
            axisLine: {
              lineStyle: {
                color: '#C0C4C9'
              }
            },
            axisTick: { show: false }
          }
        ],
        legend: {
          top: 0,
          left: 20,
          itemWidth: 32,
          itemHeight: 14,
          icon: 'roundRect',
          textStyle: {
            color: '#999999',
            fontFamily: 'Adobe Heiti Std R',
            fontSize: 20
          }
        },
        series: [
          {
            name: '批次',
            type: 'bar',
            barWidth: '20%',
            yAxisIndex: 0,
            clip: false,
            label: {
              show: true,
              position: 'top',
              fontSize: 15,
              color: '#999999',
              fontFamily: 'Adobe Heiti Std R'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 1, color: 'rgb(157, 123, 247)' },
                  { offset: 0, color: 'rgb(199, 179, 252)' }
                ]
              }
            }
          },
          {
            name: '高风险次数',
            type: 'bar',
            barWidth: '20%',
            yAxisIndex: 1,
            clip: false,
            label: {
              show: true,
              position: 'top',
              fontSize: 15,
              color: '#999999',
              fontFamily: 'Adobe Heiti Std R'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 1, color: 'rgb(0, 201, 255)' },
                  { offset: 0, color: 'rgb(155, 254, 165)' }
                ]
              }
            }
          },
          {
            name: '溯源次数',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'none',
            lineStyle: {
              color: '#1E88E5'
            },
            itemStyle: {
              color: '#1E88E5'
            }
          }
        ]
      })
    },
    setChart (dom = chart) {
      if (dom && this.data && this.data.length !== 0) {
        let fontSize = 20
        if (this.$refs.chart.offsetWidth < 550) {
          fontSize = 14
        }
        dom.hideLoading()
        dom.setOption({
          legend: {
            textStyle: {
              fontSize: fontSize
            }
          },
          grid: {
            bottom: this.showColumn? 40 : 5
          },
          yAxis: [
            {
              axisLabel: { fontSize: fontSize - 2 },
              nameTextStyle: { fontSize: fontSize }
            },
            {
              axisLabel: { fontSize: fontSize - 2 },
              nameTextStyle: { fontSize: fontSize }
            }
          ],
          xAxis: {
            data: this.column,
            axisLabel: { show: this.showColumn, fontSize: fontSize - 2 }
          },
          series: [
            { data: this.data[0] },
            { data: this.data[1] },
            { data: this.data[2] }
          ]
        })
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.initChart()
      this.setChart()
      chart.resize()
    }, 100)
  },
  watch: {
    data () {
      this.initChart()
      this.setChart()
      chart.resize()
    }
  }
}
</script>
