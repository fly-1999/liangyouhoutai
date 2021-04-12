<template>
  <div class="information-offer">
    <!--供应链-->
    <div class="information-offer-line">
      <div @click="lineclicked(index)" v-for="(item,index) in getinformationnode" :key='index'>
        <span :class="item.id===node?'line-click':''">{{item.name}}</span>
        <span v-if='item.id!==getinformationnode.length'>
              <img v-if="item.id!==node" src="../../../../assets/images/information/information-arrow1.svg"/>
              <img v-else src="../../../../assets/images/information/information-arrow2.svg"/>
        </span>
      </div>
    </div>
    <!--批次-->
    <div class="information-offer-search">
      <div>
        <span>批次信息:</span>
        <span><Input placeholder="请输入" @input="inputFun" v-model="information_message"/></span>
      </div>
      <Button v-if="editall" class="edit" @click="search_edit">编辑</Button>
      <Button v-else class="editb" @click="search_back">返回</Button>
      
    </div>
    <!--表格-->
    <div class="information-offer-table">
      <table>
          <tr>
            <th>环节编号</th>
            <th>
              <span v-if="searchedit">{{node}}</span>
              <input ref="input" v-model="productCode" v-else :placeholder="getinformationoffer.productCode"/>
            </th>
          </tr>
          <tr>
            <th>商品名称</th>
            <th>
              <span v-if="searchedit">{{getinformationoffer.productName}}</span>
              <input v-else v-model="productName" :placeholder="getinformationoffer.productName"/>
            </th>
          </tr>
          <tr>
            <th>温度</th>
            <th>
              <span v-if="searchedit">{{getinformationoffer.temperature+getinformationoffer.temperatureUnit}}</span>
              <input v-else v-model="temperature" :placeholder="getinformationoffer.temperature+getinformationoffer.temperatureUnit"/>
            </th>
          </tr>
          <tr>
            <th>湿度</th>
            <th>
              <span v-if="searchedit">{{getinformationoffer.humidity+getinformationoffer.humidityUnit}}</span>
              <input v-else v-model="humidity" :placeholder="getinformationoffer.humidity+getinformationoffer.humidityUnit"/>
            </th>
          </tr>
          <tr>
            <th>实测-镉</th>
            <th>
              <span v-if="searchedit">{{getinformationoffer.realMeasureCadmium+getinformationoffer.realMeasureCadmiumUnit}}</span>
              <input v-else v-model="realMeasureCadmium" :placeholder="getinformationoffer.realMeasureCadmium+getinformationoffer.realMeasureCadmiumUnit"/>
            </th>
          </tr>
          <tr>
            <th>实测-铅</th>
            <th>
              <span v-if="searchedit">{{getinformationoffer.realMeasureLead+getinformationoffer.realMeasureLeadUnit}}</span>
              <input v-else v-model="realMeasureLead" :placeholder="getinformationoffer.realMeasureLead+getinformationoffer.realMeasureLeadUnit"/>
            </th>
          </tr>
          <tr>
            <th>实测-砷</th>
            <th>
              <span v-if="searchedit">{{getinformationoffer.realMeasureArsenic+getinformationoffer.realMeasureArsenicUnit}}</span>
              <input v-else v-model="realMeasureArsenic" :placeholder="getinformationoffer.realMeasureArsenic+getinformationoffer.realMeasureArsenicUnit"/>
            </th>
          </tr>
          <tr>
            <th>预测-定量-镉</th>
            <th>
              <span>{{getinformationoffer.predictQuantitativeCadmium+getinformationoffer.predictQuantitativeCadmiumUnit}}</span>
            </th>
          </tr>
          <tr>
            <th>预测-定量-铅</th>
            <th>
              <span>{{getinformationoffer.predictQuantitativeLead+getinformationoffer.predictQuantitativeLeadUnit}}</span>
            </th>
          </tr>
          <tr>
            <th>预测-定量-砷</th>
            <th>
              <span>{{getinformationoffer.predictQuantitativeArsenic+getinformationoffer.predictQuantitativeArsenicUnit}}</span>
            </th>
          </tr>
          <tr>
            <th>预测-大数据-镉</th>
            <th>
              <span>{{getinformationoffer.predictBigdataCadmium+getinformationoffer.predictBigdataCadmiumUnit}}</span>
            </th>
          </tr>
          <tr>
            <th>预测-大数据-铅</th>
            <th>
              <span>{{getinformationoffer.predictBigdataLead+getinformationoffer.predictBigdataLeadUnit}}</span>
            </th>
          </tr>
          <tr>
            <th>预测-大数据-砷</th>
            <th>
              <span>{{getinformationoffer.predictBigdataArsenic+getinformationoffer.predictBigdataArsenicUnit}}</span>
            </th>
          </tr>
          <tr>
            <th>预测-加权-镉</th>
            <th>
              <span>{{getinformationoffer.predictWeightedCadmium+getinformationoffer.predictWeightedCadmiumUnit}}</span>
            </th>
          </tr>
          <tr>
            <th>预测-加权-铅</th>
            <th>
              <span>{{getinformationoffer.predictWeightedLead+getinformationoffer.predictWeightedLeadUnit}}</span>
            </th>
          </tr>
          <tr>
            <th>预测-加权-砷</th>
            <th>
              <span>{{getinformationoffer.predictWeightedArsenic+getinformationoffer.predictWeightedArsenicUnit}}</span>
            </th>
          </tr>
          <tr>
            <th>等级-环节-镉</th>
            <th>
              <span>{{getinformationoffer.levelWorkingnodeCadmium}}</span>
            </th>
          </tr>
          <tr>
            <th>等级-环节-铅</th>
            <th>
              <span>{{getinformationoffer.levelWorkingnodeLead}}</span>
            </th>
          </tr>
          <tr>
            <th>等级-环节-砷</th>
            <th>
              <span>{{getinformationoffer.levelWorkingnodeArsenic}}</span>
            </th>
          </tr>
          <tr>
            <th>等级-环节-综合</th>
            <th>
              <span>{{getinformationoffer.levelWorkingnodeAll}}</span>
            </th>
          </tr>
          <tr>
            <th>等级-供应链-镉</th>
            <th>
              <span>{{getinformationoffer.levelSupplyChainCadmium}}</span>
            </th>
          </tr>
          <tr>
            <th>等级-供应链-铅</th>
            <th>
              <span>{{getinformationoffer.levelSupplyChainLead}}</span>
            </th>
          </tr>
          <tr>
            <th>等级-供应链-砷</th>
            <th>
              <span>{{getinformationoffer.levelSupplyChainArsenic}}</span>
            </th>
          </tr>
          <tr>
            <th>等级-供应链-综合</th>
            <th>
              <span>{{getinformationoffer.levelSupplyChainAll}}</span>
            </th>
          </tr>
      </table> 
    </div>

    <div class="information-offer-sure" v-show="!editall">
      <Button @click="search_back">取消</Button>
      <Button @click="offerSure">确认</Button>
    </div>
  </div>
</template>

<script>
  let allnodecode={}
  let changedata={}
  export default {
    name: "information-offer",
    props:{
      informationnode:{
        type:Array | String
      },
      informationoffer:{
        type:Object | String
      }
    },
    data(){
      return{
        searchedit:true,
        timer:'',
        // 环节的数据
        getinformationnode:this.informationnode,
        //点击返回
        editall:true,
        //批次信息
        information_message:'',
        //环节信息
        node_message:'',
        //环节
        node:1,
        //批次
        code:1,
        //环节表格数据
        getinformationoffer:this.informationoffer,
        //环节表格数据2
        getinformationoffer2:'',
        //更改表格数据
        productCode:'',
        productName:'',
        temperature:'',
        humidity:'',
        realMeasureCadmium:'',
        realMeasureLead:'',
        realMeasureArsenic:'',
        //判断是否是有数字发出更改
        letter:true
      }
    },
    mounted(){
      this.getcodenode() 
    },
    methods:{
      //获取单位和数字
       getnumber(str){
         //若没有数字则退出
         if(/^\d+/.test(str)){
           
            if(str){
               return str.match(/\d+/g).join('.')
            }
            else{
              return 0
            }
            
         }else{
            alert('输入错误')
           this.letter=false
             
         }     
      },
      getunnumber(str){
        if(/^\d+/.test(str)){
            if(str){
              return str.replace(str.match(/\d+/g).join('.'),'')
            }
            else{
              return ''
          } 
          
         }else{
           this.letter=false 
         }    
      },
      //消除v-model
      cancelmodel(){
        this.productCode=''
        this.productName='',
        this.temperature='',
        this.humidity='',
        this.realMeasureCadmium='',
        this.realMeasureLead='',
        this.realMeasureArsenic=''
      },
      //获取环节表格数据
      getcodenode(){
        allnodecode.node=this.node
        allnodecode.code=this.code
         this.$api.information.getinformationoffer(allnodecode).then(res=>{
           if(res){
            this.getinformationoffer=res
            this.productCode=res.productCode
            this.productName=res.productName
            this.temperature=res.temperature+res.temperatureUnit
            this.humidity=res.humidity+res.humidityUnit
            this.realMeasureCadmium=res.realMeasureCadmium+res.realMeasureCadmiumUnit
            this.realMeasureLead=res.realMeasureLead+res.realMeasureLeadUnit
            this.realMeasureArsenic=res.realMeasureArsenic+res.realMeasureArsenicUnit
           }
            
        }); 
        this.getinformationoffer2={...this.getinformationoffer}
      },
      //环节点击的index
      lineclicked(index){
        this.node=index+1;
        this.getcodenode()     
    },
      // 点击编辑
      search_edit(){
        this.searchedit=false;
        this.editall=false
        setTimeout(()=>this.$refs.input.focus(),100);
        this.getcodenode()
        
      },
      //点击返回//取消编辑
      search_back(){
        this.getcodenode()
        this.editall=true;
        this.searchedit=true;
        this.getinformationoffer=this.getinformationoffer2
        this.cancelmodel()
        
      },
      //确认发送
      offerSure(){
        if(this.getinformationoffer.area){
          // changedata.area=this.getinformationoffer.area
          changedata.area=0
        }else{
          changedata.area=0
        }
        
        changedata.humidity=this.getnumber(this.humidity)
        changedata.humidityUnit=this.getunnumber(this.humidity)
        changedata.id=(this.getinformationoffer.productCode-1)*12+this.node+5
        changedata.productCode=this.getinformationoffer.productCode
        changedata.productName=this.productName
        changedata.realMeasureArsenic=this.getnumber(this.realMeasureArsenic)
        changedata.realMeasureArsenicUnit=this.getunnumber(this.realMeasureArsenic)
        changedata.realMeasureArsenic=this.getnumber(this.realMeasureArsenic)
        changedata.realMeasureArsenicUnit=this.getunnumber(this.realMeasureArsenic)
        changedata.realMeasureCadmium=this.getnumber(this.realMeasureCadmium)
        changedata.realMeasureCadmiumUnit=this.getunnumber(this.realMeasureCadmium)
        changedata.realMeasureLead=this.getnumber(this.realMeasureLead)
        changedata.realMeasureLeadUnit=this.getunnumber(this.realMeasureLead)
        changedata.riceSupplyChainNodeId=this.node
        changedata.temperature=this.getnumber(this.temperature)
        changedata.temperatureUnit=this.getunnumber(this.temperature)
        if(this.letter==false){
          this.letter=true
        }else{
            this.$api.information.changeinformationoffer(changedata).then(res=>{
            console.log(res);
            if(res=='success'){
              this.getcodenode()
            }
        }); 
        this.editall=true;
        this.searchedit=true;
        }
       
    
      },
      //防抖
      inputFun(e){
        if(this.information_message!=''){
           clearTimeout(this.Timeid)
            this.Timeid=setTimeout(() => {
              if(!/^[0-9]*$/.test(e)){
                alert('输入不规范')
                return 
               }
               if(e>8||e<0){
                alert('无此批次')
                this.information_message=''
                return 
               }
              this.code=e
              this.getcodenode()
            }, 500);
      }
    }
        }
       
  }
</script>

<style lang="less">
  @import "./information-offer.less";
</style>
