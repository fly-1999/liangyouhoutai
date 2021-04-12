<template>
    <div class="information">
        <div class="information-head">
            <div v-show="editStyel.showedit">
                <img
                    @click="active('f')"
                    v-if="editStyel.edited"
                    src="../../assets/images/information/information-edit1.png"
                />
                <img
                    v-else
                    src="../../assets/images/information/information-edit2.png"
                />
            </div>
            <div
                :class="activeindex === index ? 'information-clicked' : ''"
                @click="(activeindex = index), active(index)"
                v-for="(item, index) in usersTab"
                :key="index"
                v-has="{ type: 'sample' }"
            >
                {{ item.name }}
            </div>
        </div>
        <!--information子页面跳转-->
        <keep-alive>
            <component
                @edit_cancel="edit_cancel"
                v-bind:is="tabView"
                :informationnode='informationnode'
                :informationoffer='informationoffer'
                :usersTab="usersTab"
                :getinformationmessage="getinformationmessage"
            ></component>
        </keep-alive>
    </div>
</template>

<script>
import select2 from "./content/information-son/information-son";
import select1 from "./content/information-offer/information-offer";
import select0 from "./content/information-message/information-message";
import selectf from "./content/information-edit/information-edit";
export default {
    name: "information",
    components: { selectf, select0, select1, select2 },
    data() {
        return {
            // tab的内容
            tab: [
                { name: "基地信息", path: "/information/information-message" },
                { name: "供应链信息", path: "/information/information-offer" },
                { name: "子系统设置", path: "/information/information-son" }
            ],
            //当前路径的index(usersTab的index)，以及要跳转的默认页面,如果为编辑写成f
            activeindex: 0,
            informationnode:'',
            informationoffer:'',
            getinformationmessage: {}

        };
    },
    created(){
      if(this.usersTab.find(item => item.name === "基地信息")) {
        //基地信息
        this.$api.information.getinformationmessage({pageNum:0,pageSize:0}).then(res=>{
          this.getinformationmessage=res.basements.pop()
        });
      }
    },
    mounted(){
        if(this.usersTab.find(item => item.name === "供应链信息")) {
            //环节的数据
            this.$api.information.getinformationnode().then(res=>{
                this.informationnode=res
            }); 
            //获取环节表格数据
            this.$api.information.getinformationoffer({node:1,code:1}).then(res=>{
                this.informationoffer=res
            }); 
        }
    },
    computed: {
        //通过根据权限过滤的tab
        usersTab() {
            let access = this.$store.state.user.access.information
            if(!access) return this.tab
            return this.tab.filter(item1 => {
                if(access.find(item2 => item2 === item1.name)) {
                    return true
                }
                if(access.find(item2 => item2 === "子系统信息") && item1.name === "子系统设置") {
                    return true
                }
                return false
            })
        },
        //根据activeindex显示不同的tabView
        tabView() {
            if(this.activeindex === "f") {
                return "selectf"
            }else {
                let findIndex = this.tab.findIndex(item => item.name === this.usersTab[this.activeindex].name)
                if(findIndex === -1) {
                    return "selectf"
                }else {
                    return "select"+findIndex
                }
            }
        },
        //编辑样式信息
        editStyel() {
            if(this.activeindex === "f") {
                return {
                    edited: false,
                    showedit: true
                }
            }else if (this.usersTab[this.activeindex].name === "供应链信息") {
                return {
                    edited: false,
                    showedit: false
                }
            }else if(this.usersTab[this.activeindex].name === "子系统设置"){
                 return {
                    edited: false,
                    showedit: false
                }
                
            }else {
                return {
                    edited: true,
                    showedit: true
                }
            }
        }
    },
    methods: {
        //判断子页面跳转时需要的样式以及需要跳转的tabView
        active(index) {
            this.activeindex = index
        },
        //编辑点击取消所传过来的跳转
        edit_cancel(edit_cancel) {
            this.activeindex = 0  
        }
    }
};
</script>

<style lang="less" scoped>
@import "./information.less";
</style>
