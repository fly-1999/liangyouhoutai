<template>
    <div class="login_from">
        <Form
            ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            @keydown.enter.native="handleSubmit"
        >
            <FormItem prop="identity">
                <div class="identity-war">
                    <span class="span-title">
                        <Icon type="md-people" size="16" /> 用户名类型</span
                    >
                    <Select
                        v-model="formValidate.identity"
                        size="large"
                        placeholder="请选择"
                        @on-change="obtainValue"
                    >
                        <Option
                            v-for="(item, key) in identityList"
                            :value="item.id + ''"
                            :key="key"
                            >{{ item.desc }}</Option
                        >
                    </Select>
                </div>
            </FormItem>
            <FormItem prop="variety" v-if="formValidate.identity == 1">
                <div class="identity-war">
                    <span class="span-title">
                        <Icon type="logo-buffer" size="16" /> 种类</span
                    >
                    <Select
                        v-model="formValidate.variety"
                        placeholder="请选择"
                        size="large"
                    >
                        <Option
                            v-for="(item, key) in varietyList"
                            :value="item.id + ''"
                            :key="key"
                            >{{ item.desc }}</Option
                        >
                    </Select>
                </div>
            </FormItem>
            <FormItem prop="username">
                <!--<Input placeholder="Enter name" style="width: auto">-->
                <!--<Icon type="ios-contact" slot="prefix" />-->
                <!--</Input>-->
                <Input
                    prefix="md-person"
                    v-model="formValidate.username"
                    placeholder="请输入用户名"
                />
            </FormItem>

            <FormItem prop="password">
                <Input
                    prefix="md-lock"
                    type="password"
                    v-model="formValidate.password"
                    placeholder="请输入密码"
                />
            </FormItem>
            <FormItem>
                <Button
                    @click="handleSubmit"
                    type="primary"
                    long
                    shape="circle"
                    size="large"
                    style="height: 42px"
                    >登录</Button
                >
            </FormItem>
        </Form>
        <div class="remPassword">
            <i></i> <Checkbox v-model="single">记住密码</Checkbox>
        </div>
    </div>

    <!-- <FormItem prop="password">
                <Input
                    type="password"
                    v-model="formValidate.password"
                    placeholder="请输入密码"
                />
            </FormItem>
            <FormItem>
                <Button
                    @click="handleSubmit"
                    type="primary"
                    long
                    shape="circle"
                    size="large"
                    style="height: 42px"
                    >登录</Button
                >
            </FormItem>
        </Form>
        <div class="remPassword">
            <i></i> <Checkbox v-model="single">记住密码</Checkbox>
        </div> -->
    <!-- </div> -->
</template>
<script>
import Cookies from 'js-cookie';
import { setToken, setPermission } from "@/libs/util";
export default {
    name: "LoginForm",
    data() {
        return {
            formValidate: {
                username: "", //enterprise
                password: "", //password
                identity: "",
                variety: ""
            },
            ruleValidate: {
                username: [
                    { required: true, message: "账号不能为空", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "密码不能为空", trigger: "blur" }
                ],
                identity: [
                    {
                        required: true,
                        message: "用户类型不能为空",
                        trigger: "change"
                    }
                ],
                variety: [
                    {
                        required: true,
                        message: "种类不能为空",
                        trigger: "change"
                    }
                ]
            },

            identityList: [],
            varietyList: [],
            single: false
        };
    },
    computed: {},
    mounted() {
        if (localStorage.getItem("rem_Password")) {
            console.log("有记住密码");
            let fromPas = JSON.parse(localStorage.getItem("rem_Password"));
            console.log(fromPas);
            this.single = true;
            this.formValidate = fromPas;
        }
        // this.account()
        this.roles();
    },
    methods: {
      //ie 存cookie
      account(){
        if(document.cookie.length >= 0){
          console.log(this.getCookie('username'),'???????@@@@@')
          this.formValidate.username = this.getCookie('username')
          this.formValidate.password = this.getCookie('password')
        }
      },
      setCookie(c_name,c_pwd,exdate){  //账号，密码 ，过期的天数
        var exdate = new Date()
        console.log(c_name,c_pwd)
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdate)  //保存的天数
        document.cookie ="username="+c_name+";path=/;expires="+exdate.toLocaleString()
        document.cookie ="password="+c_pwd+";path=/;expires="+exdate.toLocaleString()
      },
      getCookie(name){
        var arr = document.cookie.split(";")
        //["_ga=GA1.1.1756734561.1561034020", " mobile=123" password=456"]
        for(var i=0;i<arr.length;i++){
          var arr2 = arr[i].split('=');  // ["_ga", "GA1.1.1756734561.1561034020"]
          if(arr2[0].trim() == name){
            return arr2[1]
          }
        }
      },
      clearCookie(){
        this.setCookie("","",-1)  //清除cookie
      },
      //结束
        obtainValue(e) {
            console.log(e);
            if (e == 1) {
                this.variety();
            } else {
                this.formValidate.variety = "";
            }
        },
        //用户类型下拉
        roles() {
            this.$api.login.roles().then(res => {
                console.log(res, "roles()");
                this.identityList = res;
            });
        },
        //企业种类下拉
        variety() {
            this.$api.login.variety().then(res => {
                this.varietyList = res;
            });
        },
        login() {
            this.$api.login.login(this.formValidate).then(res => {
                if (res.token) {
                    setToken(res.token);
                    setPermission(JSON.stringify(res.role[0].id));
                    localStorage.setItem("access_token", res.token);
                    this.$store.commit("setUserId",res.user.id)
                    // this.$store.commit("setUserName",res.user.username)
                    Cookies.set('name', res.user.username);
                    this.$router.push({ name: "home" });
                    this.$store.dispatch('getUserInfo')
                }
            }).catch(err => {
                switch (err){
                    case "404":
                        this.$Modal.error({
                            title: "登录失败",
                            content: "用户名错误"
                        });
                        break
                    case "400":
                        this.$Modal.error({
                            title: "登录失败",
                            content: "密码错误"
                        });
                        break
                }
            })
        },

        handleSubmit() {
            console.log(this.formValidate, this.single);
            this.$refs.formValidate.validate(valid => {
                if (valid) {
                  let _this = this
                    if (this.single) {
                        console.log("记住密码");
                        localStorage.setItem(
                            "rem_Password",
                            JSON.stringify(this.formValidate)
                        );
                     // _this.setCookie(_this.formValidate.username,_this.formValidate.password,7)  //保存7天
                    }
                    this.login();
                }
            });
        }
    }
};
</script>
<style lang="less">
.login_from {
    .ivu-input-prefix,
    .ivu-input-suffix {
        top: 6px;
        left: 10px;
    }
    .identity-war {
        padding-left: 40%;
        border: 1px solid #dcdee2;
        border-right: none;
        border-radius: 44px;
        background: #ffffff;
        .span-title {
            position: absolute;
            left: 20px;
            line-height: 42px;
            color: #515a6e;
            font-size: 16px;
            cursor: default;
            i {
                color: #808695;
                margin-right: 6px;
            }
        }
    }
    .ivu-input {
        height: 42px;
        border-radius: 42px;
        padding-left: 45px;
        font-size: 16px;
    }
    .ivu-select {
        width: 100%;
    }
    .ivu-select-large.ivu-select-single .ivu-select-selection {
        height: 42px;
        border-radius: 42px;
    }
    .ivu-select-large.ivu-select-single
        .ivu-select-selection
        .ivu-select-placeholder,
    .ivu-select-large.ivu-select-single
        .ivu-select-selection
        .ivu-select-selected-value {
        height: 42px;
        line-height: 42px;
        padding-left: 30px;
    }
}
.remPassword {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: -30px;
    right: 0;
}
</style>
