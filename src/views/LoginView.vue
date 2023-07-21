<template>
  <div class="grid place-items-center h-screen">
    <div class="flex flex-col items-center">
      <img class="w-40 rotate-6" src="../assets/logo.svg" alt="" />
      <p class="text-3xl font-semibold my-10">Welcome to Musicbox</p>
      <button @click="handleLogin" class="text-lg p-4 bg-primary rounded-[99px] font-semibold">
        Sign in with Spotify
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConnectionInstance from '../api/main'

const handleLogin = () => {
  ConnectionInstance.get('/login').then((response) => {
    window.location.replace(response.data)
  })
}
</script>
