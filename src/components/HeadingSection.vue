<template>
  <p class="text-xl md:text-2xl my-6 lg:my-10 font-semibold text-primary">{{ props.title }}</p>
</template>

<script setup lang="ts">
interface HeadingSectionProps {
  title: string
}
const props = defineProps<HeadingSectionProps>()
</script>
