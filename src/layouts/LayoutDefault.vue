<template>
  <div class="h-screen flex flex-col w-full">
    <div class="flex overflow-hidden flex-1">
      <SideBarDefaultVue />
      <div class="flex-1 overflow-y-auto">
        <div class="wrapper">
          <TopSearchVue />
          <main><slot></slot></main>
        </div>
        <FooterDefaultVue />
      </div>
    </div>
    <PlayBoxDefaultVue />
  </div>
</template>

<script setup lang="ts">
import SideBarDefaultVue from './SideBarDefault.vue'
import FooterDefaultVue from './FooterDefault.vue'
import TopSearchVue from './TopSearch.vue'
import PlayBoxDefaultVue from './PlayBoxDefault.vue'
</script>

<style></style>
