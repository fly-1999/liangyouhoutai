<template>
    <div class="histogram2-charts" style="height:18rem;width:100%"></div>
</template>

<script>
import echarts from "echarts";
export default {
    name: "histogram2",
    props: {elementRank: Object},
    data() {
        return {
            chartData: {low: [], middle: [], hight:[]}
        }
    },
    mounted() {
        this.initCharts();
    },
    watch:{
        elementRank() {
            if(this.elementRank["镉"]["低风险"]) {
                let low = [this.elementRank["镉"]["低风险"], this.elementRank["铅"]["低风险"], this.elementRank["砷"]["低风险"]].map(item => ({value: item}))
                let middle = [this.elementRank["镉"]["中风险"], this.elementRank["铅"]["中风险"], this.elementRank["砷"]["中风险"]].map(item => ({value: item}))
                let hight = [this.elementRank["镉"]["高风险"], this.elementRank["铅"]["高风险"], this.elementRank["砷"]["高风险"]].map(item => ({value: item}))
                this.chartData = {low, middle, hight}
                this.initCharts()
            }
        }
    },
    // computed: {
    //     chartData() {
    //         let low = [this.elementRank["镉"]["低风险"], this.elementRank["铅"]["低风险"], this.elementRank["砷"]["低风险"]].map(item => ({value: item}))
    //         let middle = [this.elementRank["镉"]["中风险"], this.elementRank["铅"]["中风险"], this.elementRank["砷"]["中风险"]].map(item => ({value: item}))
    //         let hight = [this.elementRank["镉"]["高风险"], this.elementRank["铅"]["高风险"], this.elementRank["砷"]["高风险"]].map(item => ({value: item}))
    //         return {low, middle, hight}
    //     }
    // },
    methods: {
        initCharts() {
            this.charts = echarts.init(
                document.getElementsByClassName("histogram2-charts")[0]
            );
            var option = {
                // backgroundColor: 'RGB(2,22,76)',
                color: ["#0CE1F2", "#F5FC09", "#F99974"],
                title: {
                    // text: '广州市天河区历年高考数学难点分析',
                    top: 21,
                    left: "21",
                    textStyle: {
                        fontSize: 18,
                        color: "#fff"
                    }
                },
                animation: false,
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow"
                }
              },
                grid: {
                    top: "25%",
                    left: "5%",
                    right: "5%",
                    bottom: "10%",
                    containLabel: true
                },
                legend: {
                    show: true,
                    top: 15,
                    left: 26,
                    data: ["低风险", "中风险", "高风险"],
                    textStyle: {
                        color: "RGB(193,223,255)"
                    }
                },
                xAxis: [
                    {
                        type: "category",
                        data: ["镉", "铅", "砷"],
                        axisTick: {
                            alignWithLabel: true
                        },
                        nameTextStyle: {
                            color: "#fff"
                        },
                        axisLine: {
                            lineStyle: {
                                color: "RGB(47,68,114)"
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: "white"
                            },
                            margin: 20
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        axisLabel: {
                            textStyle: {
                                color: "white"
                            },
                            formatter: "{value}"
                        },
                        splitLine: {
                            lineStyle: {
                                type: "dashed",
                                color: "RGB(47,68,114)"
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "RGB(47,68,114)"
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: "低风险",
                        type: "bar",
                        //silent: true,
                        barWidth: "12",
                        //barGap: '-100%', // Make series be overlap
                        data: this.chartData.low
                    },
                    {
                        name: "中风险",
                        type: "bar",
                        //silent: true,
                        barWidth: "12",
                        //barGap: '-100%', // Make series be overlap
                        data: this.chartData.middle
                    },
                    {
                        name: "高风险",
                        type: "bar",
                        //silent: true,
                        barWidth: "12",
                        //barGap: '-100%', // Make series be overlap
                        data: this.chartData.hight
                    }
                ]
            };
            this.charts.setOption(option, true);
        }
    }
};
</script>

<style scoped>
</style>
