<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutDefaultVue from './layouts/LayoutDefault.vue'
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'
import { useUserStore } from './stores/user'

const user = useUserStore()
const route = useRoute()
const router = useRouter()

watch(user, () => {
  if (user.user.accessToken) {
    router.push('/')
  }
})
</script>

<template>
  <RouterView v-if="route.path === '/login'" />
  <LayoutDefaultVue v-else>
    <RouterView />
  </LayoutDefaultVue>
</template>
