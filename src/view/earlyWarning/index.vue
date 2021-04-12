<template>
    <div class="wrapper">
        <div class="header">
            <div
                v-for="(data, index) in userTabList"
                :key="index"
                class="tab"
                :class="{ active: activeindex === index }"
                @click="active(index)"
            >
                {{ data }}
            </div>
        </div>
        <Module-config v-if="isShowConfig"></Module-config>
    </div>
</template>

<script>
import ModuleConfig from "./component/module-config";
export default {
    name: "earlyWarning",
    components: { ModuleConfig },
    data() {
        return {
            type: "",
            tabList: ["模型配置", "云平台"],
            activeindex: 0,
        };
    },
    methods: {
        active(index) {
            this.activeindex = index;
            if (index === 1) this.$router.push("/cloud-platform");
        }
    },
    computed: {
        userTabList() {
            let access = this.$store.state.user.access.earlyWarning
            if(!access) return this.tabList
            return this.tabList.filter(item => {
                if(item==="模型配置" && access.length !== 0) return true
                if(item==="云平台" && this.$store.state.user.access.service.find(item => item === "大数据分析")) return true
                return false
            })
            if(access.length === 0) return ["云平台"]
        },
        isShowConfig() {
            let access = this.$store.state.user.access.earlyWarning
            if(!access) return true
            if(access.length === 0) return false
            return true
        }
    },
    mounted() {
        if(!this.isShowConfig) {
            this.$router.push("/cloud-platform")
        }
    }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>