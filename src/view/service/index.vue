<template>
    <div class="wrapper">
        <div class="quality-content">
            <div class="border-bottom">
                <div class="servicechangeimg" v-if="userTabList[activeindex] !== '报表管理'"  @click="showView" style="cursor:pointer;display: inline-block;line-height: 5.87rem;" :class="{hideEditing: userTabList[activeindex] === '报表管理'}">
                    <img class="serviceimg"
                        :src=" showName === 'false' ? require('../../assets/images/information/information-edit1.png') : require('../../assets/images/information/information-edit2.png')"
                    />
                </div>
                <div
                    v-for="(data, index) in userTabList"
                    :key="index"
                    class="tab"
                    :class="activeindex === index && showName === 'false' ? 'active' : 'activeNo'"
                    @click="(activeindex = index), active('select' + index)"
                >
                    {{ data }}
                </div>
            </div>

            <keep-alive>
                <component
                    v-bind:is="tabView"
                    :showName="showName"
                    v-on:childByValue="childByValue"
                ></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import select2 from "./component/statement";
import select0 from "./component/information";
export default {
    name: "index",
    components: { select0, select2 },
    data() {
        return {
            type: "",
            tabList: ["信息公告", "大数据分析", "报表管理"],
            activeindex: 0,
            showName: "false"
        };
    },
    mounted() {
        console.log(this.$route.params, "???????");
        if (this.$route.query.active == 1) {
            this.activeindex = this.userTabList.length-1;
            this.active("select2");
        }
        if(this.userTabList[0] === "大数据分析" && this.$route.params.side) {
            this.$router.push("/dataAnalysis");
        }
    },
    methods: {
        childByValue() {
            this.showName = "false";
        },
        showView() {
            this.showName = "true";
        },
        active(tab) {
            this.showName = "false"
            if (this.userTabList[this.activeindex] === "大数据分析") {
                this.$router.push("/dataAnalysis");
            }
        },
        handleFullscreen(v) {
            if (v === 0) return;
        }
    },
    computed: {
        userTabList() {
            let access = this.$store.state.user.access.service
            if(!access) return this.tabList
            return this.tabList.filter(item => {
                if(item === "信息公告" && access.find(item2 => item2 === "信息公告")) return true
                if(item === "大数据分析" && access.find(item2 => item2 === "大数据分析")) return true
                if(item === "报表管理" && access.find(item2 => item2 === "报表管理")) return true
                return false
            })
        },
        tabView() {
            if(this.userTabList[this.activeindex] === "信息公告") {
                return "select0"
            }else if(this.userTabList[this.activeindex] === "大数据分析") {
                return ""
            }else if(this.userTabList[this.activeindex] === "报表管理") {
                return "select2"
            }
        }
    }
};
</script>

<style scoped lang="less">
.wrapper {
    /*padding: 20px;*/
    height: 100%;
    /deep/.ivu-tabs-nav {
        font-size: 30px;
        font-weight: bold;
    }
    /deep/.ivu-tabs-ink-bar {
        background: none;
    }
    .quality-content {
        /*padding: 20px;*/
        padding-bottom: 40px;
        width: 100%;
        min-height: 100%;
        background: #fff;
        position: relative;
        .border-bottom {
            height: 86px;
            align-items: center;
            padding-left: 37px;
            border-bottom: 1px solid #e6e6e6;
            /*margin: 0 15px;*/
            .servicechangeimg{
               line-height: 86px;
                .serviceimg{
                margin-right: 50px;
                // display: block;
                display: inline-block;
                height:33px;
                width:30px;
                margin-bottom: -4px;
            }
            }
            
        }
        .tab {
            line-height: 5.87rem;
            font-size: 30px;
            font-weight: bold;
            margin-right: 51px;
            display: inline-block;
            /*margin:19px 43px 21px 24px;*/
            cursor: pointer;
            font-family: Adobe Heiti Std;
            color: #333333;
        }
        .tab.active {
            color: #1f88e5;
        }
        .qulity-button {
            float: right;
            margin: 15px 0 10px 0;
        }
    }
}
.hideEditing {
    display: none;
}
</style>
