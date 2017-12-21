<template>
    <div class="home">
      <el-button type="primary" @click="logOut">注销登录</el-button>
    </div>
</template>

<script>
    export default {
      name: 'home',
      data: function () {
        return {
          userId: this.$route.query.userId
        }
      },
      created () {
        this.getSession()
        console.log('=============userId', this.userId)
      },
      methods: {
        getSession () {
          this.$http
            .post('/api/home')
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

<style scoped>

</style>
