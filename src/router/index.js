import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Category from '@/views/Category/index.vue'
import Home from '@/views/Home/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue';
import Pay from '@/views/Pay/index.vue';
import PayBack from '@/views/Pay/PayBack.vue';
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue';
import Sku from '@/components/Sku/Sku.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // linkActiveClass:"active",
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          component: Home,
        },
        {
          name: 'category',
          path: '/category/:id',
          props: true,
          component: Category,
        },
        {
          name: 'subcategory',
          path: '/category/sub/:id',
          component: SubCategory,
        },
        {
          name: 'detail',
          path: '/detail/:id',
          component: Detail,
        },
        {
          name: 'cartlist',
          path: '/cartlist',
          component: CartList,
        },
        {
          name: 'checkout',
          path: '/checkout',
          component: Checkout,
        },
        {
          name: 'pay',
          path: '/pay',
          component: Pay,
        }
        ,
        {

          path: '/paycallback',
          component: PayBack,
        },
        {

          path: '/member',
          component: Member,
          children: [
            {
              path: '',
              component: UserInfo
            },
            {
              path: 'order',
              component: UserOrder
            }

          ]
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
    ,
    // 最后一个Sku组件的路由，方便最后调试使用。
    {
      path: '/Sku',
      component: Sku
    }
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
