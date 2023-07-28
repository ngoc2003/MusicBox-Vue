<template>
  <div
    class="flex w-full rounded-sm items-center mb-4 py-3 px-6 cursor-pointer text-grey text-sm group duration-200"
    :class="
      track.track.id === props.id
        ? 'bg-primary bg-opacity-70 text-white'
        : 'hover:bg-opacity-20 hover:bg-primary'
    "
  >
    <p class="w-6 h-full relative">
      <HeartOutlineIcon
        class="opacity-0 z-20 group-hover:opacity-100 duration-100 absolute -ml-1"
        @click="handleLikeTrack"
      />
      <HeartIcon
        class="opacity-0 z-20 group-hover:opacity-100 duration-100 absolute -ml-1"
        @click="handleUnlikeTrack"
      />
      <span class="group-hover:opacity-0 z-10 duration-100">
        {{ props.index }}
      </span>
    </p>
    <div class="flex items-center flex-1">
      <img
        v-if="props.preview_image"
        @click="handleActiveTrack"
        :src="props.preview_image"
        class="ml-4 w-10 h-10 object-cover rounded-sm"
        alt=""
      />
      <h1 class="ml-4 text-white flex-1">
        <p @click="handleActiveTrack">
          {{ props.name }}
        </p>
        <p class="text-grey text-sm">
          <span
            v-for="(artist, index) in props.artist_name"
            :key="artist.id"
            class="hover:text-primary hover:underline"
            @click="() => router.push(`/artist/${artist.id}`)"
          >
            {{ artist.name }}
            <span v-if="index !== props.artist_name.length - 1">, </span>
          </span>
        </p>
      </h1>
    </div>
    <p>
      {{ time }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { intervalToDuration } from 'date-fns'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTrackStore } from '../stores/track'
import HeartIcon from 'vue-material-design-icons/Heart.vue'
import HeartOutlineIcon from 'vue-material-design-icons/HeartOutline.vue'

interface Props {
  index: number
  preview_url: string
  preview_image?: string
  name: string
  duration_ms: number
  id: string
  artist_name: {
    name: string
    id: string
  }[]
  showArtist?: boolean
  url: string
}

const router = useRouter()
const track = useTrackStore()

const handleActiveTrack = () => {
  track.updateTrack({
    preview_song: props.preview_url,
    preview_image: props?.preview_image || '',
    name: props.name,
    id: props.id,
    url: props.url,
    author: props.artist_name
  })
}

const handleLikeTrack = () => {}
const handleUnlikeTrack = () => {}

const props = defineProps<Props>()

const time = ref('')

const formattedDuration = () => {
  const duration = intervalToDuration({ start: 0, end: props.duration_ms })
  time.value = `${duration.minutes}:${
    duration.seconds < 10 ? '0' + duration.seconds : duration.seconds
  }`
}

onMounted(async () => {
  formattedDuration()
})
</script>
