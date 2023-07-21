<template>
  <p class="text-2xl my-10 font-semibold text-primary">{{ props.title }}</p>
</template>

<script setup lang="ts">
interface HeadingSectionProps {
  title: string
}
const props = defineProps<HeadingSectionProps>()
</script>
