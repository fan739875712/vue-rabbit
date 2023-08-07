

<script setup>
import Nav from "@/views/Layout/components/Nav/index.vue";
import Header from "@/views/Layout/components/Header/index.vue";
import Footer from "@/views/Layout/components/Footer/index.vue";
import Fixed from '@/views/Layout/components/Fixed/index.vue'
import {useCategoryStore} from '@/stores/category'
import { onBeforeMount, onMounted } from "vue";
const categoryStore =  useCategoryStore()
onBeforeMount(()=>{
  categoryStore.getCategory()
  console.log("layout");
})
</script>
<template>
  <Nav />
  <Fixed />
  <Header />
  <RouterView />
  <Footer />
</template>
<style>
</style>