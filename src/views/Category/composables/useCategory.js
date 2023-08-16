// category分类逻辑封装
import { getTopCategoryAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
export function useCategory() {
    const categoryData = ref({});
    const route = useRoute();
    const getCategory = async (id = route.params.id) => {
        // console.log(route.params.id);
        const res = await getTopCategoryAPI(id);
        // console.log(res);
        categoryData.value = res.data.result;
    };

    onBeforeRouteUpdate((to) => {
        // to 中保存了很多路由信息
        getCategory(to.params.id);
    });
    onMounted(() => getCategory());
    return {
        categoryData
    }
}
