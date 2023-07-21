<template>
  <HeadingSection :title="'Feature playlist'" />

  <div v-if="!data?.length"></div>
  <div v-else class="grid grid-cols-4 gap-5">
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
import PlayIcon from 'vue-material-design-icons/Play.vue'
import HeadingSection from '../../components/HeadingSection.vue'
import ConnectionInstance from '../../api/main'
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()

interface FeaturePlaylistType {
  collaborative: boolean
  description: string
  external_urls: { spotify: string }
  href: string
  id: string
  images: [
    {
      height: number | null
      url: string
      width: number | null
    }
  ]
  name: string
  owner: {
    display_name: string
    external_urls: { spotify: string }
    href: string
    id: string
    type: string
    uri: string
  }
  primary_color: null
  public: null
  snapshot_id: string
  tracks: { href: string; total: number }
  type: string
  uri: string
}
const data = ref<FeaturePlaylistType[]>([])

onMounted(async () => {
  const user = useUserStore()
  if (!user.user.name) return
  try {
    const response = await ConnectionInstance.get('/feature-playlist', {
      params: {
        country: 'VN'
      }
    })
    data.value = response.data
  } catch (err) {
    console.log(err)
  }
})
</script>
