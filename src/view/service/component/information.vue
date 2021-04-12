<template>
    <div class="com-Content">
        <div v-show="!releaseView">
            <!--<Button-->
            <!--type="primary"-->
            <!--@click="releaseView = true"-->
            <!--style="margin: 20px;"-->
            <!--&gt;发布公告</Button-->
            <!--&gt;-->
            <!--<p>{{ showName }}22222</p>-->
            <div>
                <div class="info_list" v-for="(i,j) in serviceinformation" :key="j">
                    <div>
                    <div style="display: flex">
                        <div class="img-txt">
                            
                        <img :class="'img'+i.images.length" v-for="(i1,j1) in i.images" :src="serviceinformation?`http://39.107.140.235:28881${i1}`:''" :key="j1"/>
                        <!--<img :src="'http://39.107.140.235:28881/'+test" alt="">-->
                    </div>
                    <div class="img-content">
                        {{i.content}}
                    </div>
                    </div>
                    <div class="bottom_in">
                        <p>{{serviceinformation?changetime(i.createdTime):''}}</p>
                        <p>发布人:{{serviceinformation?i.publisherName:''}}</p>
                    </div>
                </div>
                    </div>      
            </div>
            <div class="footer">
                <Page
                    :total="total"
                    @on-change="handleCurrentChange"
                    show-elevator
                    show-total
                    :page-size='PageSize'
                    class="page"
                />
            </div>
        </div>
        <!--发布公告-->
        <div v-show="releaseView" style="margin: 53px 36px">
            <Input
                v-model="content"
                type="textarea"
                size="default"
                :rows="8"
                placeholder="请输入"
            />

            <p style="margin-top: 100px;margin-bottom: 20px;">图片上传:</p>
            <div style="overflow:hidden;height:200px">
            <update-img ref="fileImg" @file_img='file_img' :accept='accept' :owntype='owntype'></update-img>
            </div>
            <div style="float: right">
                <Button
                    type="primary"
                    @click="create()"
                    style="margin-right: 20px"
                    >确定</Button
                >
                <Button @click="childClick">取消</Button>
            </div>
        </div>
    </div>
</template>



<script>
import UpdateImg from '@/view/information/content/information-edit/components/UpdateImg'
import Cookies from 'js-cookie'
export default {
    name: "information",
    components:{
        UpdateImg
    },
    props: {
        showName: String,
        required: true
    },
    data() {
        return {
            type: "",
            releaseView: false,
            // test: "",
            //图片
            fileimg:'',
            //名字
            publisher:'',
            //内容
            content:'',
            //图片格式
            accept:'.jpg',
            owntype:true,
            //信息公告
            serviceinformation:'',
            index:1,
            //总数多少个
            total:0,
            //每页两个
            PageSize:2,
            //判断最后一个
            lastnum:'',
        };
    },
    watch: {
        showName: {
            deep: true, // 深度监听
            handler(newVal, oldVal) {
                console.log(newVal, oldVal);
                if (newVal == "true") {
                    this.releaseView = true;
                } else {
                    this.releaseView = false;
                }
            }
        }
    },
    mounted() {
        //获取列表
        // getInfo() {
        this.$api.service.getInfo({pageNum: this.index, pageSize: this.PageSize}).then(res => {
            this.serviceinformation=res.infoList
            this.$api.service.getInfo({pageNum: res.totalPage, pageSize: this.PageSize}).then(res2 => {
                this.total= res2.totalPage*2-(2-res2.infoList.length)
            })
        });     
        this.publisher=Cookies.get('name')
    },
    methods: {
        //时间戳转日期
        changetime(item){
           let time = new Date(item)
           let y = time.getFullYear();
           let m = time.getMonth()+1;
           let d = time.getDate()-1;
           return y+'-'+m+'-'+d
        },
        //储存图片
        file_img(file_img){
        this.fileimg=file_img
         },
         //取消
        childClick() {
            this.$refs.fileImg.imgBase64=[]
            this.fileimg=''
            this.content=''
            this.$emit("childByValue", this.childValue);
        },
        //获取图片
        inputFileChange(e) {
            // input的@change事件拿到数据
            this.files = e.target.files[0];
            // console.log( e.target.files,' this.files')
            if (e.target.files.length > 3) {
                alert("最多允许3张");
            }
        },
        //判断是否是最后
        selectimg(item){
           if(this.lastnum&&item==this.lastnum){
                return false
            }
            else{
            return true
         }
         },
        
        //创建
        create() {
            if(!this.content || this.fileimg.length === 0) {
                if(!this.content) {
                    this.$Message.error('请输入内容');
                }
                if(this.fileimg.length === 0) {
                    this.$Message.error('请选择图片');
                }
                return
            }
            let fd = new FormData();
            for(let i=0;i<this.fileimg.length;i++){
            fd.append("files", this.fileimg[i]);
             }
            fd.append("publisher",this.publisher);
            fd.append("content", this.content);
         
            this.$api.service.create(fd).then(res => {   
            console.log(res);
                if (res == "success") {
                    alert("创建成功");
                    this.$refs.fileImg.imgBase64=[]
                    this.fileimg=''
                    this.content=''
                    this.releaseView=false
                    location.reload()
                }
            });
           
        },
        // 分页
        handleCurrentChange(e) {
            this.index=e
            this.$api.service.getInfo({pageNum: e, pageSize: this.PageSize}).then(res => {
                this.serviceinformation=res.infoList
            });  
        }
    }
    
};
</script>

<style scoped lang="less">
.tax-box {
    width: 100px;
    text-align: center;
    margin-left: 70px;
    margin-top: -20px;
    color: #b2b4b8;
}
.fileCss {
    border: 1px solid #e6e6e6;
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    position: relative;
    margin-left: 80px;
    input {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        opacity: 0;
    }
}

.uploadImgBtn {
    width: 100px;
    height: 100px;
    cursor: pointer;
    position: relative;
    /*background: url("img/plus.png") no-repeat;*/
    -webkit-background-size: cover;
    background-size: cover;
}

.uploadImgBtn .uploadImg {
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}
//这是一个用做回显的盒子的样式
.pic {
    width: 100px;
    height: 100px;
}
.pic img {
    width: 100%;
    height: 100%;
}

.com-Content {
    /*padding: 15px;*/
    font-size: 14px;
    .info_list {
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 18px;
        position: relative;
        .bottom_in {
            /*float: right;*/
            text-align: right;
            padding-right: 35px;
            font-size: 20px;
            margin-top: -20px;
            color: #666666;
        }
        .img-txt {
            display: inline-block;
            font-size: 20px;
            line-height: 40px;
            margin-top: 55px;
            margin-right: 20px;
            // padding: 0 35px;
            color: #666666;
            height: 238px;
            margin-left: 35px;
            flex-shrink: 0;
            .img1 {
                display: inline-block;
                width: 250px;
                height: 100%;
                margin-right: 20px;
            }
            .img2 {
                display: inline-block;
                width: 250px;
                height: 100%;
                margin-right: 20px;
            }
            .img3 {
                display: inline-block;
                width: 250px;
                height: 100%;
                margin-right: 20px;
            }
        }
        .img-content{
            margin-top: 55px;
            display: inline-block;
            vertical-align: top;
            font-size: 23px;
            color: #666666;
            overflow: hidden;
            text-overflow: ellipsis;
            // float: left;
        }
    }

    .footer {
        text-align: right;
        margin-right: 36px;
        margin-top: 20px;
    }
    /deep/.page{
        position: absolute;
        bottom: 10px;
        right: 15px;
    }
}
</style>
