<template>
    <div class="header-bar">
        <!-- <sider-trigger
            :collapsed="collapsed"
            icon="md-menu"
            @on-change="handleCollpasedChange"
        ></sider-trigger> -->
        <!--<div class="title">{{ this.$route.meta.pageTitle }}</div>-->
        <div class="title">中南地区稻米供应链重金属风险快速预警及防控系统</div>
        <div class="custom-content-con">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import siderTrigger from './sider-trigger'
import customBreadCrumb from './custom-bread-crumb'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  components: {
    siderTrigger,
    customBreadCrumb
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>
