<template>
  <div v-if="!data.length"></div>

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
    :showArtist="true"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConnectionInstance from '../api/main'
import { useRoute } from 'vue-router'
import TrackPlay from '../components/TrackPlay.vue'

interface AlbumTrackType {
  artists: [
    {
      external_urls: { spotify: string }
      href: string
      id: string
      name: string
      type: string
      uri: string
    }
  ]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_urls: { spotify: string }
  href: string
  id: string
  is_local: boolean
  name: string
  preview_url: string
  track_number: number
  type: string
  uri: string
}
const route = useRoute()
const data = ref<AlbumTrackType[] | null>(null)

const handleFetchData = async () => {
  const response = await ConnectionInstance.get('/album-tracks', {
    params: { albumId: route.params.albumId }
  })
  data.value = response.data
}

handleFetchData()
</script>
