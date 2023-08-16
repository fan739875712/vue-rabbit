import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart';
export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    // 1.state
    // const cartList = ref([])
    var cartList = ref([])
    // 
    const isLogin = computed(() => userStore.userInfo.token)
    // 2.action
    // 3.添加购物车操作
    const addCart = async (goods) => {
        if (isLogin.value) {
            // 解构赋值一个请求使用的新对象
            const { skuId, count } = goods
            // 登录后加入购物车逻辑
            // 1.加入购物车，获取最新列表覆盖
            await insertCartAPI({ skuId, count })
            updateNewList()
        } else {
            // 判断是否已经添加过 使用find
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            // 方法二
            // const res = cartList.value.map((item)=>{
            //     if(goods.skuId === item.skuId){
            //         return item
            //     }

            // })
            // console.log(res);  
            // console.log(item);
            if (item) {
                // 找到了
                item.count++
            } else {
                cartList.value.push(goods)
            }
        }

    }
    // 单选逻辑
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => skuId === item.skuId)
        item.selected = selected
    }
    // 删除购物车
    const delCart = async (skuId) => {
        if (isLogin.value) {
            // 登录后删除方式
            await delCartAPI([skuId])
            updateNewList()
        } else {
            // 思路：在数组中删除某一项1.找到要删除的下标值 -splice 2.使用数组的过滤方法 filter 
            const idx = cartList.value.find((item) => skuId === item.skuId)
            const res = cartList.value.filter((item) => item.skuId === skuId)
            //  console.log(res);
            cartList.value.splice(res, 1)
        }


    }
    const clearCart = ()=>{
        cartList.value = []
    }
    // 获取最新购物车列表
    const updateNewList = async()=>{
        // 重新请求cartlist
        const res = await findNewCartListAPI()
        // 覆盖
        cartList.value = res.result
    }
    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }
    // 计算属性
    // 1.总的数量 所有项的count之和
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    // 2.总价格 所有项目的count*price之和
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    // 全选数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))


    return {
        addCart,
        cartList,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList
    }
}, { persist: true })