<template>
  <HeadingSection :title="'Related artist'" />

  <div v-if="!data?.length"></div>
  <div v-else class="grid grid-cols-4 gap-5">
    <CardInformation
      v-for="item in data"
      :key="item.id"
      :image="item.images[0].url"
      :name="item.name"
      @click="router.push(`/artist/${item.id}`)"
    />
  </div>
</template>

<script setup lang="ts">
import HeadingSection from '../../components/HeadingSection.vue'
import ConnectionInstance from '../../api/main'
import CardInformation from '../../components/CardInformation.vue'
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const route = useRoute()

const artistId = ref<string>('')

interface RecommendArtistType {
  external_urls: {
    spotify: string
  }
  followers: {
    href: string | null
    total: number
  }
  genres: string[]
  href: string
  id: string
  images: {
    height: number
    url: string
    width: number
  }[]
  name: string
  popularity: number
  type: string
  uri: string // "spotify:artist:code"
}
const data = ref<RecommendArtistType[]>([])

const handleFetchData = async () => {
  const response = await ConnectionInstance.get('/artist/related', {
    params: {
      artistId: artistId.value
    }
  })
  data.value = response.data
}

onMounted(() => {
  artistId.value = route.params.artistId + ''
  handleFetchData()
})

watch(
  () => route.params.artistId,
  (newValue: string) => {
    artistId.value = newValue
    handleFetchData()
  }
)
</script>
