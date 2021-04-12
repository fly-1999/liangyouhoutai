<template>
    <div class="month-warn">
        <div class="month-warn-header">
            <div class="month-warn-header-title">本月高风险次数</div>
            <Button
                type="primary"
                ghost
                class="month-warn-header-button"
                @click="goBack"
                >返回</Button
            >
            <Button
                type="primary"
                :ghost="isShowChart"
                class="month-warn-header-button"
                @click="setShowChart"
                >切换</Button
            >
        </div>
        <div class="month-warn-content">
            <div
                class="month-warn-content-chart"
                ref="chart"
                v-show="isShowChart"
            ></div>
            <MainTable
                :columns="['时间', '高风险次数']"
                :data="[warn.month[0], warn.month[1]]"
                title="高风险"
                v-show="!isShowChart"
            />
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
import MainTable from "../components/mainTable";
let chart = null;
export default {
    name: "MonthWarn",
    components: {
        MainTable
    },
    props: {
        warn: Object
    },
    data() {
        return {
            a: "",
            isShowChart: true
        };
    },
    methods: {
        setShowChart() {
            this.isShowChart = !this.isShowChart;
        },
        goBack() {
            this.$router.go(-1);
        },
        initChart() {
            var myChart = echarts.init(this.$refs.chart);
            chart = myChart;
            myChart.setOption({
                tooltip: {
                    trigger: "axis",
                    
                },
                legend: {
                    left: 45,
                    top: 30,
                    icon: "circle",
                    textStyle: {
                        fontSize: 20,
                        color: "#999"
                    }
                },
                grid: {
                    left: 45,
                    right: 45,
                    top: 100,
                    bottom: 0,
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    axisLine: {
                        lineStyle: {
                            width: 0
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true
                    },
                    minorTick: {
                        show: true
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 19,
                            color: "#999"
                        }
                    }
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            width: 0
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: ["#aaa"]
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 19,
                            color: "#999"
                        }
                    }
                },
                series: [
                    {
                        name: "高风险次数",
                        type: "line",
                        smooth: true,
                        symbolSize: 8,
                        areaStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "rgba(30,136,229,.5)" // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: "#fff" // 100% 处的颜色
                                    }
                                ]
                            }
                        },
                        symbol: "circle",
                        itemStyle: {
                            normal: {
                                color: "#1E88E5",
                                borderColor: "#1E88E5"
                            }
                        }
                    }
                ]
            });
        },
        setChart() {
            if (chart && this.warn.month) {
                chart.setOption({
                    xAxis: {
                        data: this.warn.month[0]
                    },
                    series: [
                        { data: this.warn.month[1] }
                    ]
                });
            }
        }
    },
    mounted() {
        this.initChart();
        this.setChart();
    }
};
</script>

<style lang="less" scoped>
@fontFamily: Adobe Heiti Std R;
.month-warn {
    width: 100%;
    height: 100%;
    background: #fff;
    &-header {
        position: relative;
        width: 100%;
        height: 10%;
        border-bottom: 1px solid #e6e6e6;
        &-title {
            margin-left: 36px;
            font-size: 30px;
font-family: @fontFamily;
font-weight: bold;
            color: #333;
            line-height: 68px;
        }
        &-button {
            position: absolute;
            top: 50%;
            width: 83px;
            height: 39px;
            font-size: 18px;
            transform: translate(0, -50%);
            &:nth-of-type(1) {
                right: 43px;
            }
            &:nth-of-type(2) {
                right: 165px;
            }
        }
    }
}
.month-warn-content {
    width: 100%;
    height: 90%;
    &-chart {
        width: 100%;
        height: 100%;
    }
}
</style>