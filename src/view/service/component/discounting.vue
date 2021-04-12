<template>
    <div class="select-ts">
        <span class="cloud-table-name">
            <span @click="monthCheck(1)" :class="{monthCheck:checked==1}">月</span>
            <span @click="monthCheck(2)" :class="{monthCheck:checked==2}">季</span>
            <span @click="monthCheck(3)" :class="{monthCheck:checked==3}">年: </span>
        </span>
        <DatePicker
            type="daterange"
            size="small"
            placeholder="请选择"
            placement="bottom-end"
            style="width: 11.2rem;"
            @on-change="dateChange"
        ></DatePicker>
        <div class="discounting-charts" style="height:15rem;width:100%"></div>
    </div>
</template>

<script>
import echarts from "echarts";
import { getDate } from "@/libs/tools"
export default {
    name: "discounting",
    props: {
        changeData: String,
        required: true
    },
    data() {
        return {
            //点击年月日
            checked:0,
            data: [],
            date: []
        };
    },
    watch: {
        changeData: {
            deep: true, // 深度监听
            handler(newVal, oldVal) {
                this.getData()
            }
        }
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
        //月点击
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
                document.getElementsByClassName("discounting-charts")[0]
            );
            var xData = (function() {
                var data = [];
                for (var i = 1; i < 33; i++) {
                    data.push(i);
                }
                return data;
            })();
            var option = {
                // backgroundColor: "#1A1835",

                tooltip: {
                    trigger: "axis",
                },
                grid: {
                    borderWidth: 0,
                    top: '20%',
                    left: 10,
                    bottom: '10%',
                    textStyle: {
                        color: "#fff"
                    },
                    containLabel: true
                },
                // legend: {
                //     x: "0%",
                //     top: "11%",
                //     textStyle: {
                //         color: "#90979c"
                //     },
                //     data: ["收购"]
                // },

                calculable: true,
                xAxis: [
                    {
                        type: "category",
                        axisLine: {
                            lineStyle: {
                                color: "#8EE3FF"
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        data: this.date
                    }
                ],

                yAxis: [
                    {
                        type: "value",
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#8EE3FF"
                            }
                        },
                        splitLine:{
                            show :true,
                            lineStyle: {
                                color: "rgba(142, 227, 255, 0.2)"
                            }
                        } 
                        
                    }
                ],
                series: [
                    {
                        name: "次数",
                        type: "line",
                        symbolSize: 5,
                        symbol: "circle",
                        itemStyle: {
                            color: "#E0C800"
                        },
                        // markPoint: {
                        //     label: {
                        //         normal: {
                        //             textStyle: {
                        //                 color: "#fff"
                        //             }
                        //         }
                        //     },
                        //     data: [
                        //         {
                        //             type: "max",
                        //             name: "最大值"
                        //         },
                        //         {
                        //             type: "min",
                        //             name: "最小值"
                        //         }
                        //     ]
                        // },
                        data: this.data
                    }
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
            if(this.changeData) {
                this.$api.service.getTraceability(start,end,this.changeData).then(item => {
                    if(item.length !== 0) {
                        this.data = item.map(item => (item.quantity))
                        this.date = item.map(item => (item.time))
                        this.initCharts();
                    }else {
                        this.data = [0]
                        this.date = [0]
                        this.initCharts();
                    }
                })
            }else {
                this.$api.service.getTraceability(start,end).then(item => {
                    if(item.length !== 0) {
                        this.data = item.map(item => (item.quantity))
                        this.date = item.map(item => (item.time))
                        this.initCharts();
                    }else {
                        this.data = [0]
                        this.date = [0]
                        this.initCharts();
                    }
                })
            }
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
/deep/.ivu-date-picker-cells-cell{
    color: #515a6e;
}
/deep/.ivu-date-picker-header-label{
    color: #515a6e;
}
/deep/.ivu-picker-panel-shortcut{
    color: #515a6e;
}
</style>
