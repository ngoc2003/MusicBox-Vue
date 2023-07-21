<template>
  <div v-if="!data?.length"></div>
  <TrackPlay
    v-else
    v-for="(item, index) in data"
    :key="item.id"
    :index="index + 1"
    :name="item.name"
    :duration_ms="item.duration_ms"
    :preview_url="item.preview_url"
    :id="item.id"
    :artist_name="item.artists.map((artist) => ({ id: artist.id, name: artist.name }))"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import ConnectionInstance from '../api/main'
import TrackPlay from '../components/TrackPlay.vue'
import { ref, watch, onMounted } from 'vue'

const route = useRoute()
const artistId = ref<string>('')

interface TrackType {
  artists: {
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
  }[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  is_local: boolean
  name: string
  preview_url: string
  track_number: 11
  type: string
  uri: string
  //   uri: 'spotify:track:45MHwM7Bw9zHe0iKVBvoHB'
}
const data = ref<TrackType[]>([])

const handleFetchData = async () => {
  if (route.params.artistId) {
    const response = await ConnectionInstance.get('/artist-albums', {
      params: { artistId: artistId.value }
    })
    data.value = response.data
  }
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
