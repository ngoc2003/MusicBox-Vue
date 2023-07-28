<template>
  <div class="pt-10">
    <div v-if="!data"></div>

    <div v-else>
      <div class="flex items-end">
        <div class="w-[200px] rounded-md overflow-hidden">
          <img :src="data.images[0].url" alt="" />
        </div>
        <div class="px-4">
          <p class="text-6xl font-bold mb-4">{{ data.name }}</p>
          <p class="text-sm mb-3 text-grey">
            <span class="text-primary">
              {{ data.followers.total }}
            </span>
            followers
          </p>
          <p>{{ data.description }}</p>
        </div>
      </div>
      <div class="mt-10 py-4 border-t border-t-dark-light">
        <TrackPlay
          v-for="(item, index) in data.tracks.items"
          :key="item.track.id"
          :index="index + 1"
          :preview_image="item.track.album.images[0].url"
          :name="item.track.name"
          :duration_ms="item.track.duration_ms"
          :preview_url="item.track.preview_url"
          :id="item.track.id"
          :artist_name="item.track.artists.map((artist) => ({ id: artist.id, name: artist.name }))"
          :url="item.track.external_urls.spotify"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import ConnectionInstance from '../api/main'
import TrackPlay from '../components/TrackPlay.vue'
import { AlbumType, CommonType, ImageType, TrackType } from '../typing/common'

const route = useRoute()

interface PlaylistType extends Omit<AlbumType, 'owner'> {
  followers: {
    href: string | null
    total: number
  }
  owner: CommonType
  tracks: {
    href: string
    items: TrackType[]
  }
}

const data = ref<PlaylistType | null>(null)

const handleFetchData = async () => {
  const response = await ConnectionInstance.get('/playlist', {
    params: { playlistId: route.params.playlistId }
  })
  data.value = response.data
}

handleFetchData()
</script>
