<template>
  <HeadingSection :title="'Your tracks'" />

  <div v-if="!data.length"></div>

  <div v-else class="grid grid-cols-2 gap-x-4">
    <TrackPlay
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
  </div>
</template>

<script setup lang="ts">
import HeadingSection from '../../components/HeadingSection.vue'
import ConnectionInstance from '../../api/main'
import { ref, onMounted } from 'vue'
import TrackPlay from '../../components/TrackPlay.vue'

interface Short_ArtistType {
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  name: string
  type: string
  uri: string
}

interface RecommendTrackType {
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
  disc_number: number
  duration_ms: number
  explicit: boolean
  available_markets: string[]
  external_ids: {
    isrc: string
  }
  external_urls: {
    spotify: string
  }
  artists: Short_ArtistType[]
  album: {
    id: string
    album_type: string
    artists: Short_ArtistType[]
    available_markets: string[]
    external_urls: {
      spotify: string
    }
    href: string
    images: {
      height: number
      url: string
      width: number
    }[]
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
  }
}

const data = ref<RecommendTrackType[]>([])

onMounted(async () => {
  const response = await ConnectionInstance.get('/your-top-tracks')
  data.value = response.data
})
</script>
