<template>
  <div class="information-edit">
    <!--标题-->
    <div class="information-title">
      <span>标题:</span><span><Input v-model="information_title" style="width: 426px;height: 46px;" type="text" placeholder="请输入"/></span>
    </div>
    <!--简介-->
    <div>
      <span>简介:</span><span><Input v-model="information_content" :rows='4' type="textarea" placeholder="请输入"/></span>
    </div>
    <!--经营范围-->
    <div>
      <span>经营范围:</span><span><Input v-model="information_area" :rows='4'  type="textarea" placeholder="请输入"/></span>
    </div>
    <!--图片上传-->
    <div>
      <span>图片上传:</span>
   <update-img ref="fileImg" @file_img='file_img' :owntype='owntype'></update-img>
      
    </div>
    <!--确认-->
    <div>
      <Button @click="information_edit_cancel">取消</Button>
      <Button @click="information_edit_sure">确认</Button>
    </div>
  </div>

  
</template>

<script>
import UpdateImg from './components/UpdateImg'
  export default {
    name: "information-edit",
    components:{
        UpdateImg
    },
    props: {
      getinformationmessage: Object
    },
    data(){
      return{
        //基地标题
        information_title:'',
       //基地内容
        information_content:'',
        //基地范围
        information_area:'',
        //图片
        fileimg:'',
        out:false,
        //是否显示下面的支持
        owntype:false
      }
    },
    activated() {
      this.information_title = this.getinformationmessage.title
      this.information_content = this.getinformationmessage.brief
      this.information_area = this.getinformationmessage.operatingScope
    },
    methods:{
      file_img(file_img){
        this.fileimg=file_img
      },
      //取消
      information_edit_cancel(){
        //内容为空
        this. information_title='',
        this. information_content='',
        this. information_area='',
        //图片为空
        this.$refs.fileImg.imgBase64=[]
        this.$emit('edit_cancel', 'select0')
      },
      //确认
      information_edit_sure(){
        let fd  = new FormData();
        if(!this.information_title || !this.information_content || !this.information_area || this.fileimg.length === 0) {
          if(!this.information_title) {
            this.$Message.error('请输入标题');
          }
          if(!this.information_content) {
            this.$Message.error('请输入简介');
          }
          if(!this.information_area) {
            this.$Message.error('请输入经营范围');
          }
          if(this.fileimg.length === 0) {
            this.$Message.error('请选择图片');
          }
          return
        }
        for(let i=0;i<this.fileimg.length;i++){
          fd.append("files", this.fileimg[i]);
        }
        fd.append("title", this.information_title);
        fd.append("brief", this.information_content);
        fd.append("scope", this.information_area);
        this.$api.information.setinformationedit(fd).then(res => {
          console.log(res);
          if(res == 'success') {
             alert('编辑成功')
              //内容为空
              this. information_title='',
              this. information_content='',
              this. information_area='',
              //图片为空
              // this.files=[]
              this.fileimg=[]
              this.$refs.fileImg.imgBase64=[]
              //传数据返回首页
              this.$emit('edit_cancel', 'select0')
              location.reload()
          }
        })
      }
    }
  }
</script>

<style lang="less">
  @import "./information-edit.less";
</style>
