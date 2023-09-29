<script setup>
import { useUserStore } from './stores'
import router from '@/router'
// import { useRouter } from 'vue-router'
// const router = useRouter()
// const route = useRoute()
const goList = () => {
  router.push('list')
}
const userStore = useUserStore()
</script>

<template>
  <div>
    <hr />
    <router-view></router-view>
    <hr />
    我是App
    <el-button type="primary" @click="goList">跳转</el-button>
    <br />
    <br />
    <br />
    {{ userStore.token }}
    <el-button
      type="primary"
      @click="userStore.setToken('sdsddsdsdsdsdssdoids')"
      >登录</el-button
    >
    <el-button type="primary" @click="userStore.removeToken">退出</el-button>
  </div>
</template>

<style scoped></style>
