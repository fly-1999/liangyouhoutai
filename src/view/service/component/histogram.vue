<template>
    <div class="histogram-charts" style="height:18rem;width:100%"></div>
</template>

<script>
import echarts from "echarts";
export default {
    name: "histogram",
    data() {
        return {
            riskAll: {
                "低风险": 0,
                "中风险": 0,
                "高风险": 0
            }
        }
    },
    mounted() {
        this.initCharts();
        this.getRiskAll()
    },
    methods: {
        initCharts() {
            this.charts = echarts.init(
                document.getElementsByClassName("histogram-charts")[0]
            );

            var option = {
                // backgroundColor: 'RGB(2,22,76)',
                color: ["#07F1F9", "#F5FC09", "#F99974"],
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
                    },
                    formatter: "{b}: {c}"
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
                    selectedMode:false,
                    top: 15,
                    left: 26,
                    textStyle: {
                        color: '#fff'
                    }
                },
                xAxis: [
                    {
                        type: "category",
                        data: ['低风险', '中风险', '高风险'],
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
                    },
                    {
                        name: "中风险",
                        type: "bar",
                        //silent: true,
                        barWidth: "15%",
                        //barGap: '-100%', // Make series be overlap
                        data: [
                            {
                                value: this.riskAll["低风险"],
                                itemStyle: {
                                    color: '#07F1F9'
                                }
                            },
                            {
                                value: this.riskAll["中风险"],
                                itemStyle: {
                                    color: '#F5FC09'
                                }
                            },
                            {
                                value: this.riskAll["高风险"],
                                itemStyle: {
                                    color: '#F99974'
                                }
                            }
                        ]
                    },
                    {
                        name: "高风险",
                        type: "bar",
                        //silent: true,
                    }
                ]
            };
            this.charts.setOption(option, true);
        },
        getRiskAll() {
            this.$api.service.getRiskAll().then(res => {
                this.riskAll = {...this.riskAll, ...res}
                this.initCharts();
            })
        }
    }
};
</script>

<style scoped>
</style>
