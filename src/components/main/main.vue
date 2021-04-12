<template>
    <Layout
        style="height: 100%"
        class="main"
        :class="{ 'ie9-layout': checkIE9() }"
    >
        <Sider
            hide-trigger
            collapsible
            :collapsed-width="64"
            v-model="collapsed"
            class="left-sider"
            :style="{ overflow: 'hidden' }"
        >
            <side-menu
                ref="sideMenu"
                :active-name="$route.name"
                :collapsed="collapsed"
                @on-select="turnToPage"
                :menu-list="menuList"
            >
                <div class="logo-con"></div>
            </side-menu>
        </Sider>
        <Layout>
            <Header class="header-con">
                <header-bar
                    :collapsed="collapsed"
                    @on-coll-change="handleCollapsedChange"
                >
                    <!-- <fullscreen
                        v-model="isFullscreen"
                        style="margin-right: 10px;"
                    /> -->
                    <Icon
                        type="md-power"
                        size="32"
                        style="line-height:5rem;cursor: pointer;"
                        @click="goOut"
                        class="powerIcon"
                    />
                </header-bar>
            </Header>
            <div
                class="content"
                :class="{
                    'no-padding':
                        this.$route.meta.title === '主页'
                }"
            >
                <router-view />
            </div>
        </Layout>
    </Layout>
</template>
<script>
import SideMenu from "./components/side-menu";
import HeaderBar from "./components/header-bar";
import User from "./components/user";
import Fullscreen from "./components/fullscreen";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { getNewTagList, setToken, setPermission } from "@/libs/util";
import routers from "@/router/routers";
import "./main.less";
export default {
    name: "Main",
    components: {
        SideMenu,
        HeaderBar,
        Fullscreen,
        User
    },
    data() {
        return {
            collapsed: false,
            isFullscreen: false
        };
    },
    computed: {
        ...mapGetters(["errorCount"]),
        tagNavList() {
            return this.$store.state.app.tagNavList;
        },
        tagRouter() {
            return this.$store.state.app.tagRouter;
        },
        userAvatar() {
            return this.$store.state.user.avatarImgPath;
        },
        cacheList() {
            const list = [
                "ParentView",
                ...(this.tagNavList.length
                    ? this.tagNavList
                          .filter(item => !(item.meta && item.meta.notCache))
                          .map(item => item.name)
                    : [])
            ];
            return list;
        },
        menuList() {
            return this.$store.getters.menuList;
        },
        local() {
            return this.$store.state.app.local;
        },
        hasReadErrorPage() {
            return this.$store.state.app.hasReadErrorPage;
        },
        unreadCount() {
            return this.$store.state.user.unreadCount;
        }
    },
    methods: {
        ...mapMutations(["setTagNavList", "setHomeRoute", "closeTag"]),
        ...mapActions(["handleLogin", "getUnreadMessageCount"]),
        turnToPage(route) {
            if(route === "综合服务") route = {name: "综合服务", params: { side: true }}
            let { name, params, query } = {};
            if (typeof route === "string") name = route;
            else {
                name = route.name;
                params = route.params;
                query = route.query;
            }
            if (name.indexOf("isTurnByHref_") > -1) {
                window.open(name.split("_")[1]);
                return;
            }
            this.$router.push({
                name,
                params,
                query
            });
        },
        handleCollapsedChange(state) {
            console.log(state, "statestatestatestatestate");
            this.collapsed = state;
        },
        goOut() {
            let that = this;
            this.$Modal.confirm({
                title: "退出登录",
                content: "是否退出登录？",
                okText: "确定",
                cancelText: "取消",
                onOk() {
                    this.$api.login.logout().then(res => {
                        if (res == "log out successful") {
                            setToken("");
                            setPermission("")
                            that.$store.commit("logout")
                            that.$router.push("/login");
                        }
                    });
                }
            });
        },
        checkIE9() {
            if(navigator.appName === "Microsoft Internet Explorer" && navigator.appVersion.match(/10./i)=="10.") {
                document.querySelector("body").style.overflow = "auto"
            }
            if(navigator.appName === "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i)=="9.") {
                document.querySelector("body").style.overflow = "auto"
                return true
            }
            return false;
        }
    },
    watch: {
        $route(newRoute) {
            const { name, query, params, meta } = newRoute;
            this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
            this.$refs.sideMenu.updateOpenName(newRoute.name);
        }
    },
    mounted() {
        /**
         * @description 初始化设置面包屑导航和标签导航
         */
        this.setTagNavList();
        this.setHomeRoute(routers);
        const { name, params, query, meta } = this.$route;

        // 设置初始语言
        // 如果当前打开页面不在标签栏中，跳到homeName页
        // if (!this.tagNavList.find(item => item.name === this.$route.name)) {
        //     this.$router.push({
        //         name: this.$config.homeName
        //     });
        // }
    }
};
</script>

<style >
body {
    overflow-x: hidden !important;
}
.ivu-menu-dark.ivu-menu-vertical :not(.ivu-menu-submenu).ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical
    :not(.ivu-menu-submenu).ivu-menu-submenu-title-active {
    color: #fff !important;
    background: rgba(255, 255, 255, 0.32) !important;
}
.ivu-layout-header {
    width: auto !important;
}
.ie9-layout .content {
    height: 100%;
}
.ie9-layout > .ivu-layout-sider {
    float: left;
    height: 100%;
    width: 154px !important;
    position: fixed;
    min-width: inherit !important;
}
.ie9-layout > .ivu-layout {
    margin-left: 154px;
}
</style>