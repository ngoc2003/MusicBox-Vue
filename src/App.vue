<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutDefaultVue from './layouts/LayoutDefault.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
</script>

<template>
  <RouterView v-if="route.path === '/login'" />
  <LayoutDefaultVue v-else>
    <RouterView />
  </LayoutDefaultVue>
</template>
