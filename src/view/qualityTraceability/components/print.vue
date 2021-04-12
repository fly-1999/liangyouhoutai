<template>
    <div class="print">
        <Form ref="formData1" v-if="chooseType" :model="formData1" class="print-form" :rules="ruleInline1">
            <FormItem prop="batch">
                <Select v-model="formData1.batch" class="w415">
                    <Option
                        v-for="item in list"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                    >
                </Select>
            </FormItem>
            <div class="cnotent">
                <FormItem prop="number">
                    <span>打印标签数量: </span>
                    <Input v-model.number="formData1.number" class="input" />
                </FormItem>
                <div class="button">
                    <Button @click="choose">选择模板</Button>
                </div>
            </div>
        </Form>
        <Form ref="formData2" class="template" v-else  :model="formData2" :rules="ruleInline2">
            <p>请选择模板</p>
            <FormItem prop="model">
                <RadioGroup v-model="formData2.model" vertical>
                    <Radio label="1">
                        <table class="print-mould" ref="print" id="print">
                            <tr>
                                <td class="print-mould-title" colspan="2">中南海地区稻米供应链</td>
                            </tr>
                            <tr>
                                <td class="print-mould-qc" rowspan="3"><div ref="qrCode"></div></td>
                                <td class="print-mould-word">批次编号:{{formData1.batch}}</td>
                            </tr>
                            <tr>
                                <td class="print-mould-word">产品名称:{{productName}}</td>
                            </tr>
                            <tr>
                                <td class="print-mould-word">全程可追溯，放心不是一点点</td>
                            </tr>
                        </table>
                    </Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <div class="button">
                    <Button
                        @click="submit"
                        class="results"
                        style="margin-right:10px"
                        >确认</Button
                    >
                    <Button @click="cancel">取消</Button>
                </div>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
    name: "print",
    data() {
        return {
            formData1: {
                batch: "",
                number: ""
            },
            productName: "",
            list: [
                {
                    value: "001",
                    label: "001"
                },
                {
                    value: "002",
                    label: "002"
                },
                {
                    value: "003",
                    label: "003"
                }
            ],
            chooseType: true,
            formData2: {
                model: "",
            },
            ruleInline1: {
                batch: [
                    {required: true, message: '请选择批次', trigger: 'blur'}
                ],
                number: [
                    {type: 'number', required: true, message: '请输入正确的数量', trigger: 'blur'},
                ]
            },
            ruleInline2: {
                model: [
                    {required: true, message: '请选择模板', trigger: 'change'}
                ]
            }
        };
    },
    beforeDestroy() {
        this.chooseType = false;
    },
    methods: {
        choose() {
            this.$refs.formData1.validate((val) => {
                if(val) {
                    this.chooseType = false;
                    setTimeout(() => {
                        new QRCode(this.$refs.qrCode, {
                            width: 100,
                            height: 100, // 高度
                            text: `${location.protocol}//${location.host}/#/label/${this.formData1.batch}` // 二维码内容
                        })
                    },100)
                    this.$api.qualityTraceability.getChainData(this.formData1.batch).then(res => {
                        this.productName = res.productName
                    })
                }
            })
        },
        submit() {
            this.$refs.formData2.validate((val) => {
                if(val) {
                    let qcCanvas = document.querySelector("canvas")
                    if(qcCanvas) {
                        qcCanvas.parentNode.removeChild(qcCanvas)
                    }
                    this.$print(this.$refs.print, "中南海地区稻米供应链", parseInt(this.formData1.number));
                }
            })
        },
        cancel() {
            this.chooseType = true;
        },
        getNode() {
            this.$api.qualityTraceability.getAllCode().then(res => {
                this.list = res.map(item => ({
                    value: item,
                    label: item
                }))
            })
        }
    },
    mounted() {
        this.getNode()
    }
};
</script>
<style lang="less" scoped>
.w415{
    width:415px;
}
.print {
    padding: 10px 36px 0 36px;
    .cnotent {
        margin-top: 36px;
        span {
            font-size: 22px;
            vertical-align: bottom;
        }
        .input {
            width: 270px;
        }
        .button {
            text-align: right;
            width: 415px;
            margin-top: 100px;
        }
    }
    .template {
        width: 415px;
        text-align: left !important;
        .template-content {
            width: 100%;
            height: 200px;
        }
        p {
            font-size: 20px;
        }
        /deep/ .ivu-radio-wrapper {
            width: 350px;
            height: 140px;
            margin-bottom: 30px;
        }
        /deep/ .ivu-radio {
            position: absolute;
            top: 5px;
            right: 3px;
        }
        .button {
            width: 415px;
            margin-top: 100px;
        }
    }
}
.print-mould {
    width: 100%;
    max-width: 400px;
    border: 1px solid #E6E6E6;
    &-title {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        color: #000;
    }
    &-qc {
        width: 35%;
        text-align: center;
        vertical-align: middle;
        div {
            display: inline-block;
        }
        /deep/img {
            width: 100%;
            display: inline-block;
        }
    }
}
.print-form {
    text-align: left !important;
}
</style>

