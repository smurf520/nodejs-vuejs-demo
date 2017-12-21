<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<!--然后在 App.vue 使用组件 ( 因为在 index.html 里面定义了<div id="app"></div>所以就以这个组件作为主入口，方便 )-->

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
