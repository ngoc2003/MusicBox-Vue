<template>
  <HeadingSection :title="'Feature playlist'" />

  <div v-if="!data?.length"></div>
  <div v-else class="grid grid-cols-4 gap-5">
    <CardInformation
      v-for="item in data"
      :key="item.id"
      :image="item.images[0].url"
      :name="item.name"
      @click="router.push(`/playlist/${item.id}`)"
    />
  </div>
</template>

<script setup lang="ts">
import HeadingSection from '../../components/HeadingSection.vue'
import CardInformation from '../../components/CardInformation.vue'
import ConnectionInstance from '../../api/main'
import { ref, onMounted } from 'vue'
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
  const response = await ConnectionInstance.get('/feature-playlist', {
    params: {
      country: 'VN'
    }
  })
  data.value = response.data
})
</script>
