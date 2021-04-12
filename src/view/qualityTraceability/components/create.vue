<template>
    <div class="create">
        <h4>基本信息</h4>
        <Form ref="formInline" :model="formData" :label-width="120">
            <FormItem label="出发时间:">
                <Input type="text" v-model="formData.departureTime" class="w250" />
            </FormItem>
            <FormItem label="抵达时间:">
                <Input type="text" v-model="formData.arrivalTime" class="w250" />
            </FormItem>
            <FormItem label="出发地:">
                <Input type="text" v-model="formData.departureAddr" class="w250" />
            </FormItem>
            <FormItem label="到达地:">
                <Input type="text" v-model="formData.arrivalAddr" class="w250" />
            </FormItem>
            <FormItem label="车牌号:">
                <Input type="text" v-model="formData.vehiclePlate" class="w250" />
            </FormItem>
            <FormItem label="司机姓名:">
                <Input type="text" v-model="formData.driverName" class="w250" />
            </FormItem>
            <FormItem label="联系方式:">
                <Input type="text" v-model="formData.driverContact" class="w250" />
            </FormItem>
            <h4>基本信息</h4>
            <FormItem label="货物名称:">
                <Input type="text" v-model="formData.cargoName" class="w250" />
            </FormItem>
            <FormItem label="数量:">
                <Input type="text" v-model="formData.quantity" class="w250" />
            </FormItem>
            <FormItem label="批次数量:">
                <Input type="text" v-model="formData.productCode" class="w250" />
            </FormItem>
            <FormItem style="text-align:right;margin-bottom:0">
                <Button
                    type="primary"
                    @click="handleSubmit('formInline')"
                    style="margin-right:10px"
                    >确定</Button
                >
                <Button @click="handleCancel">取消</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
export default {
    name: "create",
    props: {
        formData: {
            type: Object,
            default: function() {
                return {
                    time: ""
                };
            }
        },
        type: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    watch: {
        formData(v) {
            if (!this.type) this.$emit("event-init");
        }
    },
    methods: {
        handleSubmit(e) {
            this.$emit("create-submit", this.formData);
        },
        handleCancel() {
            this.$emit("create-cancel");
        }
    }
};
</script>
<style lang="less" scoped>
.create {
    padding: 20px;
    .w250 {
        width: 250px;
    }
    h4 {
        font-size: 21px;
        margin-bottom: 10px;
    }
    /deep/.ivu-form-item-label {
        font-size: 15px;
    }
}
</style>

