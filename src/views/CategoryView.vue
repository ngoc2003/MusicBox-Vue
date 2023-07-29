<template>
  <div v-if="!data.length"></div>
  <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-5">
    <CardInformation
      v-for="item in data"
      :key="item.id"
      :image="item.icons[0].url"
      :name="item.name"
      @click="router.push(`/category/${item.id}`)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConnectionInstance from '../api/main'
import { useRouter } from 'vue-router'
import CardInformation from '../components/CardInformation.vue'
import { ImageType } from '../typing/common'

const router = useRouter()

interface CategoryType {
  href: string
  icons: ImageType[]
  id: string
  name: string
}
const data = ref<CategoryType[] | null>(null)

const handleFetchData = async () => {
  const response = await ConnectionInstance.get('/categories')
  data.value = response.data
}

handleFetchData()
</script>
