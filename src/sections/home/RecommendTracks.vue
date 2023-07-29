<template>
  <HeadingSection :title="'Your tracks'" />

  <div v-if="!data.length"></div>

  <div v-else class="grid xl:grid-cols-2 gap-x-4">
    <TrackPlay
      v-for="(item, index) in data"
      :key="item.id"
      :index="index + 1"
      :name="item.name"
      :duration_ms="item.duration_ms"
      :preview_url="item.preview_url"
      :preview_image="item.album.images[0].url"
      :id="item.id"
      :artist_name="item.artists.map((artist) => ({ id: artist.id, name: artist.name }))"
      :showArtist="true"
      :url="item.external_urls.spotify"
    />
  </div>
</template>

<script setup lang="ts">
import HeadingSection from '../../components/HeadingSection.vue'
import ConnectionInstance from '../../api/main'
import { ref, onMounted } from 'vue'
import TrackPlay from '../../components/TrackPlay.vue'
import { CommonType, ExtendsInformation, ImageType } from '../../typing/common'

interface RecommendTrackType extends CommonType, ExtendsInformation {
  popularity: number
  external_ids: {
    isrc: string
  }
  artists: CommonType[]
  album: CommonType & {
    images: ImageType[]
    artists: CommonType[]
    album_type: string
    available_markets: string[]
    release_date: string
    release_date_precision: string
    total_tracks: number
  }
}

const data = ref<RecommendTrackType[]>([])

onMounted(async () => {
  const response = await ConnectionInstance.get('/your-top-tracks')
  data.value = response.data
})
</script>
