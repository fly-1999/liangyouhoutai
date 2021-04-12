<template>
  <div>
    <div slot="select02">
      <div class="setSearchBox">
        <!-- 搜索框 以及搜索功能都不要了，功能和样式都写好了 -->
        <!--  <Input placeholder="搜索" @on-change="search" style="width: 40%">
          <Icon type="ios-search" slot="prefix" />
        </Input> -->
        <Button @click="create()">新增</Button>
        <span class="conHotline" @click="HotLSet()">
          客服电话：{{ telNumbersOld }}
        </span>
      </div>
      <!-- 用户的表格 -->
      <div class="userList">
        <Table
          border
          ref="selection"
          @on-selection-change="handleSelectRow()"
          :columns="columns"
          :data="UsersData"
        >
          <template slot-scope="{ row }" slot="name">
            {{ row.name }}
          </template>
          <template slot-scope="{ row }" slot="action">
            <Button
              type="primary"
              size="small"
              class="editAndDel"
              style="margin-right: 3px"
              @click="edit(row)"
              >修改</Button
            >
            <Button type="error" class="editAndDel" size="small" @click="remove(row)">删除</Button>
          </template>
        </Table>
        <div class="delAndPage">
          <Button class="selectDel" @click="selectDel" size="large"
            >多选删除</Button
          >
          <Page
            :total="dataCount"
            :page-size="this.userPage.pageSize"
            :current="this.userPage.pageNum"
            @on-change="PageChange"
            show-total
            show-elevator
            class="page"
          ></Page>
        </div>
      </div>
      <!-- 修改or增加用户弹窗 -->
      <Modal
        v-model="editUser"
        class-name="vertical-center-modal"
        :styles="{ width: '26%',  }"
        footer-hide
      >
        <EditUser
          :isCreate="isCreate"
          ref="child"
          @edit-submit="editSubmit"
          @edit-cancel="editCancel"
          @event-init="eventInit"
        ></EditUser>
      </Modal>
      <!-- 删除用户弹窗 -->
      <Modal
        class-name="Center-modal"
        v-model="DelShow"
        :styles="{ width: '24%', minWidth: '300px' }"
        footer-hide
      >
        <div class="h236" style="text-align: center">
          <p>删除此用户</p>
        </div>
        <Divider />
        <div class="disFlex">
          <Button class="delBut" type="primary" @click="DelOk()">确定</Button>
          <Button class="delBut" @click="DelCancel()">取消</Button>
        </div>
      </Modal>
      <!-- 修改客服电话的对话框 -->
      <Modal
        class-name="HotLineCenter"
        v-model="setHotShow"
        :styles="{ width: '460px' }"
        footer-hide
      >
        <div class="h200">
          <p class="setMtp">修改客服电话</p>
          <div class="setMtp">
            <span>电话：</span>
            <Input v-model="telNumbers" class="w200"/>
          </div>
        </div>
        <div class="disFlex pd20">
          <Button class="delBut" type="primary" @click="HotLOK()">确定</Button>
          <Button class="delBut" @click="HotLCancel()">取消</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import EditUser from "./editUser.vue";
import api from "@/api/index.js";
const { setting } = api;
export default {
  name: "select02",
  components: { EditUser },
  data() {
    return {
      searchData: [],
      telNumbers: "",
      telNumbersOld: "",
      /* 控制对话框的显示隐藏 */
      editUser: false, // 修改用户信息的对话框
      DelShow: false, //删除用户的对话框
      setHotShow: false, //修改客服电话的对话框
      isCreate: false, // 判断是新增还是修改
      /* 表头数据 */
      columns: [
        {
          type: "selection",
          width: 80,
          align: "center"
        },
        {
          title: "用户名",
          slot: "name"
        },
        {
          title: "用户名类型",
          key: "role"
        },
        {
          title: "种类",
          key: "kind"
        },
        {
          title: "密码",
          key: "password"
        },
        {
          title: "操作",
          slot: "action",
          // width: 280,
          align: "center"
        }
      ],
      UsersRes: [] /* UsersRes存get请求下来用户的数据，用于computed中 */,
      /* 用户账号数据 在computed */
      // UsersData:[
      //   {
      //     id:1,
      //     name:"",
      //     role:"",
      //     kind:"",
      //     password:""
      //     roleId:,
      //   }
      // ],
      userPage: {
        pageNum: 1,
        pageSize: 9
      },
      dataCount: 0,
      rowDate: {}, // 存储当行数据
      delUserId: [], //需要删除用户的id
      userIds: [], //多选删除
      delSelect: false
    };
  },
  methods: {
    /* 获取多选删除的数据 */
    handleSelectRow() {
      let rowData = this.$refs.selection.getSelection();
      let userId = "";
      let userIdList = [];
      this.userIds = [];
      for (var i = 0; i < rowData.length; i++) {
        this.userIds = rowData[i].id;
        if (rowData.length > 1) {
          userId = this.userIds + "," + userId;
          userIdList = [userId.slice(0, -1)].toString();
          this.userIds = userIdList.split(",");
        } else {
          userId = this.userIds;
        }
      }
    },
    selectDel() {
      if (this.userIds.length === 0) {
        alert("请选择需要删除的账号");
        return;
      } else {
        this.delSelect = true;
        this.DelShow = true;
      }
    },
    /* 新增or修改用户 */
    create() {
      this.editUser = true;
      this.isCreate = true;
      this.eventInit(); // 初始化rowData
      this.$refs.child.userDateB = this.rowDate;
      // 清除子组件选择框的value
      this.$refs.child.modelA = this.rowDate.role;
      this.$refs.child.modelB = this.rowDate.kind;
      this.$refs.child.maxID = this.UsersData.length;
    },
    edit(row) {
      this.editUser = true;
      this.isCreate = false;
      if (row) {
        this.rowDate = row;
        this.$refs.child.userDateB = this.rowDate;
        this.$refs.child.modelA = this.rowDate.role;
        this.$refs.child.modelB = this.rowDate.kind;
      }
    },
    editSubmit(data) {
      this.editUser = false;
      // 提交之前进行判断是创建还是修改
      if (this.isCreate) {
        setting.postCreate(data).then(res => {
          location.reload();
        });
      } else {
        setting.putUpDate(data).then(res => {
          location.reload();
        });
      }
    },
    editCancel() {
      this.editUser = false;
    },
    eventInit() {
      this.rowDate = {
        id: "",
        name: "",
        role: "",
        kind: "",
        password: ""
      };
    },
    /* 删除部分 */
    // 删除按钮
    remove(row) {
      this.DelShow = true;
      this.rowDate = row;
      this.delSelect = false;
    },
    DelCancel() {
      this.DelShow = false;
      this.delSelect = false;
    },
    DelOk() {
      this.delUserId = [];
      this.delUserId.push(this.rowDate.id);
      if (this.delSelect) {
        // 统一发出去
        Promise.all([
          ...this.userIds.map(item => setting.deleteUser([item]))
        ]).finally(res => {
          location.reload();
        });
      } else {
        setting.deleteUser(this.delUserId).then(res => {
          location.reload();
        });
      }
      this.DelShow = false;
    },
    /* 修改客服电话 */
    HotLOK() {
      let phone = {};
      phone.phone = this.telNumbers;
      setting.putPhone(phone).then(res => {
        this.telNumbersOld = res.contact;
        this.telNumbers = res.contact;
      });
      this.setHotShow = false;
    },
    HotLCancel() {
      this.setHotShow = false;
    },
    HotLSet() {
      this.setHotShow = true;
    },
    search() {
      if (!event.target.value) {
        this.searchData = [];
      } else {
        var result = this.UsersRes.users.filter(item => {
          let reg = new RegExp(`${event.target.value}`);
          return reg.test(item["user"].account);
        });
        if (result.length === 0) {
          this.searchData = null;
        } else {
          this.searchData = result;
        }
      }
    },
    // 获取分页数据
    PageChange(page) {
      this.userPage.pageNum = page;
      setting.getUsers(this.userPage).then(res => {
        this.UsersRes = res;
      });
    }
  },
  computed: {
    UsersData: function() {
      if (Array.isArray(this.UsersRes.users)) {
        if (!this.searchData) return [];
        if (this.searchData.length === 0) {
          return this.UsersRes.users.map(item => {
            return {
              id: item["user"].id,
              // roleId: item["role"][0] ? item["role"][0].id : "",
              name: item["user"].username,
              role: item["role"][0] ? item["role"][0].desc : "",
              kind: item["enterpriseRole"][0]
                ? item["enterpriseRole"][0].desc
                : "",
              password: item["user"].password
            };
          });
        } else {
          return this.searchData.map(item => {
            return {
              id: item["user"].id,
              // roleId: item["role"][0] ? item["role"][0].id : "",
              name: item["user"].account,
              role: item["role"][0] ? item["role"][0].desc : "",
              kind: item["enterpriseRole"][0]
                ? item["enterpriseRole"][0].desc
                : "",
              password: item["user"].password
            };
          });
        }
      }
      return [];
    }
  },
  mounted() {
    setting.getUsers(this.userPage).then(res => {
      this.UsersRes = res;
      let lastPage = {};
      lastPage.pageNum = this.UsersRes.totalPage;
      lastPage.pageSize = this.userPage.pageSize;
      setting.getUsers(lastPage).then(res => {
        this.dataCount =
          lastPage.pageSize * (lastPage.pageNum - 1) + res.users.length;
      });
    });
    setting.getPhone().then(res =>{
      this.telNumbers = res.contact;
      this.telNumbersOld = res.contact;
    })
  }
};
</script>

<style lang="less" scoped>
.w200{
  width: 200px;
}
.pd20 {
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
}
/deep/.editAndDel{
  span{
    display: block;
    width: 100% ;
    height: 100%;
    line-height: 30px;
    font-size: 18px !important;
  }
}
.delBut {
  width: 80px;
  height: 38px;
  text-align: center;
  font-size: 18px;
  font-family: Adobe Heiti Std;
  font-weight: normal;
  /deep/span {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 25px;
  }
}
.disFlex:after {
  contain: "";
  display: block;
  clear: both;
}
.selectDel {
  margin-top: 20px;
  color: #999999;
  font-family: Adobe Heiti Std;
  font-weight: normal;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  box-shadow: 0 0 0 2px transparent;
}
.selectDel:hover {
  color: #fff;
  background-color: #ed4014;
}
.selectDel span {
  width: 100%;
  height: 100%;
}

.h236 {
  height: 236px;
  line-height: 236px;
  font-size: 30px;
  font-family: Adobe Heiti Std;
  font-weight: normal;
  color: #333333;
}
.h200 {
  // padding: 20px ;
  padding-top: 20px;
  font-size: 24px;
  text-align: center;
  font-family: Adobe Heiti Std;
  font-weight: normal;
  color: #333;
}
.setMtp {
  margin-top: 20px;
  margin-bottom: 50px;
  /deep/.ivu-input {
    height: 40px;
    font-size: 18px;
    color: #999999;
  }
}
/deep/.Center-modal,
/deep/.vertical-center-modal {
  .ivu-modal-body {
    padding: 50px 50px 40px 50px;
  }
}
/deep/.ivu-form-item:last-of-type {
  margin: 0 !important;
  padding: 24px 0 0 0;
}
/deep/.ivu-form-item-content {
  margin-left: 0 !important;
}
/deep/.delBut.ivu-btn.ivu-btn-default {
  float: right;
}
.delAndPage {
  display: block;
  width: 100%;
  position: absolute;
  bottom: 20px;
}
.page {
  position: absolute;
  right: 5rem;
}
</style>
