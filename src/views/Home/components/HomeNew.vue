<script setup>
import {findNewAPI} from '@/apis/home';
import { onMounted,ref } from 'vue';
import HomePanel from '@/views/Home/components/HomePanel.vue';
const newList = ref([])
const getNewList = async() => {
  const res = await findNewAPI()
  // console.log(res);
  newList.value = res.data.result 
}
onMounted(()=>getNewList())
</script>
<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱" >
    <template #main>
      <ul class="goods-list">
        <li v-for="item in newList" :key="item.id">
          <RouterLink :to="`/detail/${item.id}`">
            <img  alt="" v-img-lazy="item.picture" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </HomePanel>
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 416px;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 10px;
      text-align: center;
      
    }
    .price {
        color: $priceColor;
      }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>