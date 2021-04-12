<template>
    <div class="search">
        <Input
            search
            placeholder="搜索批次编号"
            class="w226"
            @on-search="search"
        />
        <Table
            :columns="columns"
            :data="dataListPage[current]"
            :span-method="handleSpan"
            style="margin-top: 10px"
        ></Table>
        <Page :total="12" show-elevator class="page" @on-change="chagePage"/>
    </div>
</template>

<script>
export default {
    name: "search",
    data() {
        return {
            columns: [
                {
                    title: "批次编号",
                    key: "num",
                    align: "center"
                },
                {
                    title: "环节编号",
                    key: "num1",
                    align: "center"
                },
                {
                    title: "供应链环节",
                    key: "supply",
                    align: "center"
                },
                {
                    title: "危害物流信息",
                    key: "logistics",
                    align: "center"
                },
                {
                    title: "风险等级",
                    key: "risk",
                    align: "center"
                }
            ],
            current:0,
            dataList: []
        };
    },
    methods: {
        chagePage(val) {
            this.current = val-1
        },
        handleSpan({ row, column, rowIndex, columnIndex }) {
            console.log(rowIndex);
            console.log(columnIndex);
            if (rowIndex === 0 && columnIndex === 0) {
                return [1, 2];
            }
        },
        getLogistics(arsenic, cadmium, lead) {
            let arrStr = []
            if(arsenic>0) {
                arrStr.push("砷")
            }
            if(cadmium>0) {
                arrStr.push("镉")
            }
            if(lead>0) {
                arrStr.push("铅")
            }
            if(arrStr.length === 0) {
                return "无"
            }
            return arrStr.join("/")
        },
        getRisk(riskNum) {
            switch(riskNum) {
                case 3:
                    return "高风险"
                case 2:
                    return "中风险"
                default:
                    return "低风险"
            }
        },
        getData(code) {
            this.$api.qualityTraceability.getSupplyInfoByCode(code).then(res => {
                console.log(res);
                this.dataList = res.map(item => ({
                    num: item.productCode,
                    num1: item.riceSupplyChainNodeId,
                    supply: item.riceSupplyChainNode,
                    logistics: this.getLogistics(item.arsenic, item.cadmium, item.lead),
                    risk: this.getRisk(item.levelWorkingnodeAll)
                }))
            })
        },
        search(val) {
            if(val) {
                this.getData(val)
            }
        }
    },
    mounted() {
        this.getData(1)
    },
    computed: {
        dataListPage() {
            let result = []
            let middle = []
            this.dataList.forEach((item,index) => {
                middle.push(item)
                if((index+1) % 10 === 0 || index === this.dataList.length-1) {
                    result.push(middle)
                    middle = []
                }
            })
            return result
        }
    }
};
</script>
<style lang="less" scoped>
.w226{
    width:226px;
}
.search {
    padding: 10px 36px 0 36px;
    .page {
        position: absolute;
        bottom: 30px;
        right: 50px;
    }
}
</style>

