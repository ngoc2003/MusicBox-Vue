<template>
  <div
    class="flex w-full rounded-sm items-center mb-4 py-3 px-6 cursor-pointer text-grey text-sm group duration-200"
    :class="
      track.track.id === props.id
        ? 'bg-primary bg-opacity-70 text-white'
        : 'hover:bg-opacity-20 hover:bg-primary'
    "
  >
    <p class="w-4">{{ props.index }}</p>
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
}

const router = useRouter()
const track = useTrackStore()

const handleActiveTrack = () => {
  track.updateTrack({
    preview_song: props.preview_url,
    name: props.name,
    id: props.id
  })
}

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
