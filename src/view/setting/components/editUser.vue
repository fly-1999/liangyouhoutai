<template>
  <div class="editUser">
    <Form
      ref="userDateB"
      :model="userDateB"
      label-position="left"
      :label-width="120"
    >
      <FormItem label="用户名:" class="wF120">
        <Input type="text" v-model="userDateB.name" class="w233" />
        <span class="formWarning" v-show="fWarn1">用户名不能为空</span>
      </FormItem>

      <FormItem label="用户类型:" class="wF120">
        <Select v-model="modelA" size="large" class="w110">
          <Option
            v-for="itemA in userTypes"
            :value="itemA.value"
            :key="itemA.value"
            >{{ itemA.label }}</Option
          >
        </Select>
        <span class="formWarning" v-show="fWarn2">请选择用户类型</span>
      </FormItem>

      <FormItem label="种类:" v-show="isEnterprise" class="wF120">
        <Select v-model="modelB" size="large" class="w233">
          <Option
            v-for="itemB in kinds"
            :value="itemB.value"
            :key="itemB.value"
            >{{ itemB.label }}</Option
          >
        </Select>
        <span class="formWarning" v-show="fWarn3">请选择种类</span>
      </FormItem>
      <FormItem label="密码:" class="wF120">
        <Input type="text" v-model="userDateB.password" class="w233" />
        <span class="formWarning" v-show="fWarn4">密码不能为空</span>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          @click="handleSubmit('userDateB')"
          class="editBut"
          >确定</Button
        >
        <Button @click="handleCancel" style="float: right" class="editBut"
          >取消</Button
        >
      </FormItem>
    </Form>
  </div>
</template>

<script>
import user from "@/store/module/user.js";
const userState = user.state;
export default {
  name: "EditUser",
  props: {
    isCreate: Boolean,
  },
  data() {
    return {
      isEnterprise: false,
      fWarn1: false,
      fWarn2: false,
      fWarn3: false,
      fWarn4: false,
      userDateB: {
        id: "",
        name: "",
        role: "",
        kind: "",
        password: "",
      },
      userTypes: [
        {
          value: "企业",
          label: "企业",
        },
        {
          value: "监管机构",
          label: "监管机构",
        },
        {
          value: "消费者",
          label: "消费者",
        },
      ],
      kinds: [
        {
          value: "中南海地区稻米重金属",
          label: "中南海地区稻米重金属",
        },
        {
          value: "中南海地区稻米真菌霉素",
          label: "中南海地区稻米真菌霉素",
        },
        {
          value: "黄淮海地区小麦粉真菌霉素",
          label: "黄淮海地区小麦粉真菌霉素",
        },
        {
          value: "黄淮海地区小麦粉农药残留",
          label: "黄淮海地区小麦粉农药残留",
        },
        {
          value: "黄淮海地区花生油真菌霉素",
          label: "黄淮海地区花生油真菌霉素",
        },
      ],
      modelA: "",
      modelB: "",
      maxID: "",
      updataUser: [],
      createUser: {},
      roleBox: {
        企业: "enterprise",
        监管机构: "regularity_authority",
        消费者: "customer",
      },
      roleIDBox: {
        企业: 1,
        监管机构: 2,
        消费者: 3,
      },
      kindsIDBox: {
        中南海地区稻米重金属: 1,
        中南海地区稻米真菌霉素: 2,
        黄淮海地区小麦粉真菌霉素: 3,
        黄淮海地区小麦粉农药残留: 4,
        黄淮海地区花生油真菌霉素: 5,
      },
    };
  },
  watch: {
    modelA: function (val) {
      if (val == "企业") {
        this.isEnterprise = true;
      } else {
        this.isEnterprise = false;
        this.userDateB.kind = "";
      }
    },
  },
  methods: {
    handleSubmit() {
      if (this.userDateB.name == "") {
        this.fWarn1 = true;
        return;
      } else {
        this.fWarn1 = false;
      }
      if (this.modelA == "") {
        this.fWarn2 = true;
        return;
      } else {
        this.fWarn2 = false;
      }
      if (this.isEnterprise && this.modelB == "") {
        this.fWarn3 = true;
        return;
      } else {
        this.fWarn3 = false;
      }
      if (this.userDateB.password == "") {
        this.fWarn4 = true;
        return;
      } else {
        this.fWarn4 = false;
      }
      /* 对创建用户还是修改用户进行判断 */
      if (this.isCreate) {
        // 创建
        this.creatUserInfor();
        // console.log(this.createUser);
        this.$emit("edit-submit", this.createUser);
      } else {
        //修改
        this.updataUser = [];
        let item = {};
        let reg = /\*{4}/;
        item.id = this.userDateB.id;
        item.account = this.userDateB.name;
        item.username = item.account;
        if (!reg.test(this.userDateB.password)) {
          item.password = this.userDateB.password;
          // console.log("密码变动了");
        }
        this.updataUser.push(item);
        this.$emit("edit-submit", this.updataUser);
      }
    },
    // 创建用户的基本信息
    creatUserInfor() {
      this.createUser = {};
      this.userDateB.role = this.modelA;
      this.userDateB.kind = this.modelB;
      let box = {
        enterpriseRole: [],
        role: [],
        user: {},
      };
      let user = {};
      let role = {};
      let enterpriseRole = {};
      user.id = 0;
      user.account = this.userDateB.name;
      // user.username = this.userDateB.role;
      user.username = user.account;
      user.password = this.userDateB.password;
      role.id = this.roleIDBox[this.userDateB.role];
      role.role = this.roleBox[this.userDateB.role];
      role.desc = this.userDateB.role;
      if (this.isEnterprise) {
        enterpriseRole.id = this.kindsIDBox[this.userDateB.kind];
        enterpriseRole.role = this.userDateB.kind;
        enterpriseRole.desc = this.userDateB.kind;
        box.enterpriseRole = [enterpriseRole];
      } else {
        box.enterpriseRole = [];
      }
      box.user = user;
      box.role = [role];
      box.token = userState.token;
      this.createUser = box;
    },
    handleCancel() {
      this.$emit("edit-cancel");
    },
  },
};
</script>

<style lang="less" scoped>
.w110{
  width: 110px;
}
/deep/.wF120{
  .ivu-form-item-label{
    width: 120px !important;
  }
}
.formWarning {
  display: block;
  color: rgb(255, 0, 0);
  font-size: 14px;
  width: 100%;
  text-align: center;
  height: 25px;
  // position: absolute;
  // bottom: -20px;
  margin-left: 20px;
}
.editBut {
  width: 80px;
  height: 38px;
  text-align: center;
  font-size: 18px;
  /deep/span{
    display: block;
    width: 100%;
    height: 100%;
    line-height: 30px;
  }
}
.editUser {
  /deep/.ivu-modal-body {
    padding: 55px 48px 40px 52px;
  }
  .w233 {
    width: 233px;
    height: 40px;
    // float: right;
    margin-top: 4px;
    /deep/.ivu-input {
      height: 40px;
      font-size: 18px;
      color: #999999;
    }
  }
  // .ivu-form-item{
  //   position: relative;
  // }
  /deep/.ivu-form-item-label {
    font-size: 20px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
  }
  /deep/.ivu-select-selection {
    height: 40px;
    padding-top: 2px;
    font-size: 18px;
    color: #999999;
  }
}
</style>