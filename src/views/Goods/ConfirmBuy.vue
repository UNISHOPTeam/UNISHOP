<template>
  <div class="bg-[#F5F7FA]]">
    <div class="flex justify-between items-center text-gray-900 text-sm px-4 pt-4">
      <span>通证合约地址：</span>
      <span class="text-xs break-all">{{ productErc20Address }} </span>
    </div>
    <div class="flex  items-center ">
      <div class="flex-1 flex justify-center">
        <div class="text-base font-semibold text-dark-900 p-4 flex-1">件数：
          <van-stepper @change="onChangeStake" v-model="productCount" />
        </div>
      </div>
      <div class="text-base font-semibold text-dark-900 p-4 flex-1">价格：<span class="text-[#1A8CFF] font-bold">{{
          new BigNumber(productCount).times(priceUrl).toString()
      }}
          U</span></div>
    </div>
    <!-- <CCard class="mx-0 p-4">
      <div class="flex rounded-xl border-2 border-[#CCE6FF] p-2 text-base text-[#ccc]">
        <input type="text" placeholder="输入合约地址" class="bg-transparent flex-1">
        <div @click="showPopup"
          class="w-[96px] h-8 rounded-lg bg-[#E6F2FF] text-black flex items-center justify-between px-1">
          <span>{{ biName }}</span>
          <van-icon class="" name="arrow-down"></van-icon>
        </div>
      </div>
    </CCard> -->

    <div class="text-base font-semibold text-dark-900 p-4">收件人信息</div>
    <CCard class="mx-0 p-4">
      <van-cell-group>
        <van-field v-model="form.name" input-align="right" label="收货人姓名：" placeholder="请输入收货人姓名" />
        <van-field v-model="form.address" input-align="right" label="收货人地址：" placeholder="请输入收货人地址" />
        <van-field v-model="form.tel" input-align="right" type="tel" label="收货人号码：" placeholder="请输入收货人电话号码" />
      </van-cell-group>
    </CCard>

    <div class="mt-20 bottom-24 left-10 w-[295px] h-10 m-auto">
      <van-button block round color="linear-gradient(135deg, #1AB3FF 0%, #1A8BFF 100%)" @click="handleSubmit">
        {{ !isUApprove ? "请先授权U" : "确认购买" }}
      </van-button>
    </div>
    <!-- 弹出层 -->
    <van-popup class="p-2" v-model:show="show" position="bottom" :style="{ height: '50%' }">
      <input class="bg-[#F5F5F5] rounded-lg h-10 w-[100%] px-2 mb-3" placeholder="搜索名称或粘贴地址" type="text">
      <div class="tags">
        <van-tag v-for="item in list" :key="item.name" text-color="#333" :color="item.active ? '#E6F2FF' : '#F5F5F5'"
          :class="item.active ? border : ''" size="large" class="mr-2 mb-2 rounded-lg w-[110px] h-8"
          @click="handleChange(item)">
          <template #default>
            <img class="w-4 h-4 mr-2" :src="item.logo" alt="logo">{{ item.name }}
          </template>
        </van-tag>
      </div>
      <div class="border mb-3"></div>
      <div>
        <div v-for="item in list" :key="item.name"
          class="flex justify-between items-center text-[#333] text-sm mb-3 px-2">
          <div>
            <img class="w-4 h-4 mr-2 inline align-middle" :src="item.logo" alt="logo">
            <span class="text-xs">
              {{ item.name }}
              <span class="text-[#ccc] text-xs"> / {{ item.desc }}</span>
            </span>
          </div>
          <span>{{ item.num }}</span>
        </div>
      </div>
      <div class="mt-4">
        <van-button class="bg-[#E6F2FF] text-[#1A8CFF] font-medium text-xs rounded-lg" icon="plus" block>添加自己的新代币
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import CCard from '@/components/CCard.vue';
// eslint-disable-next-line no-unused-vars
import BigNumber from 'bignumber.js';
import { useRoute, useRouter } from "vue-router";
import { reactive, ref, computed, onMounted } from 'vue'
import { useChainStore } from "@/store";
import { storeToRefs } from "pinia";
import { Toast } from "vant";
import useProduct from "@/web3/contract/useProduct";
const router = useRouter()
const route = useRoute();
const chain = useChainStore();
let { connectionInstance, chainType } = storeToRefs(chain);
const { connected, web3, userAddress } = storeToRefs(connectionInstance.value);
let biName = ref('U');
const isUApprove = ref(true);


let productCount = ref(1);

let form = reactive({
  name: '',
  address: '',
  tel: ''
})

const list = ref([
  {
    logo: require('@/assets/crossChainBridge/ic_btc@2x.png'),
    name: 'BTC',
    desc: 'BTC',
    num: '0.00',
    active: true
  },
  {
    logo: require('@/assets/crossChainBridge/ic_bth@2x.png'),
    name: 'BCH',
    desc: 'BCH',
    num: '0.00',
    active: false
  },
  {
    logo: require('@/assets/crossChainBridge/ic_eth_mainnet@2x.png'),
    name: 'MAINNET',
    desc: 'ETH',
    num: '0.00',
    active: false
  }, {
    logo: require('@/assets/crossChainBridge/ic_eth_arbitrum@2x.png'),
    name: 'ARBITRUM',
    desc: 'ETH',
    num: '0.00',
    active: false
  }, {
    logo: require('@/assets/crossChainBridge/ic_eth_optimism@2x.png'),
    name: 'OPTIMISM',
    desc: 'ETH',
    num: '0.00',
    active: false
  }, {
    logo: require('@/assets/crossChainBridge/ic_bsc@2x.png'),
    name: 'BSC',
    desc: 'BSC',
    num: '0.00',
    active: false
  }, {
    logo: require('@/assets/crossChainBridge/ic_ht@2x.png'),
    name: 'HT',
    desc: 'HT',
    num: '0.00',
    active: false
  }, {
    logo: require('@/assets/crossChainBridge/ic_okt@2x.png'),
    name: 'OKT',
    desc: 'OKT',
    num: '0.00',
    active: false
  }, {
    logo: require('@/assets/crossChainBridge/ic_polygon@2x.png'),
    name: 'POLYGON',
    desc: 'Polygon',
    num: '0.00',
    active: false
  }, {
    logo: require('@/assets/crossChainBridge/ic_fanton@2x.png'),
    name: 'FANTOM',
    desc: 'Fantom',
    num: '0.00',
    active: false
  }, {
    logo: require('@/assets/crossChainBridge/ic_xdai@2x.png'),
    name: 'XDAI',
    desc: 'XDAI',
    num: '0.00',
    active: false
  }, {
    logo: require('@/assets/crossChainBridge/ic_celo@2x.png'),
    name: 'CELO',
    desc: 'Celo',
    num: '0.00',
    active: false
  }, {
    logo: require('@/assets/crossChainBridge/ic_avax@2x.png'),
    name: 'AVAX',
    desc: 'AVAX',
    num: '0.00',
    active: false
  }, {
    logo: require('@/assets/crossChainBridge/ic_btt@2x.png'),
    name: 'BTT',
    desc: 'BTT',
    num: '0.00',
    active: false
  }, {
    logo: require('@/assets/crossChainBridge/ic_cro@2x.png'),
    name: 'CRO',
    desc: 'CRO',
    num: '0.00',
    active: false
  },

]);
let show = ref(false);
const priceUrl = computed(() => {
  return route.query["price"];
});

const productErc20Address = computed(() => {
  return route.query["erc20Addr"];
});
const total = computed(() => {
  return new BigNumber(productCount.value).times(priceUrl.value).toString()
});
const { UAllowance, UBalance, UApprove, getuAddress, buyProduct } =
  useProduct({
    userAddress,
    web3,
    type: chainType,
  });


// const showPopup = () => {
//   show.value = true;
// }
const onChangeStake = (value) => {
  console.log('=============value=======================');
  console.log(value, productCount.value);
  console.log('====================================');
}
const handleChange = (item) => {
  list.value.forEach(item => {
    item.active = false;
  })
  item.active = true;
  show.value = false;
  biName.value = item.name
}
const initData = async () => {
  await getuAddress();
  UBalance().then((e) => {
    console.log("UBalance: ", e);
  });

  isUApprove.value = await UAllowance();
  console.log("isUApprove.value: ", isUApprove.value);
  Toast.clear();
};
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
  } catch (error) {
    Toast.clear();
  }
};
// eslint-disable-next-line no-unused-vars
const handleClickApprove = () => {
  Toast.loading({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });
  UApprove()
    .then((res) => {
      console.log("res: ", res);
      Toast("授权成功");
      isUApprove.value = true;
      Toast.clear();
    })
    .catch((err) => {
      Toast(err);
      Toast.clear();
      return;
    });
};

const handleSubmit = async () => {
  if (!connected.value) {
    return handleClickConnectWallet();
  }
  if (!isUApprove.value) {
    return handleClickApprove();
  }

  if (total.value === 0 || total.value == undefined) {
    Toast("总价有误，请选择数量后再购买");
    return;
  }

  if (total.value > UBalance.value) {
    Toast("U数量不足，无法购买");
    return;
  }

  Toast.loading({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });

  await buyProduct(productErc20Address.value, productCount.value, form, route.query['preAddress'])
    .then((res) => {
      console.log("res: ", res);
      Toast("购买成功");
      router.push({
        path:'/shop_cart',
        query:route.query
      })
    })
    .catch((err) => {
      console.log(err);
      Toast(err);
      Toast.clear();
      return;
    });

  Toast.clear();
};
onMounted(() => {
  if (!connected.value) {
    handleClickConnectWallet();
  } else {
    initData();
  }
});
</script>

<style scoped>
.van-cell {
  padding-left: 0;
  padding-right: 0;
}
</style>