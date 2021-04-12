<template>
    <div style="height: 100%;padding: 0 30px;">
        <div class="img-list">
            <div class="img-item" @click="getIndex(0)">
                <Poptip placement="right-end">
                    <img src="../../../assets/images/linkrisk/img11.png"/>
                    <p class="item-title">收购</p>
                    <div slot="content" class="popClass">
                        <p>收购</p>
                        <p>低风险:{{nodeRank[0]["低风险"]}}</p>
                        <p>中风险:{{nodeRank[0]["中风险"]}}</p>
                        <p>高风险:{{nodeRank[0]["高风险"]}}</p>
                    </div>
                </Poptip>
            </div>
            <div>
                <img src="../../../assets/images/linkrisk/arrow.png" />
            </div>
            <div class="img-item" @click="getIndex(1)">
                <Poptip placement="right-end">
                    <img src="../../../assets/images/linkrisk/img12.png"/>
                    <p class="item-title">干燥</p>
                    <div slot="content" class="popClass">
                        <p>干燥</p>
                        <p>低风险:{{nodeRank[1]["低风险"]}}</p>
                        <p>中风险:{{nodeRank[1]["中风险"]}}</p>
                        <p>高风险:{{nodeRank[1]["高风险"]}}</p>
                    </div>
                </Poptip>
            </div>
            <div>
                <img src="../../../assets/images/linkrisk/arrow.png" />
            </div>
            <div class="img-item" @click="getIndex(2)">
                <Poptip placement="right-end">
                    <img src="../../../assets/images/linkrisk/img13.png"/>
                    <p class="item-title">除杂</p>
                    <div slot="content" class="popClass">
                        <p>除杂</p>
                        <p>低风险:{{nodeRank[2]["低风险"]}}</p>
                        <p>中风险:{{nodeRank[2]["中风险"]}}</p>
                        <p>高风险:{{nodeRank[2]["高风险"]}}</p>
                    </div>
                </Poptip>
            </div>
            <div>
                <img src="../../../assets/images/linkrisk/arrow.png"/>
            </div>
            <div class="img-item" style="position: relative" @click="getIndex(3)">
                <div style="position: absolute;left: 80%;bottom: -50%;width: 35px">
                    <img
                        src="../../../assets/images/linkrisk/arrow1.png"
                        style="height: 50px"
                    />
                </div>
                <Poptip placement="right-end">
                    <img src="../../../assets/images/linkrisk/img14.png"/>
                    <p class="item-title">仓储</p>
                    <div slot="content" class="popClass">
                        <p>仓储</p>
                        <p>低风险:{{nodeRank[3]["低风险"]}}</p>
                        <p>中风险:{{nodeRank[3]["中风险"]}}</p>
                        <p>高风险:{{nodeRank[3]["高风险"]}}</p>
                    </div>
                </Poptip>
            </div>
        </div>
        <div class="img-list">
            <div class="img-item" style="position: relative" @click="getIndex(6)">
                <div class="arrow1-rotate">
                    <img
                        src="../../../assets/images/linkrisk/arrow2.png"
                        style="height: 50px"
                    />
                </div>
                <Poptip placement="right-end">
                    <img src="../../../assets/images/linkrisk/img21.jpg"/>
                    <p class="item-title">色选</p>
                    <div slot="content" class="popClass">
                        <p>色选</p>
                        <p>低风险:{{nodeRank[6]["低风险"]}}</p>
                        <p>中风险:{{nodeRank[6]["中风险"]}}</p>
                        <p>高风险:{{nodeRank[6]["高风险"]}}</p>
                    </div>
                </Poptip>
            </div>
            <div class="rotate">
                <img src="../../../assets/images/linkrisk/arrow.png" />
            </div>
            <div class="img-item" @click="getIndex(5)">
                <Poptip placement="right-end">
                    <img src="../../../assets/images/linkrisk/img22.png"/>
                    <p class="item-title">碾米</p>
                    <div slot="content" class="popClass">
                        <p>碾米</p>
                        <p>低风险:{{nodeRank[5]["低风险"]}}</p>
                        <p>中风险:{{nodeRank[5]["中风险"]}}</p>
                        <p>高风险:{{nodeRank[5]["高风险"]}}</p>
                    </div>
                </Poptip>
            </div>
            <div class="rotate">
                <img src="../../../assets/images/linkrisk/arrow.png" />
            </div>
            <div class="img-item" @click="getIndex(7)">
                <Poptip placement="right-end">
                    <img src="../../../assets/images/linkrisk/img23.png"/>
                    <p class="item-title">抛光</p>
                    <div slot="content" class="popClass">
                        <p>抛光</p>
                        <p>低风险:{{nodeRank[7]["低风险"]}}</p>
                        <p>中风险:{{nodeRank[7]["中风险"]}}</p>
                        <p>高风险:{{nodeRank[7]["高风险"]}}</p>
                    </div>
                </Poptip>
            </div>
            <div class="rotate">
                <img src="../../../assets/images/linkrisk/arrow.png" />
            </div>
            <div class="img-item" @click="getIndex(4)">
                <Poptip placement="right-end">
                    <img src="../../../assets/images/linkrisk/img24.png"/>
                    <p class="item-title">垄谷</p>
                    <div slot="content" class="popClass">
                        <p>垄谷</p>
                        <p>低风险:{{nodeRank[4]["低风险"]}}</p>
                        <p>中风险:{{nodeRank[4]["中风险"]}}</p>
                        <p>高风险:{{nodeRank[4]["高风险"]}}</p>
                    </div>
                </Poptip>
            </div>
        </div>
        <div class="img-list">
            <div class="img-item" @click="getIndex(8)">
                <Poptip placement="right-end">
                    <img src="../../../assets/images/linkrisk/img31.png"/>
                    <p class="item-title">包装</p>
                    <div slot="content" class="popClass">
                        <p>包装</p>
                        <p>低风险:{{nodeRank[8]["低风险"]}}</p>
                        <p>中风险:{{nodeRank[8]["中风险"]}}</p>
                        <p>高风险:{{nodeRank[8]["高风险"]}}</p>
                    </div>
                </Poptip>
            </div>
            <div><img src="../../../assets/images/linkrisk/arrow.png" /></div>
            <div class="img-item" @click="getIndex(9)">
                <Poptip placement="right-end">
                    <img src="../../../assets/images/linkrisk/img32.png"/>
                    <p class="item-title">入库</p>
                    <div slot="content" class="popClass">
                        <p>入库</p>
                        <p>低风险:{{nodeRank[9]["低风险"]}}</p>
                        <p>中风险:{{nodeRank[9]["中风险"]}}</p>
                        <p>高风险:{{nodeRank[9]["高风险"]}}</p>
                    </div>
                </Poptip>
            </div>
            <div><img src="../../../assets/images/linkrisk/arrow.png" /></div>
            <div class="img-item" @click="getIndex(10)">
                <Poptip placement="right-end">
                    <img
                        src="../../../assets/images/linkrisk/img33.png"
                        style="height: 3.8rem"
                    />
                    <p class="item-title">运输</p>
                    <div slot="content" class="popClass">
                        <p>运输</p>
                        <p>低风险:{{nodeRank[10]["低风险"]}}</p>
                        <p>中风险:{{nodeRank[10]["中风险"]}}</p>
                        <p>高风险:{{nodeRank[10]["高风险"]}}</p>
                    </div>
                </Poptip>
            </div>
            <div><img src="../../../assets/images/linkrisk/arrow.png" /></div>
            <div class="img-item" @click="getIndex(11)">
                <Poptip placement="right-end">
                    <img src="../../../assets/images/linkrisk/img34.png" />
                    <p class="item-title">销售</p>
                    <div slot="content" class="popClass">
                        <p>销售</p>
                        <p>低风险:{{nodeRank[11]["低风险"]}}</p>
                        <p>中风险:{{nodeRank[11]["中风险"]}}</p>
                        <p>高风险:{{nodeRank[11]["高风险"]}}</p>
                    </div>
                </Poptip>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "link-risk",
    props: {
        selectIndex: String || undefined
    },
    data() {
        return {
            nodeRank: [
                {
                    "低风险": 0,
                    "中风险": 0,
                    "高风险": 0
                },
                {
                    "低风险": 0,
                    "中风险": 0,
                    "高风险": 0
                },
                {
                    "低风险": 0,
                    "中风险": 0,
                    "高风险": 0
                },
                {
                    "低风险": 0,
                    "中风险": 0,
                    "高风险": 0
                },
                {
                    "低风险": 0,
                    "中风险": 0,
                    "高风险": 0
                },
                {
                    "低风险": 0,
                    "中风险": 0,
                    "高风险": 0
                },
                {
                    "低风险": 0,
                    "中风险": 0,
                    "高风险": 0
                },
                {
                    "低风险": 0,
                    "中风险": 0,
                    "高风险": 0
                },
                {
                    "低风险": 0,
                    "中风险": 0,
                    "高风险": 0
                },
                {
                    "低风险": 0,
                    "中风险": 0,
                    "高风险": 0
                },
                {
                    "低风险": 0,
                    "中风险": 0,
                    "高风险": 0
                },
                {
                    "低风险": 0,
                    "中风险": 0,
                    "高风险": 0
                }
            ]
        };
    },
    mounted() {
        this.initClick();
        this.getNodeRank()
    },
    methods: {
        getIndex(val) {
            this.$emit("index",val)
        },
        initClick() {
            var dom = document.getElementsByClassName("img-item");
            for (let i = 0; i < dom.length; i++) {
                dom[i].onclick = function() {
                    for (var k = 0; k < dom.length; k++) {
                        dom[k].style.border = "none";
                    }
                    dom[i].style.border = "1px dotted #FFC704";
                };
            }
        },
        getImgUrl(i, y) {
            var imgUrl = "" + i + y + ".png";
            return require("@/assets/images/linkrisk/img" + imgUrl);
        },
        getNodeRank() {
            if(this.selectIndex) {
                this.$api.service.getNodeRankByCode(this.selectIndex).then(res => {
                    this.nodeRank = res.map(item => ({
                        "低风险": 0,
                        "中风险": 0,
                        "高风险": 0,
                        ...item
                    }))
                })
            }else {
                this.$api.service.getNodeRank().then(res => {
                    this.nodeRank = res.map(item => ({
                        "低风险": 0,
                        "中风险": 0,
                        "高风险": 0,
                        ...item
                    }))
                })
            }
        }
    },
    watch: {
        selectIndex() {
            this.getNodeRank()
        }
    }
};
</script>

<style scoped lang="less">
.img-list {
    /*position: relative;*/
    text-align: center;
    align-items: center;
    height: 30%;
    display: flex;
    justify-content: space-evenly;
    > div {
        display: inline-block;
    }
    .img-item {
        /*height: 15%;*/
        /deep/img {
            // max-width: 80%;
            height: 73px;
        }
        p {
            font-size: 16px;
            color: #ffffff;
        }
    }
    .img-item:hover {
        .item-title {
            color: yellow;
        }
    }
    .rotate {
        transform: rotate(180deg);
        -ms-transform: rotate(180deg); /* IE 9 */
        -moz-transform: rotate(180deg); /* Firefox */
        -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
        -o-transform: rotate(180deg); /* Opera */
    }
    .arrow1-rotate {
        position: absolute;
        left: -15%;
        bottom: -50%;
    }

    /deep/.ivu-poptip-body {
        background: rgba(0, 0, 0, 0.2);
    }
    /deep/.ivu-poptip-popper[x-placement^="right"] .ivu-poptip-arrow:after {
        border-right-color: #333333;
    }
    /deep/.ivu-poptip-popper[x-placement^="right"] .ivu-poptip-arrow {
        border-right-color: #333333;
    }
    /deep/.ivu-poptip-inner {
        background: none;
    }
}
.popClass {
    text-align: left;
    p {
        font-size: 12px !important;
    }
}
.popClass p:nth-child(1) {
    color: yellow;
    font-size: 14px !important;
}
.img-list>div {
    width: 10%;
    >div {
        vertical-align: middle;
    }
}
.img-list>.img-item {
    width: 17%;
}
</style>
