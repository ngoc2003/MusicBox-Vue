<template>
  <div v-if="!data.length"></div>
  <div v-else class="grid grid-cols-4 gap-5">
    <div
      v-for="item in data"
      :key="item.id"
      class="rounded-md cursor-pointer hover:bg-dark-light p-3 group"
      @click="router.push(`/category/${item.id}`)"
    >
      <div class="rounded-md overflow-hidden relative">
        <img class="w-full h-full object-cover" :src="item.icons[0].url" alt="" />
        <PlayIcon
          :size="40"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group-hover:opacity-100 opacity-0 duration-200"
        />
        <div
          class="absolute bg-[rgba(0,0,0,0.5)] inset-0 group-hover:opacity-100 opacity-0 duration-200"
        ></div>
      </div>
      <p class="pt-2 text-lg">
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConnectionInstance from '../api/main'
import { useRouter } from 'vue-router'
const router = useRouter()

interface CategoryType {
  href: string
  icons: [
    {
      height: number
      url: string
      width: 275
    }
  ]
  id: string
  name: string
}
const data = ref<CategoryType[] | null>(null)

const handleFetchData = async () => {
  const response = await ConnectionInstance.get('/categories')
  data.value = response.data
}

handleFetchData()
</script>
