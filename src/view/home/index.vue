<template>
    <router-view 
        :weather-data="weatherData" 
        :place="place"
        :batch="batch"
        :warn="warn"
        :basicData="YearlyQuantityData"
        :totlaData="totlaData"
    ></router-view>
</template>

<script>
import api from '@/api'
import {getDate} from "@/libs/tools.js"
const {weather, main} = api
export default {
    name: "Main-router",
    data() {
        return ({
            place: '北京',
            totlaData: {},
            weatherData: {
                weatherNow: {},
                weather7d: []
            },
            batch: {
                day: [],
                month: []
            },
            warn: {
                day: [['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],[55, 40, 30, 80, 70, 86, 70, 40, 50, 55]],
                month: [['1/04','2/04','3/04','4/04','5/04','6/04','7/04','8/04','9/04','10/04','11/04','12/04'], [1, 1, 2, 3, 2, 3, 4, 3, 2, 2, 1, 2], [4, 6, 8, 7, 7, 6, 7, 8, 7, 6, 6, 5], [9, 10, 12, 9, 9, 10, 11, 10, 10, 9, 11, 12]]
            },
            YearlyQuantityData: []
        })
    },
    methods: {
        getNowWeather(place) {
            weather.getWeatherNowByName({name: place}).then(res => {
            let weeks = ["日", "一", "二", "三", "四", "五", "六"]
            res.now.time = res.now.obsTime.slice(0, 10).replace(/-/g, "/")
            res.now.day = weeks[new Date(res.now.time).getDay()]
            if(res.now.windScale === 0) {
                res.now.windScale = '无风'
            }else if(res.now.windScale > 0 && res.now.windScale < 4) {
                res.now.windScale = '微风'
            }else if(res.now.windScale >= 4 && res.now.windScale <= 5) {
                res.now.windScale = '清风'
            }else {
                res.now.windScale = '强风'
            }
            this.weatherData.weatherNow = res.now
            })
        },
        get7dWeather(place) {
            weather.getWeather7dByName({name: place}).then(res => {
                this.weatherData.weather7d = res.daily.map(item => ({
                    fxDate: item.fxDate,
                    tempMax: item.tempMax,
                    tempMin: item.tempMin,
                    windScaleDay: item.windScaleDay,
                    humidity: item.humidity
                }))
            })
        },
        getBatch() {
            Promise.all([
                main.getDayBatch(),
                main.getHourBatch()
            ]).then(res => {
                let [monthRes, dayRes] = res
                let day = [[],[]]
                let month = [[],[]]
                dayRes.forEach(item => {
                    day[0].push(item.time)
                    day[1].push(item.quantity)
                })
                monthRes.forEach(item => {
                    month[0].push(item.time)
                    month[1].push(item.quantity)
                })
                this.batch={day, month}
            })
        },
        getWarn() {
            Promise.all([
                main.getDayWarn(),
                main.getHourWarn()
            ]).then(res => {
                let [monthRes, dayRes] = res
                let day = [[],[]]
                let month = [[],[]]
                dayRes.forEach(item => {
                    day[0].push(item.time)
                    day[1].push(item.quantity)
                })
                monthRes.forEach(item => {
                    month[0].push(item.time)
                    month[1].push(item.quantity)
                })
                this.warn={day, month}
            })
        },
        getYearlyQuantityData() {
            main.getYearlyQuantityData(new Date().getFullYear()).then(res => {
                let {batch, risk, statistics} = res
                let longArr = null
                let result = []
                if(batch.length < risk.length) {
                    longArr = "risk"
                    if(risk.length < statistics.length) {
                        longArr = "statistics"
                    }
                }else {
                    longArr = "batch"
                    if(batch.length < statistics.length) {
                        longArr = "statistics"
                    }
                }
                switch(longArr) {
                    case "risk":
                        result = risk.map(item => ({
                            time: item.time,
                            warnNum: item.quantity,
                            sales: batch.find(item1 => item1.time === item.time) ? batch.find(item1 => item1.time === item.time).quantity : 0,
                            scanNum: statistics.find(item1 => item1.time === item.time) ? statistics.find(item1 => item1.time === item.time).quantity : 0,
                        }))
                    break
                    case 'batch':
                        result = batch.map(item => ({
                            time: item.time,
                            sales: item.quantity,
                            warnNum: risk.find(item1 => item1.time === item.time) ? risk.find(item1 => item1.time === item.time).quantity : 0,
                            scanNum: statistics.find(item1 => item1.time === item.time) ? statistics.find(item1 => item1.time === item.time).quantity : 0,
                        }))
                    break
                    case 'statistics': 
                        result = statistics.map(item => ({
                            time: item.time,
                            scanNum: item.quantity,
                            warnNum: risk.find(item1 => item1.time === item.time) ? risk.find(item1 => item1.time === item.time).quantity : 0,
                            sales: batch.find(item1 => item1.time === item.time) ? batch.find(item1 => item1.time === item.time).quantity : 0,
                        }))
                    break;
                }
                this.YearlyQuantityData = result;
            })
        },
        getTotlaData() {
            main.getTotalData().then(res => {
                let todayBatchRate = !res.totalOfYesterday ? res.totalOfYesterday === res.totalOfToday ? 0 : 100  : (res.totalOfToday-res.totalOfYesterday)/res.totalOfYesterday*100
                let monthBatchRate = !res.totalOfPreviousMonth ? res.totalOfPreviousMonth === res.totalOfMonth ? 0 : 100 : (res.totalOfMonth-res.totalOfPreviousMonth)/res.totalOfPreviousMonth*100
                let todayHighRiskRate = !res.totalOfYesterdayHighRisk ? res.totalOfYesterdayHighRisk === res.totalOfTodayHighRisk ? 0 : 100 : (res.totalOfTodayHighRisk-res.totalOfYesterdayHighRisk)/res.totalOfYesterdayHighRisk*100
                let monthHighRiskRate = !res.totalOfPreviousMonthHighRisk ? res.totalOfPreviousMonthHighRisk === res.totalOfMonthHighRisk ? 0 : 100 : (res.monthHighRisk-res.totalOfPreviousMonthHighRisk)/res.totalOfPreviousMonthHighRisk*100
                this.totlaData = {
                    todayBatch: res.totalOfToday,
                    todayBatchRate,
                    monthBatch: res.totalOfMonth,
                    monthBatchRate,
                    todayHighRisk: res.totalOfTodayHighRisk,
                    todayHighRiskRate,
                    monthHighRisk: res.totalOfMonthHighRisk,
                    monthHighRiskRate
                }
            })
        }
    },
    mounted() {
        this.getNowWeather(this.place)
        this.get7dWeather(this.place)
        this.getBatch()
        this.getWarn()
        this.getYearlyQuantityData()
        this.getTotlaData()
    }

}
</script>