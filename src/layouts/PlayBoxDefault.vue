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
    <div class="inline-grid grid-cols-5 gap-5 place-items-center wrapper">
      <ShuffleIcon
        :size="28"
        :class="{
          'text-primary': isSuffle,
          'pointer-events-none': !track.track.name
        }"
        @click="handleToggleShuffle"
      />
      <SkipPreviousIcon :size="28" :class="!track.track.name && 'pointer-events-none'" />
      <PlayIcon
        :size="32"
        class="text-primary"
        v-if="!isPlay"
        @click="handlePlay"
        :class="!track.track.name && 'pointer-events-none'"
      />
      <StopIcon
        :size="32"
        class="text-primary"
        v-else
        @click="handleStop"
        :class="!track.track.name && 'pointer-events-none'"
      />
      <SkipNextIcon :size="28" :class="!track.track.name && 'pointer-events-none'" />
      <ReplayIcon
        :size="28"
        class="duration-300"
        :class="{
          'text-primary -rotate-180': isRepeat,
          'pointer-events-none': !track.track.name
        }"
        @click="handleToggleRepeat"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from 'vue-material-design-icons/Play.vue'
import SkipPreviousIcon from 'vue-material-design-icons/SkipPrevious.vue'
import SkipNextIcon from 'vue-material-design-icons/SkipNext.vue'
import ReplayIcon from 'vue-material-design-icons/Replay.vue'
import ShuffleIcon from 'vue-material-design-icons/Shuffle.vue'
import StopIcon from 'vue-material-design-icons/Stop.vue'
import { ref, watch, reactive } from 'vue'
import { useTrackStore } from '../stores/track'

interface AudioInfoType {
  duration: number
  currentTime: number
}

const track = useTrackStore()
const audioRef = ref<HTMLAudioElement | null>(null)

const isPlay = ref<boolean>(false)
const isRepeat = ref<boolean>(false)
const isSuffle = ref<boolean>(false)

const audioInfo = reactive<AudioInfoType>({
  duration: 0,
  currentTime: 0
})

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

const handleToggleShuffle = () => {
  isSuffle.value = !isSuffle.value
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
