<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import RecommendArtistVue from '../sections/home/RecommendArtist.vue'
import RecommendTracksVue from '../sections/home/RecommendTracks.vue'
import FeaturePlaylist from '../sections/home/FeaturePlaylist.vue'
const user = useUserStore()

const router = useRouter()
</script>

<template>
  <RecommendArtistVue />
  <RecommendTracksVue />
  <FeaturePlaylist />
</template>
