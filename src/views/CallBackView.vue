<template><div></div></template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'

const urlSearchParams = new URLSearchParams(window.location.search)
const code = urlSearchParams.get('code')

onMounted(() => {
  axios.post('http://localhost:4000/code', { code }).then((response) => {
    const d = new Date()
    d.setTime(d.getTime() + response.data.expiredIn)
    const expires = 'expires=' + d.toUTCString()
    document.cookie = 'access_token=' + response.data.accessToken + ';' + expires + ';path=/'
    localStorage.setItem('musicBox_refresh', response.data.refreshToken)
    window.opener.postMessage(response.data, '*')
    window.close()
  })
})
</script>
