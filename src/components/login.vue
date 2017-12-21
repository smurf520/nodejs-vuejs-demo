<template>
  <div class="login">
    <div class="content">
      <el-form ref="regForm" :model="regForm" :rules="rules">
        <span style="font-size:18px;color:#409EFF;margin-bottom:10px;display:block;">用户登录</span>
        <el-form-item prop="email">
          <el-input type="text" v-model="regForm.email" placeholder="请输入邮箱">
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" v-model="regForm.pwd" placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="primary" @click="regist">注册</el-button>
      </el-form>
    </div>
    <div class="adminLogin">
      <el-form ref="adminRegForm" :model="adminRegForm">
        <span style="font-size:18px;color:#409EFF;margin-bottom:10px;display:block;">管理员登录</span>
        <el-form-item>
          <el-input type="text" v-model="adminRegForm.email" placeholder="请输入邮箱">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="adminRegForm.pwd" placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="adminLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      regForm: {
        email: '',
        pwd: ''
      },
      adminRegForm: {
        adminEmail: '',
        adminPwd: ''
      },
      rules: {
        email: [{ required: true, message: '请输入正确格式邮箱', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login () {
      const formName = 'regForm'
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post('/api/login/login', {
              email: this.regForm.email,
              pwd: this.regForm.pwd
            })
            .then(
              res => {
                if (res && res.data && res.data.code === '000') {
                  this.$router.push({ path: '/', query: { userId: res.data.userId } })
                } else if (res.data.code === '111') {
                  alert('登录失败')
                  return
                }
              },
              err => {
                console.log('错误数据:', err) // Error!
              }
            )
        } else {
          return false
        }
      })
    },
    adminLogin: function () {
      const formName = 'adminRegForm'
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post('/api/login/adminLogin', {
              email: this.adminRegForm.email,
              pwd: this.adminRegForm.pwd
            })
            .then(
              res => {
                if (res && res.data && res.data.code === '000') {
                  this.$router.push({path: '/adminHome', query: {userId: res.data.userId}})
                } else if (res.data.code === '111') {
                  alert('登录失败')
                  return
                }
              },
              err => {
                console.log('错误数据:', err) // Error!
              }
            )
        } else {
          return false
        }
      })
    },
    regist () {
      this.$router.push('/register')
    }
  }
}
</script>
<style scoped lang="less">
.login {
  .content {
    width: 500px;
    margin: 0 auto;
    height: auto;
  }
  .adminLogin{
    width: 500px;
    margin: 0 auto;
    height: auto;
    margin-top: 30px;
  }
}
</style>
<style lang="less">
.login {
  .el-input {
    margin-bottom: 5px;
  }
}
</style>

