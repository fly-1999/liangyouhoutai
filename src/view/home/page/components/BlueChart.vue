<template>
    <div class="blue-chart">
        <div class="blue-chart-header">
            <div class="blue-chart-header-title">{{ title }}</div>
            <Button
                type="primary"
                ghost
                class="blue-chart-header-button"
                @click="goBack"
                >返回</Button
            >
            <Button
                type="primary"
                :ghost="isShowChart"
                class="blue-chart-header-button"
                @click="setShowChart"
                >切换</Button
            >
        </div>
        <div class="blue-chart-content">
            <div
                class="blue-chart-content-chart"
                ref="chart"
                v-show="isShowChart"
            ></div>
            <MainTable
                :columns="columns"
                :data="data"
                :title="title.length<7?title.slice(2, 4):title.slice(2, 5)"
                v-show="!isShowChart"
            />
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
import MainTable from "./mainTable";
let chart = null;
export default {
    name: "blueChart",
    components: {
        MainTable
    },
    data() {
        return {
            isShowChart: true
        };
    },
    props: {
        title: String,
        type: String,
        data: Array,
        columns: Array
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
                    axisPointer: {
                        type: "line"
                    },
                    padding: [10,20],
                    textStyle: {
                        color: "#fff",
                        fontSize: 30
                    },
                    backgroundColor: "#1E88E5"
                },
                legend: {
                    left: 60,
                    top: 20,
                    icon: "circle",
                    textStyle: {
                        fontSize: 20,
                        color: "#999"
                    }
                },
                grid: {
                    left: 60,
                    right: 50,
                    top: 90,
                    bottom: 0,
                    containLabel: true
                },
                xAxis: {
                    type: "category",
                    axisLine: {
                        lineStyle: {
                            width: 0 //x轴不显示轴线
                        }
                    },
                    axisTick: {
                        show: false //不显示刻度
                    },
                    splitLine: {
                        show: true //显示纵向网格线
                    },
                    minorTick: {
                        show: true
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 25,
                            color: "#333"
                        }
                    }
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            width: 0 //x轴不显示轴线,
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: ["#aaa"]
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 25,
                            color: "#333"
                        }
                    }
                },
                series: [
                    {
                        type: "line",
                        name: this.title.length<7?this.title.slice(2,4)+"数量" : this.title.slice(2,5)+"次数",
                        color: ["#238BE5"],
                        symbolSize: 15,
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
                                        color: "rgba(35,139,229, .2)" // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.8,
                                        color: "#fff" // 100% 处的颜色
                                    }
                                ]
                            }
                        },
                        itemStyle: {
                            normal: {},
                            emphasis: {
                                color: "#238BE5" //hover拐点颜色定义
                            }
                        }
                    }
                ]
            });
        },
        setChart() {
            if (
                chart &&
                this.data &&
                this.data.length !== 0 &&
                this.title &&
                this.type
            ) {
                let tooltipWords = this.type === "name" ? "{b}" : "{c}";
                chart.setOption({
                    tooltip: {
                        formatter: tooltipWords
                    },
                    xAxis: {
                        data: this.data[0]
                    },
                    series: [
                        {
                            name: this.name,
                            data: this.data[1]
                        }
                    ]
                });
            }
        }
    },
    mounted() {
        this.initChart();
        this.setChart();
    },
    watch: {
        data() {
            this.setChart();
        }
    }
};
</script>

<style lang="less" scoped>
@fontFamily: Adobe Heiti Std R;
.blue-chart {
    width: 100%;
    height: 100%;
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
.blue-chart-content {
    width: 100%;
    height: 90%;
    &-chart {
        width: 100%;
        height: 100%;
    }
    &-table {
        margin: 0 auto;
        width: 90%;
        height: 100%;
        &-tip {
            padding: 27px 0;
            font-size: 26px;
font-family: @fontFamily;
            color: #333333;
            text-align: right;
            border-bottom: 1px solid #e6e6e6;
        }
    }
}
/deep/.table-style {
    height: 78px;
    font-size: 20px;
font-family: @fontFamily;
    color: #333;
    background: #fff;
}
/deep/.ivu-table-tbody .table-style {
    color: #999;
}
</style>