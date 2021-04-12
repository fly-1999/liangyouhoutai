<template>
 <div class="image-view">

<!-- 图片 -->
 <div class="view">
  <div class="item" v-for="(item, index) in imgBase64" :key="index">
  <span class="cancel-btn" @click="delImg(index)">x</span>
  <img :src="item">
  </div>
 </div>
 <!-- 按钮 -->
 <div class="addbox">
  <input :disabled="imgBase64.length===3" type="file" @change="getImgBase" :accept="this.accept">
  <dl>
    <dt><img src="@/assets/images/information/information-add-image.png"></dt>
    <dd class="setpaper">0-3张</dd>
    <dd v-show="this.owntype" class="setjpg">支持JPG格式</dd>
  </dl>
 </div>
 </div>
</template>
<script>
 export default {
 name: 'imageView',
 props:{
    accept:{
       type:String
    },
    owntype:{
       type:Boolean
    }
 },
 data (){
  return {
  imgBase64:[] ,//存储img base64的值将值传给后端处理
  isclose:false,
  files:[]
  }
 },
 methods: {
  //获取图片base64实现预览
  getImgBase(e){
     if(e.target.files[0].size>1048576 ){
      alert('图片太大')
      return
     }
      this.files.push(e.target.files[0])    
      //转base64 渲染图片
   for(let i=0;i<e.target.files.length;i++){
      var event = event || window.event;
      var file = event.target.files[i];
      var reader = new FileReader();
      //转base64
      reader.onload =(e)=>this.imgBase64.push(e.target.result);
      reader.readAsDataURL(file);
   }
   //给父组件图片
    this.$emit('file_img', this.files)
  },
  //删除图片
  delImg(index){
   //删除预览
   this.imgBase64.splice(index,1);
   //删除图片文件
   this.files.splice(index,1);
  }
 }
 
 }
</script>
<style scoped>
 .image-view{
    width:100%;

 }
 .image-view .addbox{
    float:left;
    position:relative;
    height:115px;
    width:115px;
    margin-bottom:20px;
    margin-left: 88px;
    text-align:center;
 }
 .image-view .addbox input{
    position:absolute;
    left:0;
    height:115px;
    width:115px;
    opacity:0;
    z-index: 2;
    cursor: pointer;
 }
  .image-view .addbox img{
      width: 100%;
      height: 100%;
      position: relative;
    
  }
    .setpaper{
        position: absolute;
        top: 74px;
        left: 36px;
        font-size: 19px;
    }
    .setjpg{
        width: 115px;
        position: absolute;
        top: 124px;
        left: 0;
        font-size: 19px;
    }
 .image-view .addbox .addbtn{
    float:left;
    height:115px;
    width:115px;
    line-height:115px;
    font-size:40px;
 }
 .item{
      position:relative;
      height:110px;
      width:110px;
      float: left;
      margin:0 10px;
   }
  .item img{
      width: 100%;
      height: 100%;
  }
.image-view .item .cancel-btn{
    display: block;
    position:absolute;
    right:0;
    top:0;
    width:20px;
    height:20px;
    color:#fff;
    line-height:20px;
    text-align:center;
    background:#1F88E5;
    border-radius:10px;
    cursor:pointer;
 }
</style>
