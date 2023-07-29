<template>
  <div v-if="!user.user?.accessToken"></div>
  <div v-else class="flex items-center justify-between">
    <div class="border-b border-b-dark-light py-2 -mt-2 w-full max-w-[450px] flex items-center">
      <MagnifyIcon class="text-grey mr-2" />
      <input
        v-model="searchValue"
        @keyup.enter="handleNavigateToSearchPage"
        type="text"
        class="bg-transparent outline-none"
        placeholder="Search"
      />
    </div>
    <div class="h-9 w-9 rounded-full overflow-hidden">
      <img :src="user.user.image" class="object-cover" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import { useUserStore } from '../stores/user'
const user = useUserStore()

const router = useRouter()

const searchValue = ref<string>('')

const handleNavigateToSearchPage = () => {
  router.push(`/search?q=${searchValue.value}`)
}
</script>
