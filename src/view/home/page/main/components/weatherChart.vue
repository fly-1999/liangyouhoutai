<template>
    <div ref="chart" style="height: 13.56rem; width: 100%"></div>
</template>

<script>
import echarts from "echarts";
let chart = null;
export default {
    props: {
        weather: Object
    },
    methods: {
        initChart() {
            var myChart = echarts.init(this.$refs.chart);
            myChart.showLoading();
            chart = myChart;
            myChart.setOption({
                xAxis: {
                    data: [],
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: {
                        color: "#999999",
                        fontFamily: "Adobe Heiti Std R",
                        fontSize: 12,
                        interval: 0
                    }
                },
                yAxis: {
                    type: "value",
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: {
                        color: "#999999",
                        fontFamily: "Adobe Heiti Std R",
                        fontSize: 15
                    }
                },
                legend: {
                    left: 5,
                    top: '8%',
                    icon: "circle",
                    textStyle: {
                        color: "#999999",
                        fontFamily: "Adobe Heiti Std R",
                        fontSize: 14
                    }
                },
                grid: {
                    left: '4%',
                    right: '4%',
                    top: '30%',
                    bottom: '4%',
                    containLabel: true
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        lineStyle: {
                            type: "dashed"
                        }
                    },
                    formatter:
                        '<span style="color: #1BBC9B">{c0}</span><br /><span style="color: #999">{c1}</span>',
                    backgroundColor: "#fff"
                },
                series: [
                    {
                        name: "最高",
                        type: "line",
                        data: [],
                        smooth: true,
                        showSymbol: false,
                        itemStyle: {
                            color: "#1BBC9B"
                        },
                        lineStyle: {
                            color: "#1BBC9B",
                            shadowColor: "#03D07130",
                            shadowBlur: 10
                        }
                    },
                    {
                        name: "最低",
                        type: "line",
                        data: [],
                        smooth: true,
                        symbol: "none",
                        itemStyle: {
                            color: "#B69DFA"
                        },
                        lineStyle: {
                            color: "#DBDFE5"
                        }
                    }
                ]
            });
        },
        setChart() {
            if (this.weather.data && chart) {
                let fontSize = 12
                if(this.$refs.chart.offsetHeight < 150) {
                    fontSize = 9
                }
                chart.hideLoading();
                chart.setOption({
                    xAxis: {
                        data: this.weather.day,
                        axisLabel: {
                            fontSize: fontSize,
                        }
                    },
                    yAxis: {
                        axisLabel: {
                            fontSize: fontSize,
                        }
                    },
                    series: [
                        { data: this.weather.data[0] },
                        { data: this.weather.data[1] }
                    ]
                });
            }
        }
    },
    mounted() {
        //为了让外部组件自适应,并且让图表显示加载中
        setTimeout(() => {
            this.initChart();
            if (this.weather.data) {
                this.setChart();
            }
        }, 1);
    },
    watch: {
        weather() {
            this.setChart();
        }
    }
};
</script>
