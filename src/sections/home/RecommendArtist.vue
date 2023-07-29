<template>
  <HeadingSection :title="'Recommend artist'" />

  <div v-if="!data?.length"></div>
  <div v-else class="grid lg:grid-cols-2 xxl:grid-cols-3 gap-5">
    <div
      v-for="item in data"
      :key="item.id"
      class="rounded-md overflow-hidden group relative cursor-pointer"
      @click="router.push(`/artist/${item.id}`)"
    >
      <div class="h-20 flex w-full">
        <div class="w-20 overflow-hidden relative">
          <img
            :src="item.images[0].url"
            class="w-full object-cover duration-200 group-hover:scale-110"
            alt=""
          />
          <PlayIcon
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-primary hover:scale-125 duration-200 opacity-0 group-hover:opacity-100"
            :size="40"
          />
        </div>
        <div class="flex-1 bg-dark-light px-5 flex items-center">
          <h1 class="font-semibold text-sm">
            {{ item.name }}
          </h1>
        </div>
      </div>
      <div class="absolute inset-0 bg-[rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from 'vue-material-design-icons/Play.vue'
import HeadingSection from '../../components/HeadingSection.vue'
import ConnectionInstance from '../../api/main'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CommonType, ImageType } from '../../typing/common'

interface RecommendArtistType extends CommonType {
  images: ImageType[]
  followers: {
    href: string | null
    total: number
  }
  genres: string[]
  popularity: number
}

const router = useRouter()

const data = ref<RecommendArtistType[]>([])

onMounted(async () => {
  const response = await ConnectionInstance.get('/your-top-artists')
  data.value = response.data
})
</script>
