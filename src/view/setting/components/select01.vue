<template>
    <div>
        <div class="setBox" slot="select01">
            <div class="setListOne">
                <Table
                    border
                    :columns="seTitles"
                    :data="AuthdataRange[page - 1]"
                >
                    <template slot-scope="{ row }" slot="name">
                        {{ row.name }}
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button
                            @click="setAction(index)"
                            :size="buttonSize"
                            type="default"
                            >修改</Button
                        >
                    </template>
                </Table>
                <div class="PadgeBox">
                    <Page
                        :total="dataCount"
                        :page-size="pageSize"
                        :current="page"
                        show-total
                        show-elevator
                        class="page"
                        @on-change="changePage"
                    ></Page>
                </div>
                <!--  -->
                <!-- 操作弹窗 -->
                <Modal
                    footer-hide
                    :styles="{ width: '25%', minWidth: '300px' }"
                    v-model="modal10"
                    :transfer="false"
                >
                    <div class="ActModal">
                        <p class="ActModalP">名称：{{ this.ActTitle }}</p>
                        <p class="ActModalP mt10">权限管理：</p>
                        <CheckboxGroup v-model="role">
                            <Checkbox label="企业">企业</Checkbox>
                            <Checkbox label="监管机构">监管机构</Checkbox>
                            <Checkbox label="消费者">消费者</Checkbox>
                        </CheckboxGroup>
                    </div>
                    <Divider />
                    <div class="actButBox">
                        <Button
                            class="actBut"
                            type="primary"
                            @click="setActSubmit()"
                            >确定</Button
                        >
                        <Button class="actBut" @click="setActCancel()"
                            >取消</Button
                        >
                    </div>
                </Modal>
            </div>
        </div>
      
    </div>
</template>

<script>
import api from "@/api/index.js";
const { setting } = api;
export default {
    data() {
        return {
            page: 1,
            pageSize: 9,
            buttonSize: "large",
            modal10: false,
            ActTitle: "",
            role: ["企业", "监管机构"],
            roleBefor: [],
            seTitles: [
                {
                    title: "名称",
                    key: "name",
                    slot: "name"
                },
                {
                    title: "管理限制",
                    key: "role"
                },
                {
                    title: "操作",
                    slot: "action",
                    width: 250,
                    align: "center"
                }
            ],
            setAuthdata: [
                {
                    name: "",
                    role: ""
                }
            ],
            roleId: 0,
            roleIDBox: {
                企业: 1,
                监管机构: 2,
                消费者: 3
            },
            permissionId: 0,
            // permissionId 的信息
            permisId: {
                基地信息: 1,
                供应链信息: 2,
                子系统信息: 3,
                预测加权配置: 4,
                危险物风险门限值: 5,
                供应链权重: 6,
                物流跟踪: 7,
                标签打印: 8,
                溯源查询: 9,
                信息公告: 10,
                大数据分析: 11,
                报表管理: 12,
                基本设置: 13,
                用户管理: 14
            }
        };
    },
    methods: {
        changePage(val) {
            this.page = val;
        },
        // 点击修改操作触发获取当行数据
        setAction(index) {
            this.modal10 = true;
            this.ActTitle = this.AuthdataRange[this.page - 1][index].name;
            // 获取实时的role
            this.role = this.AuthdataRange[this.page - 1][index].role.split(
                "/"
            );
            // 找到permissionId
            this.permissionId = this.permisId[this.ActTitle];
            this.roleBefor = this.role;
            // console.log(this.permissionId);
        },

        setActSubmit() {
            if (this.role == "") {
                alert("权限用户不能为空");
                return;
            }
            let addArr = [];
            let deteleArr = [];
            // 检查增加
            for (let i = 0; i < 3; i++) {
                if (this.role[i] != undefined) {
                    let PermissID = {};
                    // 判断现在role是否存在于之前的role中，不存在就发送post请求
                    if (this.roleBefor.indexOf(this.role[i]) == -1) {
                        this.roleId = this.roleIDBox[this.role[i]];
                        PermissID.permissionId = this.permissionId;
                        PermissID.roleId = this.roleId;
                        addArr.push(PermissID);
                        // 发送post请求
                        // setting.postUpPermiss(PermissID);
                        // setting.postUpPermiss(this.PermissPost).then(res=>{
                        //   console.log(res);
                        // });
                    }
                }
            }
            // 检查删除
            for (let j = 0; j < 3; j++) {
                if (this.roleBefor[j] != undefined) {
                    let PermissID = {};
                    //  判断之前的role是否存在于现在的role中，不存在就发送del操作
                    if (this.role.indexOf(this.roleBefor[j]) == -1) {
                        this.roleId = this.roleIDBox[this.roleBefor[j]];
                        // console.log(this.roleId);
                        PermissID.permissionId = this.permissionId;
                        PermissID.roleId = this.roleId;
                        deteleArr.push(PermissID);
                        // 发送delete请求
                        // setting.deletePermiss(PermissID);
                    }
                }
            }
            this.modal10 = false;
            Promise.all([
                ...addArr.map(item => setting.postUpPermiss(item)),
                ...deteleArr.map(item => setting.deletePermiss(item))
            ]).finally(() => {
                location.reload();
            });
        },
        setActCancel() {
            this.modal10 = false;
        },
        // 对get请求过来的数据做处理，处理成iview使用的数据
        getAuthdata(data) {
            let result = [];
            for (let i in data) {
                let item = {};
                let itemStr = "";
                item.name = i;
                data[i].forEach(item => {
                    itemStr += item.desc + "/";
                });
                item.role = itemStr.slice(0, -1);
                result.push(item);
            }
            return result;
        }
    },
    mounted() {
        setting.getPermiss().then(res => {
            this.setAuthdata = this.getAuthdata(res);
        });
    },
    computed: {
        dataCount() {
            return this.setAuthdata.length;
        },
        AuthdataRange() {
            let rusult = [];
            let pageArr = [];
            this.setAuthdata.forEach((item, index) => {
                pageArr.push(item);
                if (
                    pageArr.length >= 9 ||
                    index === this.setAuthdata.length - 1
                ) {
                    rusult.push(pageArr);
                    pageArr = [];
                }
            });
            return rusult;
        }
    }
};
</script> 

<style lang='less'>

.setListOne {
    margin-top: 25px;
    min-height: 580px;
    padding-bottom: 60px;
    position: relative;
    .ivu-table-header {
        th {
            height: 55px;
            font-size: 20px;
            font-family: Adobe Heiti Std;
            font-weight: normal;
            color: #333333;
            background-color: #fff;
            text-align: center;
        }
    }
    .ivu-table-tbody td {
        height: 60px;
        text-align: center;
        font-size: 18px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #999999;
    }
    .ivu-table-cell {
        button {
            width: 80px;
            height: 34px;
            font-size: 16px;
            border-radius: 8px;
            font-family: Adobe Heiti Std;
            font-weight: normal;
            background-color: #e7e7e7;
            color: #9a9a9a;
            padding: 0;
            box-shadow: 0 0 0 2px transparent;
            span {
                display: block;
                width: 100%;
                height: 100%;
                line-height: 32px;
            }
        }
        button:hover {
            background-color: #1f88e5;
            color: #fff;
        }
    }
}
.mt10 {
    margin-top: 10px;
}
.ActModal {
    padding: 15px;
    padding-left: 40px;
    margin-top: 15px;
    .ActModalP {
        font-size: 26px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #333333;
    }
}
// 多选框
.ivu-checkbox-group {
    margin-left: 33%;
    .ivu-checkbox-wrapper {
        display: block;
        font-size: 23px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #999999;
        margin-top: 15px;
    }
    .ivu-checkbox-inner {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        box-shadow: 0 0 0 2px transparent;
    }
    .ivu-checkbox-inner:after {
        display: block;
        width: 9px;
        height: 16px;
        border-style: solid;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        border-color: #fff;
        background-color: transparent;
        border-radius: 0;
        left: 8px;
        top: 3px;
    }
}
.actButBox:after{
    content: "";
    display: block;
    clear: both;
}
.actBut {
    width: 80px;
    height: 38px;
    text-align: center;
    font-size: 18px;
}
.actBut.ivu-btn.ivu-btn-default:last-of-type {
    float: right;
}
.PadgeBox{
    width: 100%;
    height: 40px;
    // margin-top: 20px;
    position: absolute;
    bottom: 0;
    // position: relative;
}
.page {
    position: absolute;
    bottom: 0px;
    right: 0px;
}
</style>

