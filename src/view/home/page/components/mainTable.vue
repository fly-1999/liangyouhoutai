<template>
  <div class="main-table">
      <Table disabled-hover border :columns="tableColumns" :data="tableData"></Table>
      <div class="main-table-tip">共计{{`${title}: ${allData}`}}次</div>
  </div>
</template>

<script>
/**
 * columns 列名 例子:['时间', '批次数量'] 会自动生成四个
 * data 数据,第一个写列名[0]的数据，第二个写列名[1]的数据 例子: [['09:00', '10:00'],[55, 40]]
 * title 共计title: 几次  在tip中
 */
export default {
  name:"mainTable",
  props: {
    columns: Array,
    data: Array,
    title: String
  },
  computed: {
    tableColumns() {
      let columnsArr = [this.columns, this.columns, this.columns, this.columns].map((item1, index) => {
        return item1.map(item2 => ({
          title: item2,
          key: item2+index,
          align: 'center',
          className: "table-style",
        }))
      })
      if(columnsArr.length === 0) {
        return 0
      }
      return columnsArr.reduce((tmp,item) => {
        return tmp.concat(...item)
      })
    },
    tableData() {
       let keyArr = this.data[0].map((item,index) => {
        let num = index % 4
        let obj = {}
        obj[`${this.columns[0]}${num}`] = item
        obj[`${this.columns[1]}${num}`] = this.data[1][index]
        return obj
      })
      let result = []
      let middle = {}
      keyArr.forEach((item, index) => {
        middle = {...middle, ...item}
        if((index+1) % 4 === 0 || index === keyArr.length-1) {
          result.push(middle)
          middle = {}
        }
      })
      return result
    },
    allData() {
      if(this.data[1].length === 0) {
        return 0
      }
      return this.data[1].reduce((temp, item) => {
        return temp+item
      })
    }
  },
}
</script>

<style lang="less" scoped>
@fontFamily: Adobe Heiti Std R;
  .main-table {
    margin: 0 auto;
    width: 90%;
    height: 100%;
    &-tip {
      padding: 27px 0;
      font-size: 26px;
font-family: @fontFamily;
      color: #333333;
      text-align: right;
      border-bottom: 1px solid #E6E6E6;
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
  /deep/thead span {
    font-size: 23px;
  }
</style>