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
    :url="item.external_urls.spotify"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConnectionInstance from '../api/main'
import { useRoute } from 'vue-router'
import TrackPlay from '../components/TrackPlay.vue'
import { CommonType, ExtendsInformation } from '../typing/common'

interface AlbumTrackType extends CommonType, ExtendsInformation {
  artists: CommonType[]}

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
