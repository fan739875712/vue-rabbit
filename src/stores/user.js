import { defineStore } from 'pinia';
import { loginAPI } from "@/apis/user";
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { mergeCartAPI } from '@/apis/cart';
export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()
    // 1.定义管理用户数据的state
    const userInfo = ref({})
    // 2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password });
        // console.log(res);
        userInfo.value = res.result
        // 合并购物车
        await mergeCartAPI(cartStore.cartList.map((item) => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }  
        }))
        cartStore.updateNewList()
    }
    // 清除用户数据
    const clearUserInfo = () => {
        userInfo.value = {}
        // 清楚购物车逻辑
        cartStore.clearCart()
    }
    // 3.以对象格式把staus和action return
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }

}, { persist: true })