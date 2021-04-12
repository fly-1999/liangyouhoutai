<template>
    <div ref="chart" style="overflow: visible;"></div>
</template>

<script>
let chart = null;
import echarts from "echarts";
export default {
    props: {
        weatherData: Array
    },
    methods: {
        initChart() {
            var myChart = echarts.init(this.$refs.chart);
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
                    axisLabel: {
                        margin: 25
                    }
                },
                yAxis: {
                    type: "value",
                    axisTick: { show: false },
                    axisLine: { show: false },
                    splitLine: {
                        lineStyle: {
                            type: "dashed"
                        }
                    },
                    textStyle: {
                        color: "#666",
                        fontSize: 16
                    }
                },
                legend: {
                    zlevel: 99,
                    top: 10,
                    right: 0,
                    icon: "circle",
                    textStyle: {
                        color: "#6E6E6E",
                        fontSize: 14
                    }
                },
                grid: {
                    left: 0,
                    right: 0,
                    top: 50,
                    bottom: 5,
                    containLabel: true
                },
                series: [
                    {
                        type: "bar",
                        name: "温度",
                        barWidth: 10,
                        barGap: "90%",
                        clip: false,
                        itemStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 1, color: "rgb(252,185,113)" },
                                    { offset: 0, color: "rgb(255,169,57)" }
                                ]
                            }
                        }
                    },
                    {
                        type: "bar",
                        name: "湿度",
                        barWidth: 10,
                        barGap: "90%",
                        clip: false,
                        itemStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: "rgb(35,220,179)" },
                                    { offset: 1, color: "rgb(34,193,220)" }
                                ]
                            }
                        }
                    }
                ]
            });
        },
        setChart() {
            if (chart) {
                chart.setOption({
                    xAxis: {
                        data: this.weatherData.map(item => `周${item.day}`)
                    },
                    series: [
                        {
                            data: this.weatherData.map(item => item.tempMax)
                        },
                        {
                            data: this.weatherData.map(item => item.humidity)
                        }
                    ]
                });
            }
        }
    },
    mounted() {
        this.initChart();
        if (this.weatherData.length !== 0) {
            this.setChart();
            chart.resize()
        }
    },
    watch: {
        weatherData() {
            if (this.weatherData.length !== 0) {
                this.setChart();
                chart.resize()
            }
        }
    }
};
</script>

<style>
</style>