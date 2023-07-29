<template>
  <HeadingSection :title="'News'" />
  <div v-if="!data?.length"></div>
  <div v-else class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 xl:gap-5">
    <CardInformation
      v-for="item in data"
      :key="item.id"
      :image="item.images[0].url"
      :name="item.name"
      @click="router.push(`/album/${item.id}`)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ConnectionInstance from '../api/main'
import HeadingSection from '../components/HeadingSection.vue'
import CardInformation from '../components/CardInformation.vue'
import { AlbumType } from '../typing/common'

const router = useRouter()

interface NewReleaseAlbumType extends AlbumType {
  tracks: { href: string; total: number }
}

const data = ref<NewReleaseAlbumType[]>([])

const handleFetchData = async () => {
  const response = await ConnectionInstance.get('/new-release', {
    params: {
      country: 'VN'
    }
  })
  data.value = response.data
}

onMounted(() => {
  handleFetchData()
})
</script>
