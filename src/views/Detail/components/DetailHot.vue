<script setup>
import { computed, onMounted, ref } from "vue";
import { fetchHotGoodsAPI } from "@/apis/detail";
import { useRoute } from "vue-router";

const HotList = ref([]);
const route = useRoute();
const props = defineProps({
  hotType: {
    // 看请求需要什么类型就传什么类型
    type: Number,
  },
});
const getHotList = async () => {
  const res = await fetchHotGoodsAPI({
    // id当前组件所在的路由的id
    id: route.params.id,
    type: props.hotType,
  });
  HotList.value = res.result;
};
onMounted(() => getHotList());
const TITLEMAP = {
  1: "24小时热榜",
  2: "周热榜",
};
const title = computed(() => TITLEMAP[props.hotType]);
</script>


<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink
      :to="`/detail/${item.id}`"
      class="goods-item"
      v-for="item in HotList"
      :key="item.id"
    >
      <!-- limit 默认请求了3条数据 -->
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>