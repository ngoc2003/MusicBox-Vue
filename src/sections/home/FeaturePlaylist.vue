<template>
  <HeadingSection :title="'Feature playlist'" />

  <div v-if="!data?.length"></div>
  <div v-else class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-5">
    <CardInformation
      v-for="item in data"
      :key="item.id"
      :image="item.images[0].url"
      :name="item.name"
      @click="router.push(`/playlist/${item.id}`)"
    />
  </div>
</template>

<script setup lang="ts">
import HeadingSection from '../../components/HeadingSection.vue'
import CardInformation from '../../components/CardInformation.vue'
import ConnectionInstance from '../../api/main'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { AlbumType, CommonType } from '../../typing/common'

interface FeaturePlaylistType extends Omit<AlbumType, 'owner'>, CommonType {
  owner: CommonType
  tracks: { href: string; total: number }
}

const router = useRouter()

const data = ref<FeaturePlaylistType[]>([])

onMounted(async () => {
  const response = await ConnectionInstance.get('/feature-playlist', {
    params: {
      country: 'VN'
    }
  })
  data.value = response.data
})
</script>
