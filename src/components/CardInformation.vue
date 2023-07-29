<template>
  <div class="rounded-md cursor-pointer hover:bg-dark-light p-2 md:p-3 group">
    <div class="rounded-md relative h-[100px] md:h-[200px] overflow-hidden">
      <img
        class="duration-300 w-full h-full object-cover group-hover:scale-110"
        :src="props.image"
        alt=""
      />
      <PlayIcon
        :size="40"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group-hover:opacity-100 opacity-0 duration-200"
      />
      <div
        class="absolute bg-[rgba(0,0,0,0.5)] inset-0 group-hover:opacity-100 opacity-0 duration-200"
      ></div>
    </div>
    <p class="pt-2 text-sm md:text-base lg:text-lg">
      {{ props.name }}
    </p>
  </div>
</template>

<script setup lang="ts">
import PlayIcon from 'vue-material-design-icons/Play.vue'
interface CardInformationProps {
  image: string
  name: string
}
const props = defineProps<CardInformationProps>()
</script>
