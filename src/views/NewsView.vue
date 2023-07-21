<template>
  <HeadingSection :title="'News'" />
  <div v-if="!data?.length"></div>
  <div v-else class="grid grid-cols-4 gap-5">
    <div
      v-for="item in data"
      :key="item.id"
      class="rounded-md cursor-pointer hover:bg-dark-light p-3 group"
      @click="router.push(`/album/${item.id}`)"
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ConnectionInstance from '../api/main'
import HeadingSection from '../components/HeadingSection.vue'

const router = useRouter()

interface TopTracksType {
  collaborative: boolean
  description: string
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: { height: number | null; width: number | null; url: string }[]
  name: string
  owner: { display_name: string; external_urls: { spotify: string } }
  primary_color: null
  public: null
  snapshot_id: string
  tracks: { href: string; total: number }
  type: string
  uri: string
}

const data = ref<TopTracksType[]>([])

const handleFetchData = async () => {
  const response = await ConnectionInstance.get('/new-release', {
    params: {
      country: 'VN'
    }
  })
  data.value = response.data
}

onMounted(() => {
  handleFetchData()
})
</script>
