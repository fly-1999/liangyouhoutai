<template>
    <div class="wrapper">
        <div class="quality-content">
            <div class="quality-header">
                <div
                    v-for="(data, index) in userTabList"
                    :key="index"
                    class="tab"
                    :class="{ active: activeindex === index }"
                    @click="active(index)"
                >
                    {{ data }}
                </div>
                <div class="qulity-button" v-if="userTabList[activeindex] === '物流追踪'">
                    <Button
                        type="primary"
                        style="margin-right:10px"
                        @click="add"
                        v-if="checkMap"
                        >添加</Button
                    >
                    <Button @click="checkMaps">切换</Button>
                </div>
            </div>

            <Table
                class="table"
                :columns="columns"
                :data="dataList"
                border
                v-if="checkMap && userTabList[activeindex] === '物流追踪'"
            >   
                 <template slot-scope="{ row }" slot="departureTime">
                    <p>{{timechange(row.departureTime)[0]}}</p>
                    <p>{{timechange(row.departureTime)[1]}}</p>
                </template>
                <template slot-scope="{ row }" slot="arrivalTime">
                    <p>{{timechange(row.arrivalTime)[0]}}</p>
                    <p>{{timechange(row.arrivalTime)[1]}}</p>
                </template>
                <template slot-scope="{ row ,index}" slot="address">
                    <div class="code" :id="'qrcode'+index">{{setCode({row,index})}} </div> 
                </template>
                <template slot-scope="{ row }" slot="goods">
                    <Button @click="check(row)">查看</Button>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Button
                        type="primary"
                        class="bmr10"
                        @click="edit(row)"
                        >修改</Button
                    >
                    <Button @click="detail(row)">删除</Button>
                </template>
            </Table>
            <Page v-show="checkMap && userTabList[activeindex] === '物流追踪'" 
            :total="total" 
            :page-size='pageSize'
            @on-change="handleCurrentChange"
            show-elevator class="page" />
            <search v-if="userTabList[activeindex] === '溯源查询'"></search>
            <print v-if="userTabList[activeindex] === '标签打印'"></print>
            <div v-show="!checkMap && userTabList[activeindex] === '物流追踪'">
                <div v-if='checkMaps' id="map"></div>
            </div>
        </div>
        <Modal v-model="editDis" footer-hide>
            <Create
                @create-submit="createSubmit"
                @create-cancel="createCancel"
                @event-init="eventInit"
                :type="editDis"
                :formData="currentList"
            ></Create>
        </Modal>
        <Modal
            v-model="detailDis"
            footer-hide
            width="350"
            :closable="false"
            :transfer="false"
        >
            <div>
                <Form :model="formInline">
                    <FormItem style="margin-bottom:10px;text-align:center">
                        <div style="font-size:16px">
                            物品名称 :{{ formInline.cargoName }}
                        </div>
                    </FormItem>
                    <FormItem style="margin-bottom:10px;text-align:center;">
                        <div style="font-size:16px">
                            数量 :{{ formInline.quantity }}
                        </div>
                    </FormItem>
                    <FormItem style="margin-bottom:10px;text-align:center;">
                        <Button @click="closeModal">关闭</Button>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>

<script>
import Create from "./components/create";
import Search from "./components/search";
import Print from "./components/print";
import dayjs from 'dayjs'
import QRCode from 'qrcodejs2'
var img = require("../../assets/images/quality/mapMarket.png");
export default {
    name: "qualityTraceability",
    components: { Create, Search, Print },
    data() {
        return {
            tabList: ["物流追踪", "标签打印", "溯源查询"],
            activeindex: 0,
            columns: [
                {
                    title: "出发时间",
                    slot: "departureTime",
                    align: "center"
                },
                {
                    title: "抵达时间",
                    slot: "arrivalTime",
                    align: "center"
                },
                {
                    title: "出发地",
                    key: "departureAddr",
                    align: "center"
                },
                {
                    title: "到达地",
                    key: "arrivalAddr",
                    align: "center"
                },
                {
                    title: "车牌号",
                    key: "vehiclePlate",
                    align: "center"
                },
                {
                    title: "追溯码",
                    slot: "address",
                    // key:'logisticsCode',
                    align: "center"
                },
                {
                    title: "司机姓名",
                    key: "driverName",
                    align: "center"
                },
                {
                    title: "联系方式",
                    key: "driverContact",
                    align: "center"
                },
                {
                    title: "货物信息",
                    align: "center",
                    slot: "goods"
                },
                {
                    title: "操作",
                    align: "center",
                    slot: "action",
                    minWidth: 30
                }
            ],
            dataList: [
                
            ],
            editDis: false,
            detailDis: false,
            checkMap: false,
            formInline: {
                name: "稻米",
                num: "100"
            },
            currentList: {},
            //每页最多四个
            pageSize:4,
            //初始的第一页
            pageNum:1,
            //总页数
            total:4,
            //辨认添加还是修改
            now:0,
            //地图经纬度
            latd:[],
            lngd:[],
            lata:[],
            lnga:[]
        };
    },
    methods: {
        setCode(v){
            setTimeout(() => {
            //清除二维码
            document.getElementById("qrcode"+v.index).innerHTML = "";
            this.innerVisible = true
            // // 二维码内容,一般是由后台返回的跳转链接,这里是写死的一个链接
            this.qrcode = `${location.protocol}//${location.host}/#/logistics/${v.row.logisticsCode}`
            // console.log('qrcode'+v.id);
            this.qr = new QRCode('qrcode'+v.index, {
            width: 80,
            height: 80, // 高度
            text: this.qrcode // 二维码内容
            })
            }, 50);
            
        },
        //获取当前点击页数
        handleCurrentChange(e){
           this.pageNum=e;
           this.getService();
        },
        //获取物流
        getService(){
             this.$api.qualityTraceability.getservice({pageSize:this.pageSize,pageNum:this.pageNum}).then(res=>{
                //清空地图的地点数据
                    this.latd=[];
                    this.lngd=[];
                    this.lata=[];
                    this.lnga=[];
                 if(res){
                    this.dataList=res.logistics;
                    this.total=res.totalPage*res.pageSize;
                     for(let i=0;i<this.dataList.length;i++){   
                        clearTimeout(time)
                        //获取位置对应的经纬度
                        this.$api.qualityTraceability.getbaidulocation({address:this.dataList[i].departureAddr,output:'json'}).then(res=>{
                            this.latd[i]=res.result.location.lat
                            this.lngd[i]=res.result.location.lng
                        })
                        this.$api.qualityTraceability.getbaidulocation({address:this.dataList[i].arrivalAddr,output:'json'}).then(res=>{
                            this.lata[i]=res.result.location.lat
                            this.lnga[i]=res.result.location.lng
                        }) 
                   var time=setTimeout(()=>{
                       this.initMap();
                    },500)
                    }
            }
        })
    },
        active(index) {
            this.activeindex = index;
        },
        edit(v) {
            this.now=2;
            this.currentList = v;
            this.editDis = true;
            v.arrivalTime=dayjs(v.arrivalTime).format('YYYY-MM-DD HH:mm:ss')
            v.departureTime=dayjs(v.arrivalTime).format('YYYY-MM-DD HH:mm:ss')
        },
        add() {
            this.now=3;
            this.editDis = true;
            
        },
        checkMaps() {
            this.checkMap = !this.checkMap;
        },
        //创建新的物流
        createSubmit(e) {
            if(this.now==3){
               if(e.arrivalTime&&e.departureAddr&&e.cargoName&&e.vehiclePlate&&e.driverName&&e.driverContact&&e.quantity&&e.productCode&&e.departureTime&&e.arrivalTime){
               if(!/^(\d{4})([/-]\d{1,2}){2}\s\d{1,2}(:\d{1,2}){2}$/.test(e.arrivalTime)||!/^(\d{4})([/-]\d{1,2}){2}\s\d{1,2}(:\d{1,2}){2}$/.test(e.departureTime)){
                   alert('时间格式为yyyy-mm-dd HH:mm:ss')
               }else{
                e.arrivalTime=dayjs(e.arrivalTime).valueOf();
                e.departureTime=dayjs(e.departureTime).valueOf();
                e.quantity=Number(e.quantity);
                let logistics=e;
                this.$api.qualityTraceability.createservice(logistics).then(res=>{
                    // this.dataList.pop();
                    // this.dataList.unshift(res);
                    if(res){
                        this.getService();
                        alert('创建成功')
                    }
                })
                this.editDis = false;
               }
                
            }else{
                alert('输入错误')
            }
            }
            if(this.now==2){
                e.arrivalTime=dayjs(e.arrivalTime).valueOf();
                e.departureTime=dayjs(e.departureTime).valueOf();
                e.quantity=Number(e.quantity);
                // console.log(this.now);
                let logistics=e
                this.$api.qualityTraceability.updateservice(logistics).then(res=>{
                    // this.dataList.pop();
                    // this.dataList.unshift(res);
                    if(res){
                        alert('修改成功')
                    }
                })
                 this.editDis = false;
            }
            
        },
        createCancel() {
            this.editDis = false;
        },
        eventInit() {
            this.formData = {
                goTime: "",
                getTime: "",
                begin: "",
                end: "",
                car: "",
                address: "",
                name: "",
                phone: "",
                num: 0
            };
        },
        initMap() {
             // 创建地图实例 
            var map = new BMapGL.Map("map");
            // 创建点坐标 
            var point = new BMapGL.Point(116.404, 39.915);
            // 初始化地图，设置中心点坐标和地图级别
            map.centerAndZoom(point, 15); 
            //开启鼠标滚轮缩放
            map.enableScrollWheelZoom(true); 
            //设置标注的图片  
            var myIcon = new BMapGL.Icon(img, new BMapGL.Size(52, 35), {    
            });    
            
        
            //设置终点与起点路线
            //设置起点
            var from=new BMapGL.Point(this.lngd[0],this.latd[0]);
            //设置终点
            var to=new BMapGL.Point(this.lnga[0],this.lata[0]);
            // 创建步行实例
            var walking = new BMapGL.DrivingRoute(map)
            // 第一个步行搜索 
            walking.search(from, to)  
            //搜索结束的回调     
            var _this=this;
            setTimeout(() => {
                walking.setSearchCompleteCallback(function () {
                // 通过步行实例，获得一系列点的数组
                var pts = walking.getResults().getPlan(0).getRoute(0).getPath();
                //根据一系列点画出直线
                var polyline = new BMapGL.Polyline(pts,{
                    strokeColor :'red',
                    strokeWeight:10
                })
                map.addOverlay(polyline);
                // 创建2个marker
                var m1 = new BMapGL.Marker(from,{icon: myIcon});
                var m2 = new BMapGL.Marker(to,{icon: myIcon});
                map.addOverlay(m1);
                map.addOverlay(m2);
            //点击的标签
                var sContent = `<div style="font-weight:700"><div>出发地:${_this.dataList[0].departureAddr}</div><div>到达地:${_this.dataList[0].arrivalAddr}</div><div>车牌号:${_this.dataList[0].vehiclePlate}</div><div>司机姓名:${_this.dataList[0].driverName}</div><div>联系方式:${_this.dataList[0].driverContact}</div></div>`;
                var infoWindow1 = new BMapGL.InfoWindow(sContent);
                m1.addEventListener("click", function(v) {
                    this.map.openInfoWindow(infoWindow1, v.latLng);
                });
                var sContent2 = `<div style="font-weight:700"><div>出发地:${_this.dataList[0].departureAddr}</div><div>到达地:${_this.dataList[0].arrivalAddr}</div><div>车牌号:${_this.dataList[0].vehiclePlate}</div><div>司机姓名:${_this.dataList[0].driverName}</div><div>联系方式:${_this.dataList[0].driverContact}</div></div>`;
                var infoWindow2 = new BMapGL.InfoWindow(sContent2);
                m2.addEventListener("click", function(v) {
                    this.map.openInfoWindow(infoWindow2, v.latLng);
                });
                // 调整到最佳视野
                setTimeout(function () {
                map.setViewport([from, to]) 
                }, 1000)
            })
            }, 1000);

        if(this.lngd[1]!=undefined){
        var from1=new BMapGL.Point(this.lngd[1],this.latd[1]);
        //设置终点
        var to1=new BMapGL.Point(this.lnga[1],this.lata[1]);
        // 创建步行实例
        var walking1 = new BMapGL.DrivingRoute(map)
        // 第一个步行搜索 
        walking1.search(from1, to1)  
        //搜索结束的回调     
        var _this1=this;
        setTimeout(() => {
            walking1.setSearchCompleteCallback(function () {
            // 通过步行实例，获得一系列点的数组
            var pts = walking1.getResults().getPlan(0).getRoute(0).getPath();
            //根据一系列点画出直线
            var polyline = new BMapGL.Polyline(pts,{
                 strokeColor :'blue',
                 strokeWeight:10
            })
            map.addOverlay(polyline);
            // 创建2个marker
            var m3 = new BMapGL.Marker(from1,{icon: myIcon});
            var m4 = new BMapGL.Marker(to1,{icon: myIcon});
            map.addOverlay(m3);
            map.addOverlay(m4);
           //点击的标签
            var sContent3 = `<div style="font-weight:700"><div>出发地:${_this1.dataList[1].departureAddr}</div><div>到达地:${_this1.dataList[1].arrivalAddr}</div><div>车牌号:${_this1.dataList[1].vehiclePlate}</div><div>司机姓名:${_this1.dataList[1].driverName}</div><div>联系方式:${_this1.dataList[1].driverContact}</div></div>`;
            var infoWindow3 = new BMapGL.InfoWindow(sContent3);
            m3.addEventListener("click", function(v) {
                this.map.openInfoWindow(infoWindow3, v.latLng);
            });
            var sContent4 = `<div style="font-weight:700"><div>出发地:${_this1.dataList[1].departureAddr}</div><div>到达地:${_this1.dataList[1].arrivalAddr}</div><div>车牌号:${_this1.dataList[1].vehiclePlate}</div><div>司机姓名:${_this1.dataList[1].driverName}</div><div>联系方式:${_this1.dataList[1].driverContact}</div></div>`;
            var infoWindow4 = new BMapGL.InfoWindow(sContent4);
            m4.addEventListener("click", function(v) {
                this.map.openInfoWindow(infoWindow4, v.latLng);
            });
            // 调整到最佳视野
            setTimeout(function () {
            map.setViewport([from1, to1]) 
            }, 1000)
        })

        }, 1000);
        }
        
        if(this.lngd[2]!=undefined){
        var from2=new BMapGL.Point(this.lngd[2],this.latd[2]);
        //设置终点
        var to2=new BMapGL.Point(this.lnga[2],this.lata[2]);
        // 创建步行实例
        var walking2 = new BMapGL.DrivingRoute(map)
        // 第一个步行搜索 
        walking2.search(from2, to2)  
        //搜索结束的回调     
        var _this2=this;
        setTimeout(() => {
            walking2.setSearchCompleteCallback(function () {
            // 通过步行实例，获得一系列点的数组
            var pts = walking2.getResults().getPlan(0).getRoute(0).getPath();
            //根据一系列点画出直线
            var polyline = new BMapGL.Polyline(pts,{
                 strokeColor :'blue',
                 strokeWeight:10
            })
            map.addOverlay(polyline);
            // 创建2个marker
            var m5 = new BMapGL.Marker(from2,{icon: myIcon});
            var m6 = new BMapGL.Marker(to2,{icon: myIcon});
            map.addOverlay(m5);
            map.addOverlay(m6);
           //点击的标签
            var sContent5 = `<div style="font-weight:700"><div>出发地:${_this2.dataList[2].departureAddr}</div><div>到达地:${_this2.dataList[2].arrivalAddr}</div><div>车牌号:${_this2.dataList[2].vehiclePlate}</div><div>司机姓名:${_this2.dataList[2].driverName}</div><div>联系方式:${_this2.dataList[2].driverContact}</div></div>`;
            var infoWindow5 = new BMapGL.InfoWindow(sContent5);
            m5.addEventListener("click", function(v) {
                this.map.openInfoWindow(infoWindow5, v.latLng);
            });
            var sContent6 = `<div style="font-weight:700"><div>出发地:${_this2.dataList[2].departureAddr}</div><div>到达地:${_this2.dataList[2].arrivalAddr}</div><div>车牌号:${_this2.dataList[2].vehiclePlate}</div><div>司机姓名:${_this2.dataList[2].driverName}</div><div>联系方式:${_this2.dataList[2].driverContact}</div></div>`;
            var infoWindow6 = new BMapGL.InfoWindow(sContent6);
            m6.addEventListener("click", function(v) {
                this.map.openInfoWindow(infoWindow6, v.latLng);
            });
            // 调整到最佳视野
            setTimeout(function () {
            map.setViewport([from2, to2]) 
            }, 1000)
        })

        }, 1000);
        }


        if(this.lngd[3]!=undefined){
        var from3=new BMapGL.Point(this.lngd[3],this.latd[3]);
        //设置终点
        var to3=new BMapGL.Point(this.lnga[3],this.lata[3]);
        // 创建步行实例
        var walking3 = new BMapGL.DrivingRoute(map)
        // 第一个步行搜索 
        walking3.search(from3, to3)  
        //搜索结束的回调     
        var _this3=this;
        setTimeout(() => {
            walking3.setSearchCompleteCallback(function () {
            // 通过步行实例，获得一系列点的数组
            var pts = walking3.getResults().getPlan(0).getRoute(0).getPath();
            //根据一系列点画出直线
            var polyline = new BMapGL.Polyline(pts,{
                 strokeColor :'red',
                 strokeWeight:10
            })
            map.addOverlay(polyline);
            // 创建2个marker
            var m7 = new BMapGL.Marker(from3,{icon: myIcon});
            var m8 = new BMapGL.Marker(to3,{icon: myIcon});
            map.addOverlay(m7);
            map.addOverlay(m8);
           //点击的标签
            var sContent7 = `<div style="font-weight:700"><div>出发地:${_this3.dataList[3].departureAddr}</div><div>到达地:${_this3.dataList[3].arrivalAddr}</div><div>车牌号:${_this3.dataList[3].vehiclePlate}</div><div>司机姓名:${_this3.dataList[3].driverName}</div><div>联系方式:${_this3.dataList[3].driverContact}</div></div>`;
            var infoWindow7 = new BMapGL.InfoWindow(sContent7);
            m7.addEventListener("click", function(v) {
                this.map.openInfoWindow(infoWindow7, v.latLng);
            });
            var sContent8 = `<div style="font-weight:700"><div>出发地:${_this3.dataList[3].departureAddr}</div><div>到达地:${_this3.dataList[3].arrivalAddr}</div><div>车牌号:${_this3.dataList[3].vehiclePlate}</div><div>司机姓名:${_this3.dataList[3].driverName}</div><div>联系方式:${_this3.dataList[3].driverContact}</div></div>`;
            var infoWindow8 = new BMapGL.InfoWindow(sContent8);
            m8.addEventListener("click", function(v) {
                this.map.openInfoWindow(infoWindow8, v.latLng);
            });
            // 调整到最佳视野
            setTimeout(function () {
            map.setViewport([from3, to3]) 
            }, 1000)
         })
        }, 1000);
     }
    },
        check(v) {
            this.formInline = v;
            this.detailDis = true;
        },
        closeModal() {
            this.detailDis = false;
        },
        detail(v) {
            var s=false;
            var thiss=this;
            this.$Modal.confirm({
                title: "确认删除",
                content: "是否确认删除？",
                okText: "确定",
                cancelText: "取消",
                onOk() {
                this.$api.qualityTraceability.deleteservice({id:v.id}).then(res=>{
                     if(res=='success'){
                         alert('删除成功');
                         thiss.getService();
                     }
                 })
                
                }
            });       
        },
        timechange(e){
            var Daychange=[];
            if(e==undefined){
                return Daychange
            }
            
            Daychange.push(dayjs(e).format('YYYY-MM-DD'))
            Daychange.push(dayjs(e).format('a:HH:mm'))
            return Daychange
        }
    },
    mounted() {
        if(this.userTabList.find(item => item === "物流追踪")) {
            this.getService();
            //  this.$nextTick(() => {
            //    this.initMap();
            // });
            setTimeout(() => {
                this.initMap();
                //  this.setCode();
            }, 1000);
        }
    },
    computed: {
        userTabList() {
            let access = this.$store.state.user.access.qualityTraceability
            if(!access) return this.tabList
            return this.tabList.filter(item => {
                if(item === "物流追踪" && access.find(item2 => item2 === "物流跟踪")) return true
                if(item === "标签打印" && access.find(item2 => item2 === "标签打印")) return true
                if(item === "溯源查询" && access.find(item2 => item2 === "溯源查询")) return true
                return false
            })
        }
    },
    watch:{
        editDis(val) {
            if(!val) {
                this.currentList={}
            }
        },
        dataList:{//深度监听，可监听到对象、数组的变化
         handler(val, oldVal){
            // this.initMap();
            // console.log(1);
         },
         deep:true //true 深度监听
     }
    }
};
</script>
<style lang="less" scoped>
@import "./index.less";
.bmr10{
   margin-right:10px
}
.code{
    width: 80px;
    height: 80px;
    margin: 20px 18px 30px;
    /deep/img{
        display: block;
        width: 100%;
        height: 100%;
        // padding: 10px;
    }
    text-align: center;
}
</style>

