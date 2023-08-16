// banner轮播图逻辑封装
import { getBannerAPI } from "@/apis/home";
import { onMounted, ref } from "vue";
export function useBanner() {
    const bannerList = ref([]);
    const getBanner = async () => {
        const res = await getBannerAPI({ distributionSite: "2" });
        // console.log(res);
        bannerList.value = res.data.result;
    };
    // 注意getBanner后面加（）
    onMounted(() => getBanner());
    // 路由钩子函数，也可以写在路由配置中
    // 目标：路由参数发生变化时，把分类数据接口重新发送
    // 存在问题：使用最新的路由参数请求最新的分类数据
    return {
        bannerList
    }
}
