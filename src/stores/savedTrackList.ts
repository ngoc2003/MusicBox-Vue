import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TrackType } from '@/typing/common'

interface SavedTrackLists {
  added_at: Date
  track: Pick<TrackType, 'track'>[]
}

export const useSavedTrackListStore = defineStore('savedTrackList', () => {
  const savedTrackList = ref<SavedTrackLists | null>(null)

  function updateSavedTrackList(newTrack: SavedTrackLists) {
    savedTrackList.value = newTrack
  }

  return { savedTrackList, updateSavedTrackList }
})
