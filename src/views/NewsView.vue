<template>
  <HeadingSection :title="'News'" />
  <div v-if="!data?.length"></div>
  <div v-else class="grid grid-cols-4 gap-5">
    <CardInformation
      v-for="item in data"
      :key="item.id"
      :image="item.images[0].url"
      :name="item.name"
      @click="router.push(`/album/${item.id}`)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ConnectionInstance from '../api/main'
import HeadingSection from '../components/HeadingSection.vue'
import CardInformation from '../components/CardInformation.vue'

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
