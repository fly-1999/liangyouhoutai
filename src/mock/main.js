import Mock from 'mockjs';
function timeString(num) {
  if(num / 10 < 1) {
    return "0"+num
  }else {
    return num.toString()
  }
}
function getDayArr(num) {
  let arr = []
  let date = new Date()
  for(let i = 0; i < num; i++) {
    arr.push(timeString(date.getMonth()+1) + "/" + timeString(date.getDate()))
    date.setDate(date.getDate()+1)
  }
  return arr
}
function getTimeArr(num) {
  let arr = []
  let date = new Date()
  for(let i = 0; i < num; i++) {
    let hours = date.getHours()
    if(hours / 10 < 1) {
      hours = "0" + hours + ":00"
    }else {
      hours = hours + ":00"
    }
    arr.push(hours)
    date.setHours(date.getHours()+1)
  }
  return arr
}

const mainTemplate = {
  batchAPI: {
    "day": [getTimeArr(10),new Array(10).fill('@natural(0,100)')],
    "month": [getDayArr(10),new Array(10).fill('@natural(0,100)')]
  },
  warnAPI: {
    "day": [getTimeArr(10),new Array(10).fill('@natural(0,100)')],
    "month": [getDayArr(10),new Array(10).fill('@natural(0,30)'), new Array(10).fill('@natural(30,60)'), new Array(10).fill('@natural(60,90)')]
  },
  basicDataAPI: (option) => {
    var url = require("url")
    let num = null
    let {start,end} = url.parse(option.url, true).query
    if(start) {
      num = parseInt(end.slice(-2)) - parseInt(start.slice(-2))
    }
      return getDayArr(num || 7).map(item => ({
        time: item,
        sales: Mock.Random.natural(0,600),
        scanNum: Mock.Random.natural(0,300),
        warnNum: Mock.Random.natural(0,100)
      }))
    // }
    // let start = option.url.match(/start.*&end/)[0].slice(0,-4).split(/%2F/)
    // start[0] = start[0].slice(6)
    // start = start.join("/")
    // let end = option.url.match(/end.*$/)[0].split(/%2F/)
    // end[0] = end[0].slice(4)
    // end = end.join("/")
    // console.log(end)
  }
}
export default mainTemplate