<template>
    <div class="select-ts">
        <span class="cloud-table-name">
            <span @click="monthCheck(1)" :class="{monthCheck:checked===1}">月</span>
            <span @click="monthCheck(2)" :class="{monthCheck:checked===2}">季</span>
            <span @click="monthCheck(3)" :class="{monthCheck:checked===3}">年: </span>
        </span>
        <DatePicker
            type="daterange"
            size="small"
            placeholder="请选择"
            placement="bottom-end"
            style="width: 11.2rem;"
            @on-change="dateChange"
        ></DatePicker>
        <div class="cloud-day-charts" style="height:16rem;width:90%"></div>
    </div>
</template>

<script>
import echarts from "echarts";
import { getDate } from "@/libs/tools"
export default {
    name: "break-line",
    data() {
        return {
            checked:0,
            data1: [5, 15, 19, 22, 11, 6, 9, 5, 15, 19, 22, 11, 6, 9],
            date: ["1日","2日","3日","4日","5日","6日","7日","8日","9日","10日","11日","12日","13日","14日"]
        };
    },
    mounted() {
        this.getData()
    },
    methods: {
        //时间选择
        dateChange(timeRage) {
            this.checked = 0
            this.getData(timeRage[0], timeRage[1]);
        },
        monthCheck(e) {
            this.checked=e;
            switch(e) {
                case 1:
                    this.getData(getDate((Date.now()-3600*1000*24*30)/1000,'year').slice(0,10) ,getDate(Date.now()/1000,'year').slice(0,10))
                    break;
                case 2:
                    this.getData(getDate((Date.now()-3600*1000*24*30*3)/1000,'year').slice(0,10) ,getDate(Date.now()/1000,'year').slice(0,10))
                    break
                case 3:
                    this.getData(getDate((Date.now()-3600*1000*24*30*12)/1000,'year').slice(0,10) ,getDate(Date.now()/1000,'year').slice(0,10))
                    break
            }
        },
        initCharts() {
            this.charts = echarts.init(
                document.getElementsByClassName("cloud-day-charts")[0]
            );
            var option = {
                legend: {
                    show: true,
                    icon: "rect",
                    itemWidth: 14,
                    itemHeight: 5,
                    itemGap: 10,
                    right: "35%",
                    top: 0,
                    textStyle: {
                        fontSize: 10,
                        color: "#ccc"
                    }
                },

                grid: {
                    top: "15%",
                    left: "10%",
                    right: "5%",
                    bottom: "15%",
                    containLabel: true
                },
                tooltip: {
                    trigger: "axis",
                },
                xAxis: [
                    {
                        type: "category",
                        axisLine: {
                            show: true
                        },
                        splitArea: {
                            // show: true,
                            color: "#f00",
                            lineStyle: {
                                color: "#f00"
                            }
                        },
                        axisLabel: {
                            color: "#fff",
                        },
                        splitLine: {
                            show: false
                        },
                        boundaryGap: false,
                        data: this.date
                    }
                ],

                yAxis: [
                    {
                        type: "value",
                        min: 0,
                        // max: 30,
                        splitNumber: 5,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,0.1)"
                            }
                        },
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            show: true,
                            margin: 5,
                            textStyle: {
                                color: "#d1e6eb"
                            }
                        },
                        axisTick: {
                            show: true
                        }
                    }
                ],
                series: [
                    {
                        type: "line",
                        smooth: true, //是否平滑
                        showAllSymbol: false,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: "circle",
                        symbolSize: 2,
                        lineStyle: {
                            normal: {
                                color: "#00b3f4"
                            }
                        },
                        itemStyle: {
                            color: "#00b3f4"
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(0,179,244,0.3)"
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(0,179,244,0)"
                                        }
                                    ],
                                    false
                                ),
                                shadowColor: "rgba(0,179,244, 0.9)",
                                shadowBlur: 20
                            }
                        },
                        data: this.data1
                    },

                ]
            };
            this.charts.setOption(option, true);
        },
        getData(start,end) {
            if(!start && !end) {
                let nowYear = new Date().getFullYear()
                start = nowYear + "-01-01"
                end = nowYear + "-12-31"
            }
            this.$api.service.getBatch(start,end).then(item => {
                if(item.length !== 0) {
                    this.data1 = item.map(item => (item.quantity))
                    this.date = item.map(item => (item.time))
                    this.initCharts();
                }else {
                    this.data1 = [0]
                    this.date = [0]
                    this.initCharts();
                }
            })
        }
    }
};
</script>

<style scoped lang="less">
.select-ts {
    /deep/.ivu-select-dropdown {
        background: white !important;
    }
}
.cloud-table-name {
    color: #07F1F9;
    font-size: 14px;
    margin: 0 20px 0 20px;
    vertical-align: text-top;
    span {
        margin-right: 10px;
        cursor: default;
    }
}
.monthCheck{
    color:#E0C800!important;
}
</style>
