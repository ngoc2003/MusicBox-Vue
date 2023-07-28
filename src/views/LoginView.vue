<template>
  <div class="grid place-items-center h-screen">
    <div class="flex flex-col items-center">
      <img class="w-40 rotate-6" src="../assets/logo.svg" alt="" />
      <p class="text-3xl font-semibold my-10">Welcome to Musicbox</p>
      <button @click="handleLogin" class="text-lg p-4 bg-primary rounded-[99px] font-semibold">
        Sign in with Spotify
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConnectionInstance from '../api/main'
import { useUserStore } from '../stores/user'
import { useSavedTrackListStore } from '../stores/savedTrackList'
import { CommonType, ImageType, TrackType } from '../typing/common'

const user = useUserStore()
const savedTrackList = useSavedTrackListStore()

interface SavedTrackListType {
  added_at: Date
  track: TrackType[]
}

const handleLogin = () => {
  ConnectionInstance.get('/login').then((response) => {
    let popup = window.open(
      `${response.data}&show_dialog=true`,
      'Login with Spotify',
      'width=800,height=600'
    )

    window.addEventListener('message', (event) => {
      if (event.source === popup) {
        user.updateUser(event.data)
        ConnectionInstance.get('/save/track').then((response) => {
          console.log(response.data)
          savedTrackList.updateSavedTrackList(response.data)
        })
      }
    })
  })
}
</script>
