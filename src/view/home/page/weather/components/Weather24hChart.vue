<template>
    <div ref="chart"></div>
</template>

<script>
import echarts from "echarts";
let chart = null;
export default {
    props: {
        weather24h: Array
    },
    methods: {
        initChart() {
            var myChart = echarts.init(this.$refs.chart);
            myChart.showLoading();
            chart = myChart;
            myChart.setOption({
                xAxis: {
                    type: "category",
                    axisTick: { show: false },
                    axisLine: { show: false },
                    nameGap: 25,
                    textStyle: {
                        color: "#666",
                        fontSize: 16
                    },
                    textStyle: {
                        color: "#666",
                        fontSize: 14
                    }
                },
                yAxis: {
                    name: "温度/湿度",
                    nameGap: 30,
                    type: "value",
                    axisTick: { show: false },
                    axisLine: { show: false },
                    splitLine: {
                        lineStyle: {
                            type: "dashed"
                        }
                    },
                    textStyle: {
                        color: "#333",
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: "axis",
                    formatter: params => {
                        return `
              <p style="color:#333;font-size:16px">${
                  this.weather24h[params[0].dataIndex].date
              }</p>
              <p style="color:#000;font-size:14px"><span style="margin:0 5px;display:inline-block;width:6px;height:6px;border-radius:50%;background:#24C2DC;vertical-align:middle;"></span>当前温度:${
                  params[0].value
              }℃</p>
              <p style="color:#000;font-size:14px"><span style="margin:0 5px;display:inline-block;width:6px;height:6px;border-radius:50%;background:#417DE9;vertical-align:middle;"></span>当前湿度:${
                  params[1].value
              }%RH
              </p>
            `;
                    },
                    backgroundColor: "rgba(255,255,255,.5)"
                },
                legend: {
                    top: 20,
                    right: 20,
                    itemGap: 40,
                    icon: "roundRect",
                    formatter: name => {
                        if (name === "温度") {
                            return `${name}(℃)`;
                        }
                        if (name === "湿度") {
                            return `${name}(%RH)`;
                        }
                    },
                    textStyle: {
                        color: "#6E6E6E",
                        fontSize: 14
                    }
                },
                grid: {
                    left: 20,
                    right: 20,
                    top: 70,
                    bottom: 0,
                    containLabel: true
                },
                series: [
                    {
                        type: "line",
                        name: "温度",
                        smooth: true,
                        showSymbol: false,
                        lineStyle: { color: "#24C2DC" },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        { offset: 0, color: "#D6F5F2" },
                                        { offset: 1, color: "#46D7C7" }
                                    ]
                                }
                            },
                            emphasis: {
                                color: "#24C2DC",
                                borderColor: "#24C2DC"
                            }
                        },
                        areaStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: "#45d4c8" },
                                    { offset: 1, color: "#FFFFFF" }
                                ]
                            }
                        }
                    },
                    {
                        type: "line",
                        name: "湿度",
                        smooth: true,
                        showSymbol: false,
                        lineStyle: { color: "#417DE9" },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        { offset: 0, color: "#4179EB" },
                                        { offset: 1, color: "#D0DEFA" }
                                    ]
                                }
                            },
                            emphasis: {
                                color: "#417DE9",
                                borderColor: "#417DE9"
                            }
                        },
                        areaStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: "#5885f1" },
                                    { offset: 1, color: "#FFFFFF" }
                                ]
                            }
                        }
                    }
                ]
            });
        },
        setChart() {
            if (chart) {
                chart.hideLoading();
                chart.setOption({
                    xAxis: {
                        data: this.weather24h.map(item => item.time)
                    },
                    series: [
                        { data: this.weather24h.map(item => item.temp) },
                        { data: this.weather24h.map(item => item.humidity) }
                    ]
                });
            }
        }
    },
    mounted() {
        this.initChart();
        if (this.weather24h && this.weather24h.length !== 0) {
            this.setChart();
            chart.resize()
        }
    },
    watch: {
        weather24h() {
            if (this.weather24h && this.weather24h.length !== 0) {
                this.setChart();
                chart.resize()
            }
        }
    }
};
</script>

<style>
</style>