<template>
<!-- 搜索 -->
<c-header v-model="searchVal"></c-header>
<!-- 商品信息 -->
<div class="bg-white rounded-xl p-4 mb-4" v-for="item in goods" :key="item.id">
  <div class="flex justify-between items-center border-b pb-2">
    <div class="text-[#999] text-[12px]">{{ item.buy.time }}</div>
    <div class="text-[12px] font-semibold" :class="item.active ? 'text-[#1A8CFF]' : 'text-[#999]'">{{ item.isDelivery  }}</div>
  </div>
  <!-- 基本信息 -->
  <div class="flex mt-3" >
    <img class="w-[50px] h-[50px] rounded-lg" :src="`//unishop.mypinata.cloud/ipfs/${item.logo}`" >
    <div class="flex-1 mx-2">
      <div class="text-base font-semibold mb-3">{{ item.name }}</div>
      <div class="text-gray-500 text-[12px]">
        产品价格：
        <span class="font-semibold text-black">{{ item.buy.price }}</span> u
      </div>
    </div>
    <div class="text-[#ccc] self-end text-xs">x{{item.buy.count}}</div>
  </div>
  <!-- 总计 -->
  <div class="text-xs text-right mt-4 mb-3 text-[#ccc]">总计：
    <span class="text-sm font-semibold text-[#1A8CFF]">
      <!-- {{new BigNumber(item.buy.price).times(item.buy.count).toString()}} -->
      {{item.buy.total}}
      </span>
    <span class="text-xs text-[#1A8CFF]"> $</span>
  </div>
  <!-- 详细信息 -->
  <div  class="mt-3 border-t pt-3">
    <template v-if="item.buy?.courierCode" ><div class="flex items-center justify-between mb-2" >
      <div class="text-[#999] text-sm">快递编号：</div>
      <div class="text-[#333] text-sm">{{item.buy?.courierCode}}</div>
    </div><div class="flex items-center justify-between mb-2" >
      <div class="text-[#999] text-sm">商品通证价格：</div>
      <div class="text-[#333] text-sm">{{item.price}}</div>
    </div><div class="flex items-center justify-between mb-2" >
      <div class="text-[#999] w-40 text-sm">通证合约地址：</div>
      <div class="text-[#333] flex-1 text-sm break-all">{{productChainAddress(chainType)}}</div>
    </div></template>
    
    <!-- 按钮 -->
    <div class="flex items-center text-white mt-4">
      <van-button @click="onShareIt(item)" class="rounded-lg w-24 h-8" size="small" block color="linear-gradient(135deg, #1AB3FF 0%, #1A8BFF 100%)">
      分享
      </van-button>
      <van-button @click="showTel" class="rounded-lg w-24 h-8 mx-7" size="small" block color="linear-gradient(135deg, #FFAA33 0%, #FA7D00 100%)">
        电话
      </van-button>
      <van-button @click="toCommunityShow=true" class="rounded-lg w-24 h-8" size="small" block color="linear-gradient(135deg, #2BD99E 0%, #0ABF64 100%)">
        B2S股东群
      </van-button>
    </div>
    <div class="w-24 text-center text-[10px] text-[#ccc]">可获得5%奖励</div>
  </div>
  <van-popup v-model:show="toCommunityShow">
   
      <img class=" bg-white" :src="`//unishop.mypinata.cloud/ipfs/${item.qrCode}`"/>
    
  </van-popup>
  <van-popup v-model:show="telShow">
    <div class="w-screen h-[100px] text-center leading-[100px]">
      <van-icon name="phone-o" color="blue"></van-icon>
      <a :href="`tel:${item.phone}`" underline>
        {{item.phone}}
      </a>
    </div>
  </van-popup>
</div>
<ShareAlert v-model:isShowOverly="isShowOverly" :imgUrl="imgUrl" :activeRow="activeRow"></ShareAlert>
</template>

<script setup>
  import ShareAlert from '@/components/ShareAlert'
  import { productChainAddress } from "@/web3/config";
import CHeader from '@/components/CHeader.vue'
import { computed, onMounted,reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useChainStore } from "@/store";
import { storeToRefs } from "pinia";
import useProduct from "@/web3/contract/useProduct";
import { Toast } from 'vant';
// import BigNumber from 'bignumber.js';
const chain = useChainStore();
let { connectionInstance, chainType } = storeToRefs(chain);
const { connected, web3, userAddress, tronProductChainContract } = storeToRefs(
  connectionInstance.value
);
const imgUrl = ref("");
const isShowOverly = ref(false);
const toCommunityShow = ref(false);
const activeRow = reactive({ item: {} });
const { getOrderList,getuAddress } = useProduct({
  userAddress,
  web3,
  type: chainType,
  tronProductChainContract,
});
const router = useRouter();
const telShow = ref(false)
const searchVal = ref ('')
const ordersList = ref([])
const goods = computed(()=>{
  console.log('333',searchVal.value)
  if(searchVal.value){

    return ordersList.value.filter(e=>e['name'].includes(searchVal))
  }
 return ordersList.value
})
// eslint-disable-next-line no-unused-vars
const toDetail = () => {
  router.push({
    path: '/good_detail'
  })
}
// 分享
const onShareIt =  (item) => {
  console.log('item: ', item);
  const url =
      window.location.origin +
      window.location.pathname +
      `#/good_detail_video?erc20Addr=${item.erc20Addr}&chianType=${chain.chainType}&video=${item.video}&preAddress=${userAddress.value}`;
    activeRow.item = { ...item, url };
    imgUrl.value = url
    isShowOverly.value = true;
};
// 电话yt
const showTel = () => {
  telShow.value = !telShow.value
}
// 前往社群
// const toCommunity = () => {
//   window.open('https://t.me/UNISHOPCOINS')
// }
const initData =async ()=>{
  await getuAddress()
  getOrderList().then(res=>{
    console.log('getOrders res',res)
    ordersList.value= res 
  })
}
const handleClickConnectWallet = async (isAlert = true) => {
  Toast.loading({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });
  try {
    await connectionInstance.value.onConnect(
      chain.chainType,
      () => {
        initData();
      },
      isAlert
    );
    Toast.clear();
  } catch (error) {
    Toast.clear();
  }
};
onMounted(() => {
  if (!connected.value) {
    handleClickConnectWallet();
  } else {
    initData();
  }
});
</script>

<style lang="scss" scoped>

</style>