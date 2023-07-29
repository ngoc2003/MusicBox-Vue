<template>
  <div class="text-center relative">
    <input
      type="range"
      name=""
      class="range-song"
      min="0"
      step="0.5"
      @change="handleChangTime"
      :value="audioInfo.currentTime"
      :max="audioInfo.duration"
      :class="!track.track.name && 'pointer-events-none'"
    />
    <audio
      ref="audioRef"
      :onEndedCapture="onEndedCapture"
      className="hidden"
      hidden
      :onTimeupdate="onTimeUpdateCapture"
      :src="track.track.preview_song"
      :loop="isRepeat"
      :autoPlay="false"
    ></audio>
    <div class="flex py-1 px-2 sm:px-4 md:px-8">
      <div class="flex-1 flex items-center">
        <div class="w-10 h-10 md:w-14 md:h-14 rounded-sm overflow-hidden">
          <img
            :src="track.track.preview_image"
            v-if="track.track.preview_image"
            class="object-cover"
          />
        </div>
        <div class="text-left ml-3">
          <p class="text-xs sm:text-sm">{{ track.track.name }}</p>
          <p>
            <span
              class="text-xs sm:text-sm text-grey hover:text-primary cursor-pointer hover:underline"
              @click="() => router.push(`/artist/${author.id}`)"
              v-for="(author, index) in track.track.author"
              :key="author.name"
              >{{ author.name }} {{ index !== track.track.author.length - 1 ? ', ' : '' }}</span
            >
          </p>
        </div>
      </div>
      <div
        class="md:flex-2 inline-grid grid-cols-3 gap-1 sm:gap-2 md:gap-5 place-items-center wrapper"
      >
        <OpenInNewIcon
          :size="22"
          class="duration-300"
          :class="{
            'text-primary -rotate-180': isRepeat,
            'pointer-events-none': !track.track.name
          }"
          @click="handleOpenTrackInSpotify"
        />
        <PlayIcon
          :size="36"
          class="text-primary"
          v-if="!isPlay"
          @click="handlePlay"
          :class="!track.track.name && 'pointer-events-none'"
        />
        <StopIcon
          :size="36"
          class="text-primary"
          v-else
          @click="handleStop"
          :class="!track.track.name && 'pointer-events-none'"
        />
        <ReplayIcon
          :size="22"
          class="duration-300"
          :class="{
            'text-primary -rotate-180': isRepeat,
            'pointer-events-none': !track.track.name
          }"
          @click="handleToggleRepeat"
        />
      </div>
      <div class="hidden md:block flex-1"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from 'vue-material-design-icons/Play.vue'
import ReplayIcon from 'vue-material-design-icons/Replay.vue'
import StopIcon from 'vue-material-design-icons/Stop.vue'
import OpenInNewIcon from 'vue-material-design-icons/OpenInNew.vue'
import { ref, watch, reactive } from 'vue'
import { useTrackStore } from '../stores/track'
import { useRouter } from 'vue-router'

interface AudioInfoType {
  duration: number
  currentTime: number
}

const router = useRouter()

const track = useTrackStore()
const audioRef = ref<HTMLAudioElement | null>(null)

const isPlay = ref<boolean>(false)
const isRepeat = ref<boolean>(false)

const audioInfo = reactive<AudioInfoType>({
  duration: 0,
  currentTime: 0
})

const handleOpenTrackInSpotify = () => {
  window.open(track.track.url, '_blank')
}

const handlePlay = () => {
  isPlay.value = true
  audioRef.value.play()
}

const handleStop = () => {
  isPlay.value = false
  audioRef.value.pause()
}

const handleToggleRepeat = () => {
  isRepeat.value = !isRepeat.value
}

const onTimeUpdateCapture = () => {
  audioInfo.currentTime = +audioRef.value.currentTime.toFixed()
}

const onEndedCapture = () => {
  if (!isRepeat.value) {
    audioInfo.currentTime = 0
    isPlay.value = false
  }
}

const onLoadedMetadataCapture = () => {
  audioInfo.duration = audioRef.value.duration
}

const handleChangTime = () => {
  const input: HTMLInputElement = document.querySelector('.range-song')
  audioRef.value.currentTime = +input.value
}

watch(track, () => {
  handlePlay()
  if (audioRef.value) {
    audioRef.value.addEventListener('loadedmetadata', onLoadedMetadataCapture)
    audioRef.value.volume = 0.1
  }
})

watch(audioInfo, () => {
  if (audioInfo.currentTime === +audioInfo.duration.toFixed() && isRepeat.value) {
    audioInfo.currentTime = 0
  }
})
</script>

<style>
.range-song {
  @apply appearance-none bg-grey cursor-pointer h-[1px] absolute top-0 right-0 left-0;
}
.range-song::-webkit-slider-thumb {
  @apply appearance-none bg-primary h-4 w-4 rounded-full cursor-pointer;
}
.range-song::-webkit-slider-thumb {
  @apply bg-primary;
}
</style>
