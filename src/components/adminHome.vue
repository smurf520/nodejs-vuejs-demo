<template>
    <div class="adminHome">
  管理员主页
      <el-button type="primary" @click="logOut">注销登录</el-button>
    </div>
</template>

<script>
    export default {
      name: '',
      data () {
        return {}
      },
      created () {
        this.getSession()
        console.log('=============userId', this.userId)
      },
      methods: {
        getSession () {
          this.$http
            .post('/api/adminHome')
            .then(
              res => {
                if (!res.data.login) {
                  this.$router.push('/login')
                }
              },
              err => {
                console.log('错误数据:', err) // Error!
              }
            )
        },
        logOut () {
          this.$http
            .post('/api/login/logout')
            .then(
              res => {
                if (res && res.data && res.data.code === '000') {
                  this.$router.push('/login')
                } else {
                  alert('注销失败')
                  return
                }
              },
              err => {
                console.log('错误数据:', err)
              }
            )
        }
      }
    }
</script>

<style scoped lang="less">
.adminHome{

}
</style>
