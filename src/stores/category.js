import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'
export const useCategoryStore = defineStore('category', () => {
  
  let categoryList = ref([]);
  const getCategory = async () => {
    const res = await getCategoryAPI();
    // console.log(res);
    // console.log(res.data.result);
    categoryList.value = res.result;

    // console.log(categoryList);
  };

  return { categoryList, getCategory }
})
