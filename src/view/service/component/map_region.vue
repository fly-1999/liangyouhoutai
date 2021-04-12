<template>
        <div ref="map" style="width: 100% ;height: 90%"></div>
</template>

<script>
import echarts from "echarts";
import "./map.js"
let map = null
export default {
    name: "map_region",
    props: {
        areaRank: Object,
    },
    data() {
        return {
            city: [
                
            ]
        }
    },
    mounted() {
        this.mapEchartsInit();
        map.on("georoam",(params) => {
            this.isShowCity(map.getOption().geo[0].zoom);
        })
    },
    methods: {
        mapEchartsInit() {
            var option = {
                tooltip: {//鼠标放上去提示
                    padding: [5, 10],
                    trigger: 'item',
                    formatter: (params) => {
                        if(this.areaRank[params.name+"省"]) {
                            return `
                                <div>${params.name}</div>
                                <div>低风险: ${this.areaRank[params.name+"省"]["低风险"]}</div>
                                <div>中风险: ${this.areaRank[params.name+"省"]["中风险"]}</div>
                                <div>高风险: ${this.areaRank[params.name+"省"]["高风险"]}</div>
                            `
                        }
                        return ""
                    }
                },
                geo: {
                    map: 'china',
                    zoom: .505,
                    label: {
                        normal: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor:'transparent',
                            borderColor: 'rgb(4, 94, 164)',
                            borderWidth: 1,
                            areaColor:'rgb(0, 51, 102)',
                        },
                        emphasis: {
                            areaColor:'rgb(0, 153, 255)',
                        }
                    },
                    layoutCenter: ['56.2%', '45%'],
                    layoutSize: '160%',

                    markPoint: {
                        symbol: 'none'
                    },
                    regions: [
                        {
                            name: "南海诸岛",
                            itemStyle: {
                                // 隐藏地图
                                normal: {
                                    opacity: 0, // 为 0 时不绘制该图形
                                }
                            },
                            label: {
                                show: false // 隐藏文字
                            }
                        }
                    ],
                },
                series: [
                    {
                        type: 'map',
                        map: 'china',
                        geoIndex: 0,
                    },
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        showEffectOn: 'render',
                        label: {
                            show: true,
                            position: 'bottom',
                            formatter: "{b}",
                            color: '#fff'
                        },
                        itemStyle: {
                            color: '#fff' 
                        },
                        data: []
                    }
                ]
            };

            var myChart = echarts.init(this.$refs.map);
            map = myChart
            myChart.setOption(option, true);
        },
        isShowCity(zoom) {
            if(zoom>1.5) {
                map.setOption({
                    series: [
                        {},
                        {
                            data: city
                        }
                    ]
                })
            }else if(zoom<=1.5 && map.getOption().series[1].data.length !== 0) {
                map.setOption({
                    series: [
                        {},
                        {
                            data: []
                        }
                    ]
                })
            }
        }
    }
};
let city = [
    {
      name: '湖南111111111111',
      value: [117.2,39.1],
      
    },
    {
        name: '长沙',
        value: [112.59, 28.12]
    },
    {
        name: '张家界',
        value: [110.55, 29.34]
    },
    {
        name: '常德',
        value: [111.6, 29.01]
    },
    {
        name: '益阳',
        value: [112.37, 28.57]
    },
    {
        name: '永州',
        value: [111.59, 26.46]
    },
    {
        name: '衡阳',
        value: [112.73, 27.23]
    },
    {
        name: '怀化',
        value: [110.04, 27.57]
    },
    {
        name: '娄底',
        value: [112, 27.72]
    },
    {
        name: '岳阳',
        value: [113, 29.46]
    },
    {
        name: '郴州',
        value: [113.01, 25.78]
    },
    {
        name: '邵阳',
        value: [111.45, 27.24]
    },
    {
        name: '武汉',
        value: [114.02, 30.58]
    },
    {
        name: '黄石',
        value: [115.06, 30.22]
    },
    {
        name: '咸宁',
        value: [114.29, 29.85]
    },
    {
        name: '孝感',
        value: [113.91, 30.91]
    },
    {
        name: '十堰',
        value: [110.81, 32.59]
    },
    {
        name: '襄阳',
        value: [112.13, 32.04]
    },
    {
        name: '荆门',
        value: [112.20, 31.05]
    },
    {
        name: '荆州',
        value: [112.19, 30.35]
    },
    {
        name: '宜昌',
        value: [111.43, 30.53]
    },
    {
        name: '随州',
        value: [113.37, 31.71]
    },
    {
        name: '郑州',
        value: [113.64, 34.72]
    },
    {
        name: '洛阳',
        value: [112.51, 34.70]
    },
    {
        name: '开封',
        value: [114.34, 34.78]
    },
    {
        name: '安阳',
        value: [114.35, 36.10]
    },
    {
        name: '濮阳',
        value: [115.07, 35.77]
    },
    {
        name: '鹤壁',
        value: [114.16, 35.95]
    },
    {
        name: '新乡',
        value: [113.90, 35.37]
    },
    {
        name: '焦作',
        value: [113.23, 35.24]
    },
    {
        name: '许昌',
        value: [113.82, 34.12]
    },
    {
        name: '平顶山',
        value: [112.89, 33.89]
    },
    {
        name: '周口',
        value: [114.65, 33.64]
    },
    {
        name: '南阳',
        value: [112.53, 33]
    },
    {
        name: '漯河',
        value: [113.92, 33.54]
    },
    {
        name: '驻马店',
        value: [113.99, 32.97]
    },
    {
        name: '信阳',
        value: [114.05, 32.11]
    },
    {
        name: '商丘',
        value: [115.61, 34.44]
    },
    {
        name: '三门峡',
        value: [111.18, 34.77]
    },
    {
        name: '南宁',
        value: [108.27, 22.78]
    },
    {
        name: '贵港',
        value: [109.57, 23.11]
    },
    {
        name: '玉林',
        value: [110.05, 22.57]
    },
    {
        name: '百色',
        value: [106.61, 23.90]
    },
    {
        name: '河池',
        value: [108.03, 24.68]
    },
    {
        name: '桂林',
        value: [110.30, 25.31]
    },
    {
        name: '柳州',
        value: [109.44,24.33]
    },
    {
        name: '贺州',
        value: [111.55, 24.41]
    },
    {
        name: '梧州',
        value: [111.27, 23.48]
    },
    {
        name: '钦州',
        value: [108.57, 22.17]
    },
    {
        name: '北海',
        value: [109.11, 21.47]
    },
    {
        name: '崇左',
        value: [107.35, 22.40]
    },
    {
        name: '来宾',
        value: [109.23, 23.72]
    },
    {
        name: '香港',
        value: [114.16, 22.27]
    },
    {
        name: '澳门',
        value: [113.56, 22.19]
    },
    {
        name: '海口',
        value: [110.32, 20.02]
    },
    {
        name: '三亚',
        value: [109.75, 18.40]
    },
    {
        name: '广州',
        value: [113.15, 23.06]
    },
    {
        name: '茂名',
        value: [110.88, 21.68]
    },
    {
        name: '阳江',
        value: [111.95, 21.85]
    },
    {
        name: '韶关',
        value: [113.62, 24.84]
    },
    {
        name: '珠海',
        value: [113.52, 22.3]
    },
    {
        name: '深圳',
        value: [114.07, 22.62]
    },
    {
        name: '汕头',
        value: [116.69, 23.39]
    },
    {
        name: '佛山',
        value: [113.11, 23.05]
    },
    {
        name: '江门',
        value: [113.06, 22.61]
    },
    {
        name: '肇庆',
        value: [112.44, 23.05]
    },
    {
        name: '惠州',
        value: [114.4, 23.09]
    },
    {
        name: '梅州',
        value: [116.1, 24.55]
    },
    {
        name: '河源',
        value: [114.68, 23.73]
    },
    {
        name: '清远',
        value: [113.01, 23.7]
    },
    {
        name: '东莞',
        value: [113.75, 23.04]
    },
    {
        name: '中山',
        value: [113.38, 22.52]
    },
    {
        name: '潮州',
        value: [116.63, 23.68]
    },
    {
        name: '揭阳',
        value: [116.35, 23.55]
    },
    {
        name: '云浮',
        value: [112.02, 22.93]
    }
]
</script>

<style scoped>
</style>