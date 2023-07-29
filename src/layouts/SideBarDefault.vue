<template>
  <header class="h-full bg-dark-light py-8 lg:wrapper lg:min-w-[280px]">
    <div class="px-4">
      <span class="items-end cursor-pointer hidden lg:flex" @click="router.push('/')">
        <img src="../assets/logo.svg" alt="" class="mr-2 rotate-6" />
        <span class="text-lg font-semibold text-primary">Musicbox</span>
      </span>
      <div class="mt-8 text-white">
        <RouterLink
          :to="item.path"
          :class="{
            'text-primary': route.path === item.path
          }"
          class="flex py-4 hover:text-primary cursor-pointer duration-100 rounded-lg font-semibold justify-center lg:justify-start"
          v-for="item in NavList"
          :key="item.title"
        >
          <component :is="item.icon"></component>
          <span class="ml-4 hidden lg:block">
            {{ item.title }}
          </span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import HomeIcon from 'vue-material-design-icons/Home.vue'
import MusicNoteIcon from 'vue-material-design-icons/MusicNote.vue'
import CollageIcon from 'vue-material-design-icons/Collage.vue'

const route = useRoute()

const router = useRouter()

const NavList = [
  {
    title: 'Home',
    icon: HomeIcon,
    path: '/'
  },
  {
    title: 'New',
    icon: MusicNoteIcon,
    path: '/new'
  },
  {
    title: 'Category',
    icon: CollageIcon,
    path: '/category'
  }
]

const MyMusicList = [
  {
    title: 'Like tracks',
    path: '/like'
  }
]
</script>

<style></style>
