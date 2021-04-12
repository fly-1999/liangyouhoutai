<template>
    <div class="moduleConfig">
        <div class="module-header">
            <div
                v-for="(data, index) in userTypeList"
                :key="index"
                class="type"
                :class="{ active: currentIndex === index }"
                @click="chooseType(data, index)"
            >
                <span>{{ data }}</span>
            </div>
        </div>
        <div class="module-content">
            <Table :columns="columns" :data="dataList" border v-if="userTypeList[currentIndex] !== '危害物风险限值'">
                <template slot-scope="{ row }" slot="action">
                    <Button type="primary" @click="edit(row)" class="editButton">编辑</Button>
                </template>
                <template v-for="(data, index) in columnsArr" :slot="data.name">
                    <span v-if="chooseHandle" :key="index">
                        {{ data.value }}</span
                    >
                    <Input v-model="data.value" :key="index" v-else />
                </template>
            </Table>
            <Table :columns="columns" :data="dataList" border v-else>
                <template slot-scope="{ row,index }" slot="action">
                    <Button type="primary" @click="edit(index)" class="editButton">编辑</Button>
                </template>
                <template v-for="(data, index2) in columnsArr" slot-scope="{ row,index }" :slot="data.name">
                    <span v-if="!row.isEdit" :key="index2">
                        {{ row[data.name] }}</span
                    >
                    <Input v-model="dataList[index][data.name]" :key="index2" v-else />
                </template>
            </Table>
            <div class="moduleConfig-btn" v-if="!chooseHandle">
                <Button @click="submit">确认</Button>
                <Button @click="cancel">取消</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "moduleConfig",
    data() {
        return {
            chooseTypeList: [
                "预测加权配置",
                "危害物风险限值",
                "供应链环节权重"
            ],
            columns: [],
            dataList: [],
            columnsArr: [],
            chooseHandle: true,
            currentIndex: 0,
            chageArr: []
        };
    },
    methods: {
        initData() {
            this.columns = []
            this.dataList = []
            this.columnsArr = []
        },
        initRequest(type) {
            if (type === "预测加权配置") {
                this.$api.warning.getPredictionModel().then(res => {
                    if (!res && !res.length) return;
                    this.format(res);
                });
            } else if (type === "危害物风险限值") {
                this.$api.warning.getThresholdModel().then(res => {
                    if (!res && !res.length) return;
                    this.format2(res)
                });
                // this.format(arr);
            } else {
                this.$api.warning.getSupplyChainModel().then(res => {
                    if (!res && !res.length) return;
                    this.format(res);
                });
            }
        },
        format(res) {
            res.map((v, i) => {
                let obj = new Object();
                obj.value = v.value;
                obj.title = v.nodeName;
                obj.slot = v.nodeName;
                obj.nodeId = v.nodeId;
                obj.danwei = v.danwei;
                obj.align = "center";
                this.columnsArr.push({
                    name: v.nodeName,
                    value: v.value,
                    nodeId: v.nodeId
                });
                this.columns.push(obj);
            });
            this.columns.unshift({
                title: "属性",
                align: "center",
                key: "shuxing"
            });
            this.columns.push({
                title: "操作",
                align: "center",
                slot: "action"
            });
            var dataObj = new Object();
            this.columns.map(item => {
                var key = item.key;
                var value = item.value;
                dataObj[key] = value;
                dataObj[value] = key;
            });
            dataObj.shuxing = "缺省值";
            this.dataList.push(dataObj);
        },
        format2(res) {
            let columnsArr = []
            let columns = res.map(item => {
                columnsArr.push({
                    name: item.feature,
                    value: item.unit,
                    nodeId: item.id
                });
                return {
                    title: item.description,
                    align: "center",
                    slot: item.feature
                }
            });
            columns.push({
                title: "编辑",
                align: "center",
                slot: "action"
            })
            columns.unshift({
                title: '属性', 
                key: 'attribute',
                align: "center",
            })
            this.columns = columns
            this.columnsArr = columnsArr
            let row = [{},{}]
            res.forEach(item => {
                row[0][item.feature] = item.unit
                row[1][item.feature] = item.weight
            })
            row[0]['attribute'] = '单位'
            row[0]['isEdit'] = false
            row[1]['attribute'] = '缺省值'
            row[1]['isEdit'] = false
            this.dataList = row
        },
        edit(v) {
            this.chooseHandle = false;
            if(this.dataList[v]){
                this.dataList[v].isEdit = true
            }
            this.initListData();
        },
        cancel() {
            this.chooseHandle = true;
            if(this.dataList[0].isEdit) {
                this.dataList[0].isEdit = false
                this.dataList[1].isEdit = false
            }
            this.initData()
            this.initRequest(this.userTypeList[this.currentIndex])
        },
        submit() {
            this.chooseHandle = true;
            if(this.dataList[0].isEdit) {
                this.dataList[0].isEdit = false
                this.dataList[1].isEdit = false
            }
            if(this.userTypeList[this.currentIndex] === "预测加权配置") {
                let params = this.columnsArr.map(item => ({
                    id: item.nodeId,
                    weight: item.value
                }))
                this.$api.warning.updataPredictionModel(params).then(res => {
                    console.log(res)
                    this.initData()
                    this.initRequest(this.userTypeList[this.currentIndex])
                })
            }else if(this.userTypeList[this.currentIndex] === "供应链环节权重") {
                let params = this.columnsArr.map(item => ({
                    id: item.nodeId,
                    weight: item.value
                }))
                this.$api.warning.updataSupplyChainModel(params).then(res => {
                    console.log(res)
                    this.initData()
                    this.initRequest(this.userTypeList[this.currentIndex])
                })
            }else {
                let params = this.columnsArr.map(item => ({
                    id: item.nodeId,
                    unit: this.dataList[0][item.name],
                    weight: this.dataList[1][item.name]
                }))
                this.$api.warning.updataThresholdModel(params).then(res => {
                    console.log(res)
                    this.initData()
                    this.initRequest(this.userTypeList[this.currentIndex])
                })
            }
        },
        initListData() {
            this.dataList = Object.assign([], this.dataList);
        },
        chooseType(v, index) {
            this.currentIndex = index;
            this.chooseHandle = true;
            this.columns = [];
            this.dataList = [];
            this.columnsArr = [];
            this.initRequest(v);
        }
    },
    created() {
        this.initRequest(this.userTypeList[0]);
    },
    computed: {
        userTypeList() {
            let access = this.$store.state.user.access.earlyWarning
            if(!access) return this.chooseTypeList
            return this.chooseTypeList.filter(item => {
                if(item === "危害物风险限值" && access.find(item2 => item2 === "危险物风险门限值")) return true
                if(item === "预测加权配置" && access.find(item2 => item2 === "预测加权配置")) return true
                if(item === "供应链环节权重" && access.find(item2 => item2 === "供应链权重")) return true
                return false
            })
        },
    }
};
</script>

<style lang="less" scoped>
.editButton{
    width: 75px;
    height: 33px;
    border-radius: 6px;
    padding: 0;
    font-family: Adobe Heiti Std;
    box-shadow: 0 0 0 2px transparent;
}
/deep/.editButton > span{
        display: block;
        width: 100%;
        height: 100%;
        font-size: 17px !important;
        line-height: 31px;
    }
.moduleConfig {
    padding: 10px;
    .module-header {
        .type {
            display: inline-block;
            font-size: 26px;
            margin: 5px 20px 20px 10px;
            cursor: pointer;
        }
        .type:first-child {
            margin: 5px 20px 20px 26px;
        }
        .type:active {
            color: #1e88e5;
        }
        .type.active {
            color: #1f88e5;
        }
        .type:hover {
            color: #1e88e5;
        }
    }
    .module-content {
        padding-left: 26px;
    }
    /deep/ .ivu-table th {
        padding: 10px;
        background-color: transparent;
        color: #333333;
    }
    /deep/ thead .ivu-table-column-center {
        font-size: 23px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
    }
    /deep/ tbody .ivu-table-column-center {
        font-size: 18px;
        padding: 10px 0;
    }
    .moduleConfig-btn {
        text-align: right;
        margin-top: 20px;
        /deep/ .ivu-btn:first-child {
            margin-right: 10px;
        }
    }
}
</style>