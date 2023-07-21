import { ref } from 'vue'
import { defineStore } from 'pinia'

interface TrackStoreType {
  id: string
  name: string
  preview_song: string
}

export const useTrackStore = defineStore('track', () => {
  const track = ref<TrackStoreType>({
    id: '',
    name: '',
    preview_song: ''
  })

  function updateTrack(newTrack: TrackStoreType) {
    track.value = newTrack
  }

  return { track, updateTrack }
})
