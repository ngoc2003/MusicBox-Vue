<template>
  <div v-if="!data"></div>
  <div v-else>
    <div class="flex items-end my-10">
      <div class="w-[200px] rounded-md overflow-hidden">
        <img :src="data.artist.images[0].url" alt="" />
      </div>
      <div class="px-4">
        <p class="text-sm mb-3 text-grey capitalize">
          {{ data.artist.type }}
        </p>
        <p class="text-6xl font-bold mb-4">{{ data.artist.name }}</p>
        <p class="text-sm mb-3 text-grey">
          <span class="text-primary">
            {{ data.artist.followers.total }}
          </span>
          followers
        </p>
        <button
          v-if="!isFollowed"
          @click="handleFollowArtist"
          class="px-6 py-2 rounded-[999px] border border-primary text-primary duration-300 hover:bg-primary hover:text-white text-sm"
        >
          Follow
        </button>
        <button
          v-else
          @click="handleUnFollowArtist"
          class="px-6 py-2 rounded-[999px] border border-primary text-primary duration-300 hover:bg-primary hover:text-white text-sm"
        >
          Following
        </button>
      </div>
    </div>
    <div class="mt-10 py-4 border-t border-t-dark-light">
      <TrackPlay
        v-for="(item, index) in data.album"
        :key="item.id"
        :index="index + 1"
        :name="item.name"
        :duration_ms="item.duration_ms"
        :preview_url="item.preview_url"
        :id="item.id"
        :artist_name="item.artists.map((artist) => ({ id: artist.id, name: artist.name }))"
      />
    </div>
  </div>
  <RelatedArtistView />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import ConnectionInstance from '../api/main'
import TrackPlay from '../components/TrackPlay.vue'
import RelatedArtistView from '../sections/artist/RelatedArtist.vue'
import { ref, watch, onMounted } from 'vue'

const route = useRoute()
const artistId = ref<string>('')
const isFollowed = ref<boolean>(false)

interface Artist {
  isFollowed: boolean
  external_urls: { spotify: string }
  spotify: string
  followers: { href: null; total: number }
  genres: string[] // the loai
  href: string
  id: string
  images: { height: number; url: string; width: number }[]
  name: string
  popularity: 44
  type: string
  uri: string
}

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

interface Data {
  artist: Artist
  album: TrackType[]
}
const data = ref<Data | null>(null)

const handleFetchData = async () => {
  if (route.params.artistId) {
    const response = await ConnectionInstance.get('/artist/albums', {
      params: { artistId: artistId.value }
    })
    data.value = response.data
    if (data.value) {
      isFollowed.value = data.value.artist.isFollowed
    }
  }
}
const handleFollowArtist = async () => {
  isFollowed.value = true
  await ConnectionInstance.post('/artist/follow', {
    artistId: artistId.value
  })
}

const handleUnFollowArtist = async () => {
  isFollowed.value = false
  await ConnectionInstance.post('/artist/unfollow', {
    artistId: artistId.value
  })
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
