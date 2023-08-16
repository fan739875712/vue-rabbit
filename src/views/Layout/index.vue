

<script setup>
import Nav from "@/views/Layout/components/LayoutNav.vue";
import Header from "@/views/Layout/components/Header/index.vue";
import Footer from "@/views/Layout/components/LayoutFooter.vue";
import Fixed from '@/views/Layout/components/LayoutFixed.vue'
import {useCategoryStore} from '@/stores/category'
import { onBeforeMount, onMounted } from "vue";
const categoryStore =  useCategoryStore()
onBeforeMount(()=>{
  categoryStore.getCategory()
})
</script>
<template>
  <Nav />
  <Fixed />
  <Header />
  <RouterView />
  <!-- <RouterView :key="$route.fullPath"/> -->

  <Footer />
</template>
<style>
</style>