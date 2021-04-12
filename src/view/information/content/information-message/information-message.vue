<template>
<div>
 <div class="information-show">
      <h2>{{getinformationmessage.title}}</h2>
      <p>简介：{{getinformationmessage.brief}}</p>
      <p>经营范围：{{getinformationmessage.operatingScope}}</p>
    </div>
     <div class="information-show-img">
       <div  v-for="(item,index) in getinformationmessage.images" 
             :key="index"  
             class="information-img-size"
        >
          <img :src="`http://39.107.140.235:28881${item}`"/>
        </div>
    </div>
</div>
   
</template>

<script>
  export default {
    name: "information-message",
    props: {
      usersTab: Array,
      getinformationmessage: Object
    }
  }
</script>

<style lang="less" scoped>
  @import "./information-message.less";
</style>
