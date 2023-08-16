// category分类逻辑封装
import { getCategoryFilterAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
export function useCategory() {
    const categoryData = ref({});
    const route = useRoute();
    const getCategory = async (id = route.params.id) => {
        // console.log(route.params.id);
        const res = await getCategoryFilterAPI(id);
        // console.log(res);
        categoryData.value = res.data.result;
    };
    onMounted(() => getCategory());
    return {
        categoryData
    }
}
