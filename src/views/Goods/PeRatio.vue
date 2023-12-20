<template>
<!-- 搜索 -->
<c-header></c-header>
  <!-- 基本信息 -->
  <div class="bg-white rounded-xl p-4 mb-4 mt-4" v-for="item in goods" :key="item.id">
    <!-- 基本信息 -->
    <div class="flex mt-3" @click="toDetail(item)">
      <img class="w-[50px] h-[50px] rounded-lg" :src="item.imgUrl" alt="商品图片">
      <div class="flex-1 mx-2">
        <div class="text-base font-semibold mb-3">{{ item.name }}</div>
        <div class="text-gray-300 text-[12px] mb-2">
          产品价格：
          <span class="font-semibold text-[#1A8CFF]">{{ item.price }} u</span>
        </div>
        <div class="text-gray-300 text-[12px]">
          通证价格：
          <span class="font-semibold text-[#1A8CFF]">{{ item.price }} u</span>
        </div>
      </div>
      <div class="w-[70px] h-10 self-end text-center leading-[40px]" :style="item.active ? topObj : downObj">{{ item.top }}</div>
    </div>
  </div>
</template>

<script setup>
import CHeader from '@/components/CHeader.vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const goods = reactive([
  {
    id: 1,
    active: true,
    top: '+1.56%',
    name: 'iphone 13 Pro',
    price: '1200',
    imgUrl: require('../../assets/img/bsc.jpg'),
  },
  {
    id: 2,
    active: false,
    top: '-1.56%',
    name: '英伦⻄装',
    price: '110',
    imgUrl: require('../../assets/img/tron.jpg')
  }
])
const topObj = {
  background: 'linear-gradient(180deg, rgba(0, 204, 136, 0.3) 0%, rgba(0, 204, 136, 0) 100%)',
  color: '#00CC88',
  borderTop: '2px solid #00CC88'
}
const downObj = {
  background: 'linear-gradient(180deg, rgba(230, 69, 69, 0.3) 0%, rgba(230, 69, 69, 0) 100%)',
  color: '#E64545',
  borderTop: '2px solid #E64545'
}

const toDetail = () => {
  router.push({
    path: '/good_detail'
  })
}


</script>

<style lang="scss" scoped>

</style>