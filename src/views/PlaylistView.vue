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
          :name="item.track.name"
          :duration_ms="item.track.duration_ms"
          :preview_url="item.track.preview_url"
          :id="item.track.id"
          :artist_name="item.track.artists.map((artist) => ({ id: artist.id, name: artist.name }))"
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

const route = useRoute()

interface PlaylistType {
  collaborative: boolean
  description: string
  external_urls: {
    spotify: string
  }
  followers: {
    href: null
    total: number
  }
  href: string
  id: string
  images: {
    height: null
    url: string
    width: null
  }[]
  name: string
  owner: {
    display_name: string
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    type: string
    uri: string
  }
  primary_color: string
  public: boolean
  snapshot_id: string
  tracks: {
    href: string
    items: {
      added_at: string
      added_by: {
        external_urls: {
          spotify: string
        }
        href: string
        id: string // return ""
        type: string
        uri: string
      }
      is_local: false
      primary_color: null
      track: {
        album: {
          album_type: 'single'
          artists: [
            {
              external_urls: {
                spotify: string
              }
              href: string
              id: string
              name: string
              type: string
              uri: string
            },
            {
              external_urls: {
                spotify: string
              }
              href: string
              id: string
              name: string
              type: string
              uri: string
            }
          ]
          available_markets: string[]
          external_urls: {
            spotify: string
          }
          href: string
          id: string
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
        episode: false
        explicit: false
        external_ids: {
          isrc: 'FR26V2002662'
        }
        external_urls: {
          spotify: string
        }
        href: string
        id: '1ak1TfinvG9VaFKwn98bSA'
        is_local: false
        name: string
        popularity: number
        preview_url: string
        track: boolean
        track_number: number
        type: string
        uri: string
      }
      video_thumbnail: {
        url: null
      }
    }[]
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
