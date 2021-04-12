<template>
  <div class="wrapper setPadding">
    <div class="setHeadName">
      <span
        class="setHeadLi"
        v-for="(tab, index) in userTab"
        :key="index"
        :class="iscur == index ? 'setHeadAc' : 'setHeadNo'"
        @click="(iscur = index), tabChange(index)"
      >
        {{ tab.name }}
      </span>
    </div>

    <!-- keep-alive 避免反复重渲染导致的性能问题 -->
    <div>
      <keep-alive>
        <component v-bind:is="tabView"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import select1 from "./components/select01.vue";
import select2 from "./components/select02.vue";

export default {
  name: "setting",
  components: {
    select1,
    select2,
  },
  data() {
    return {
      iscur: 0,
      tabs: [{ name: "基本设置" }, { name: "用户管理" }],
      //下面这个表示userTab的index
      current: 0,
      isShow: false,
    };
  },
  methods: {
    tabChange: function (index) {
      this.current = index
    },
  },
  computed: {
    userTab() {
      let access = this.$store.state.user.access.setting
      if(!access) return this.tabs
      return this.tabs.filter(item => {
          if(item.name === "基本设置" && access.find(item2 => item2 === "基本设置")) return true
          if(item.name === "用户管理" && access.find(item2 => item2 === "用户管理")) return true
          return false
      })
    },
    tabView() {
      if(this.userTab[this.current].name === "基本设置") {
        return "select1"
      }else {
        return "select2"
      }
    }
  }
};
</script>

<style lang="less">
@import "./setting.less";
</style>
