<template>
  <div v-if="!data?.length"></div>
  <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5">
    <div
      v-for="item in data"
      :key="item.id"
      class="rounded-md cursor-pointer hover:bg-dark-light p-3 group"
      @click="router.push(`/playlist/${item.id}`)"
    >
      <div class="rounded-md overflow-hidden relative">
        <img class="w-full h-full object-cover" :src="item.images[0].url" alt="" />
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
import { useRoute, useRouter } from 'vue-router'
import { CommonType, ImageType } from '../typing/common'

const router = useRouter()
const route = useRoute()

interface CategoryDetailType extends CommonType {
  images: ImageType[]
  collaborative: boolean
  description: string
  owner: { display_name: string; external_urls: { spotify: string } }
  primary_color: null
  public: null
  snapshot_id: string
  tracks: { href: string; total: number }
}

const data = ref<CategoryDetailType[] | null>(null)

const handleFetchData = async () => {
  const response = await ConnectionInstance.get('/category-detail', {
    params: { categoryId: route.params.categoryId }
  })
  data.value = response.data
}

handleFetchData()
</script>
