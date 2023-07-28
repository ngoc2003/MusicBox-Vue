import { ref } from 'vue'
import { defineStore } from 'pinia'

interface TrackStoreType {
  id: string
  name: string
  preview_song: string
  preview_image: string
  url: string
  author: {
    name: string
    id: string
  }[]
}

export const useTrackStore = defineStore('track', () => {
  const track = ref<TrackStoreType>({
    id: '',
    name: '',
    preview_song: '',
    preview_image: '',
    url: '',
    author: [
      {
        name: '',
        id: ''
      }
    ]
  })

  function updateTrack(newTrack: TrackStoreType) {
    track.value = newTrack
  }

  return { track, updateTrack }
})
