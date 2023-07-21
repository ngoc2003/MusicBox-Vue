<template><div></div></template>

<script setup lang="ts">
import { useUserStore } from '../stores/user'
import axios from 'axios'
import { onMounted } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const user = useUserStore()

const urlSearchParams = new URLSearchParams(window.location.search)
const code = urlSearchParams.get('code')

onMounted(() => {
  if (!user.user.accessToken) {
    axios.post('http://localhost:4000/code', { code }).then((response) => {
      user.updateUser(response.data)
      const d = new Date()
      d.setTime(d.getTime() + response.data.expiredIn)
      const expires = 'expires=' + d.toUTCString()
      document.cookie = 'access_token=' + response.data.accessToken + ';' + expires + ';path=/'
      localStorage.setItem('musicBox_refresh', response.data.refreshToken)
      router.push('/')
    })
  }
})
</script>
