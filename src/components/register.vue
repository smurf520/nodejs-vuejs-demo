<!--suppress ALL -->
<template>
  <div class="register">
    <div class="content">
      <el-form ref="regForm" :model="regForm" :rules="rules">
        <span style="font-size:18px;color:#409EFF;margin-bottom:10px;display:block;">用户注册</span>
        <el-form-item prop="email">
          <el-input type="text" v-model="regForm.email" placeholder="请输入邮箱" @blur="checkEmail(regForm)">
          </el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input type="text" v-model="regForm.name" placeholder="请输入昵称">
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" v-model="regForm.pwd" placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="rePwd">
          <el-input type="password" v-model="regForm.rePwd" placeholder="请再次输入密码" @blur="checkPwd(regForm)">
          </el-input>
        </el-form-item>
        <el-form-item prop="realName">
          <el-input type="text" v-model="regForm.realName" placeholder="请输入姓名">
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input type="text" v-model="regForm.phone" placeholder="请输入手机号" @blur="checkPhone(regForm)">
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="regist">注  册</el-button>
        <el-button type="success" @click="toLogin">跳到登录界面</el-button>
      </el-form>
    </div>

    <!--demo-->
    <!--<input v-model="name" type="text" placeholder="name……">-->
    <!--<input v-model="age"type="text"  placeholder="age……">-->
    <!--<button type="submit" class="btn btn-default" @click="insert">插入</button>-->
    <!--<a @click="goPage('/second')">Second</a>-->
    <!--<h1 @click="setTest">{{test}}</h1>-->
    <!--demo-->
  </div>
</template>
<script>
////  demo-------------------------------------------------------------------------------------
export default {
  name: "register",
  data() {
    return {
      regForm: {
        email: "",
        pwd: "",
        name: "",
        realName: "",
        phone: "",
        rePwd: ""
      },
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        email: [{ required: true, message: "请输入正确格式邮箱", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        realName: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        rePwd: [{ required: true, message: "请再次输入密码", trigger: "blur" }]
      },
    };
  },
  created() {
    // console.log("=============state", this.$store.getters.test);
    // console.log("=============state");
  },
  computed: {
    // test() {
    //   return this.$store.getters.test;
    // }
  },
  //  mounted(){
  //    this.$http.interceptors.push(function (request,next) {//全局拦截器
  //      console.log("request init")
  //      next(function (response) {
  //        console.log("response init")
  //        return response;
  //      });
  //  });
  //  },
  //  http:{
  //    root:"api/"
  //  },//可以把请求地址中的共同的东西提取出来放到root里面.然后路径里头直接写剩余的路径,全局路径配置
  methods: {
    insert() {
      //      this.$http.post("package.json",{
      //        userId:'102'
      //      },{
      //        headers:{
      //          access_token:'abc'
      //        }
      //      }).then(function (res) {
      //        console.log(res.data)
      //      },reason => {
      //        console.log("错误数据;",reason); // Error!
      //      })
      //      this.$http.jsonp('/url', {name:"abc"}) .then(function (res){
      //        console.log(res)
      //      }, function (res) {
      //        console.log(res)
      //      });//jsonp请求
      //      this.$http({//直接发送http请求
      //        url:"package.json",
      //        params:{
      //          userId:'103'
      //        },
      //        headers:{
      //          token:'123'
      //        },
      //        timeout:5,
      //        before:function () {
      //          console.log("before init")
      //        }
      //      }).then(function (res) {
      //        console.log(res.data)
      //      })
      //如果是用axious,如果是发送post请求,在http里头传参键写data,get请求键写params
    },
    checkEmail(value) {
      var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
      var check = reg.test(value.email);
      if (!check) {
        value.email = "";
      }
    },
    checkPhone(value) {
      var reg = /^1[34578]\d{9}$/;
      var check = reg.test(value.phone);
      if (!check) {
        value.phone = "";
      }
    },
    checkPwd(value) {
      if (value.pwd === value.rePwd) {
        return;
      } else {
        value.rePwd = "";
      }
    },
    regist() {
      const formName = "regForm";
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/api/login/regist", {
              //vue-resource的使用,headers里头注入token也行,在第三方网站的时候很有用,get请求,post请求,jsonp请求
              name: this.regForm.name,
              email: this.regForm.email,
              pwd: this.regForm.pwd,
              realName: this.regForm.realName,
              phone: this.regForm.phone
            })
            .then(
              res => {
                if (res && res.data && res.data.code === "000") {
                  this.$router.push("/login");
                } else if (res && res.data && res.data.code === "111") {
                  alert("注册失败");
                } else if (res && res.data && res.data.code === "300") {
                  alert("注册邮箱不能重复");
                }
              },
              err => {
                console.log("错误数据:", err); // Error!
              }
            );
        } else {
          return false;
        }
      });
    },
    toLogin() {
      this.$router.push("/login");
    }
    // setTest() {
    //   this.$store.dispatch("setTest");
    // }
  }
};
////  demo-------------------------------------------------------------------------------------
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.register {
  padding:0 100px;
  .content {
    width: 500px;
    margin: 0 auto;
    height: auto;
  }
}
</style>
<style lang="less">
.register {
  .el-input {
    margin-bottom: 10px;
  }
}
</style>

