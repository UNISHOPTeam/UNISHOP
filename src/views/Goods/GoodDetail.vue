<template>
  <div class="bg-black py-3 box-border min-h-screen">
    <div class="rounded-2xl p-4 bg-white bg-opacity-20">
      <div class=" text-white text-[12px]">
        <div class="flex items-center mb-3">
          <img class="w-14 h-14 rounded-lg" :src="`//unishop.mypinata.cloud/ipfs/${$route.query['logo']}`" alt="">
          <span class="ml-2 text-[16px]">{{ $route.query['name'] }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span class="text-[14px]">通证合约地址：</span>
          <span class="break-all">{{ productChainAddress(chain.chainType) }} </span>
        </div>
        <div class="text-center">
          <van-icon v-show="!showMore" size="20px" name="arrow-down"></van-icon>
        </div>
        <!-- 查看更多信息 -->
        <div v-show="showMore">
          <!-- 产品价格波动信息 -->
          <div class="text-[16px] mb-3">产品价格波动图</div>
          <div class="flex justify-between items-center text-[#ccc] mb-3">
            <div>
              <div class="mb-3">当前价格：<span class="text-[#1A8CFF] font-semibold">{{ $route.query['price'] }} u</span>
              </div>
              <div>产品销量：<span class="font-semibold">0</span></div>
            </div>
            <div>
              <div class="mb-3">通证价格：<span class="text-[#1A8CFF] font-semibold">0 u</span></div>
              <div>销售额：<span class="font-semibold">10000</span></div>
            </div>
          </div>
          <!-- TODO 产品价格波动图 -->
          <div class="w-[343px] h-[208px] rounded-2xl mb-6" style="background: rgba(255, 255, 255, 0.2)">

            <c-line style="height: 100%; width: 100%" :xAxis="xAxis" :series="series"></c-line>
          </div>
          <!-- TODO 兑换 -->
          <div class="text-[16px] mb-2">兑换</div>
          <div class="w-[343px] min-h-[208px] py-3 rounded-2xl mb-2" style="background: rgba(255, 255, 255, 0.2)">
            <div class="relative flex flex-col">
              <div :class="!isSale ? 'order-2' : 'order-1'"
                   class=" w-[319px] min-h-16 bg-white bg-opacity-30 rounded-xl border-2 border-[#CCE6FF] m-auto mb-3 py-1 px-3">

                <div class="flex">
                  <div class="flex-1">
                    <div v-if="!isSale" class="flex items-center">
                      <input  @input="onChangeUsdtValue" v-model="UsdtVal"
                             class="h-10 text-white bg-transparent" type="number">
                      <div class="p-1 bg-[#1A8CFF] rounded -mt-2 " @click="onMax(true)"> MAX</div>

                    </div>
                    <span v-else class="h-10 text-white bg-transparent">
                      {{ UsdtVal ? UsdtVal : (isSale ? '预计消耗数量' : '') }}
                    </span>

                  </div>
                  <div>
                    <div
                        class="w-[96px] h-8 bg-[#FFE6CC] rounded-lg truncate text-black text-xs font-bold px-2 flex justify-between items-center">
                      U
                    </div>


                  </div>
                </div>
                <div class="text-xs text-right text-[#F7F7F7] mt-1">余额：{{ UBalanceVal }}</div>
              </div>
              <div @click="handleSwitchClick"
                   class="absolute top-[60px] left-[167px] w-5 h-5 bg-[#8CC5FF] bg-opacity-50 m-auto rounded-lg text-center leading-[20px]">
                <van-icon color="white" name="down"></van-icon>
              </div>
              <div :class="!isSale ? 'order-1' : 'order-2'"
                   class=" w-[319px] min-h-16 bg-white bg-opacity-30 rounded-xl border-2 border-[#FFE6CC] m-auto  mb-3  py-1 px-3">
                <div class="flex">
                  <div class="flex-1">
                    <div v-if="isSale" class="flex items-center">
                      <input v-model="uVal" :placeholder="!isSale ? '预计消耗数量' : ''" @input="onChangeuValue"

                             class="h-10 text-white bg-transparent" type="number">
                      <div class="p-1 bg-[#1A8CFF] rounded -mt-2 " @click="onMax(false)"> MAX</div>
                    </div>

                    <span v-else class="h-10 text-white bg-transparent">
                      {{ uVal ? uVal : (!isSale ? '预计消耗数量' : '') }}
                    </span>
                  </div>
                  <div>
                    <div
                        class="w-[96px] h-8 bg-[#E6F2FF] rounded-lg truncate text-black text-xs leading-[32px] text-center px-1">
                      USDT
                    </div>

                  </div>
                </div>
                <div class="text-xs text-right text-[#F7F7F7] mt-1">余额：{{ UsdtBalanceVal }}</div>
              </div>
            </div>

            <van-button @click="handleSubmit" class="w-[176px] h-[32px] m-auto mt-3 text-[#1A8CFF]" block round plain
                        size="small">
              {{ isSale ? (!isUApprove ? 'Approve' : 'SWAP') : !isUsdtApprove ? 'Approve' : 'SWAP' }}

            </van-button>
          </div>
          <div class="text-center" @click="handleShowMore">
            <van-icon size="20px" name="arrow-up"/>
          </div>
        </div>
      </div>
    </div>
    <!-- 购买按钮 -->
    <div
        class="flex justify-between items-center border rounded-xl text-white bg-white bg-opacity-30 px-3 py-2 mx-4 text-xs my-3">
      <div></div>
      <div class="flex justify-between items-center">
        <span>总价：</span>
        <span class="text-base text-[#1A8CFF] font-semibold">{{ total }} U</span>
        <van-button @click="toConfirmBuy" class="w-[96px] h-10 rounded-lg ml-1"
                    color="linear-gradient(135deg, #1AB3FF 0%, #1A8BFF 100%)">购买
        </van-button>
      </div>
    </div>

    <!-- 切換單位 -->
    <van-action-sheet v-model:show="chainShow" :actions="actions" @select="onSelect" cancel-text="取消"
                      close-on-click-action @cancel="onCancel"/>
  </div>
</template>

<!--suppress ES6UnusedImports -->
<script setup>
import {productChainAddress} from "@/web3/config";
import CLine from '@/components/CLine.vue';
import {useChainStore} from '@/store';
import {Toast} from 'vant';
import {_debounce} from "@/libs/util"
import {storeToRefs} from 'pinia';
import {computed, ref, onMounted} from 'vue';
import {useRouter, useRoute} from 'vue-router'
import {useToggle} from "@vant/use"
import useUtoUsdt from '@/web3/contract/useUtoUsdt'
// eslint-disable-next-line no-unused-vars
import BigNumber from "bignumber.js";

const router = useRouter();
const route = useRoute();
const chain = useChainStore();

let {connectionInstance, chainType} = storeToRefs(chain);
console.log('chainType: ', chainType);
const {
  web3,
  userAddress,
  connected,
  utoUsdtContract,
} = storeToRefs(connectionInstance.value);
const {
  getUsdtAddress, getuAddress, UsdtBalance, UsdtApprove, UsdtAllowance,
  buyU,
  UAllowance,
  UApprove,
  saleU,
  UBalance,
  getSaleCost,
  getBuyCost,
} = useUtoUsdt({
  userAddress,
  web3,
  type: chainType,
  utoUsdtContract,
})
const erc20Addr = computed(() => {
  return route.query["erc20Addr"];
});
const [chainShow] = useToggle(false) // 下拉选择显示和隐藏
const unit = ref('U');
let showMore = ref(true);
let num = ref(1);
const isSale = ref(false)
const isUApprove = ref(true)
const isUsdtApprove = ref(true)
const UsdtVal = ref('')
const uVal = ref('')
let UBalanceVal = ref(0);
let UsdtBalanceVal = ref(0);
let price = ref(route.query['price']);
const xAxis = ref(['$18.6004', '$18.6004', '$18.6004', '$18.6004', '$18.6004', '$18.6004', '$18.6004'])
const series = ref(['09', '09', '10', '10', '11', '11', '12'])

// const decrease = () => {
//   if (num.value === 0) return;
//   num.value--
// }
//
// const increase = () => {
//   num.value++
// }
const toConfirmBuy = () => {
  router.push({
    path: '/confirm_buy',
    query: {price: price.value, erc20Addr: erc20Addr.value},
  })
}

const handleSwitchClick = async () => {
  isSale.value = !isSale.value
  uVal.value = ""
  UsdtVal.value = ""
  // _constVal.value = ""
}


const handleSubmit = async () => {
  if (!connected.value) {
    return handleClickConnectWallet()
  }
  if (!isUApprove.value && isSale.value) {
    return handleClickApprove()
  }
  if (!isUsdtApprove.value && !isSale.value) {
    return handleClickApprove()
  }

  if (uVal.value === '') {
    Toast('请输入U数量')
    return
  }
  if (uVal.value > UBalance.value) {
    Toast('U数量不足')
    return
  }
  if (UsdtVal.value === '') {
    Toast('请输入USDT数量')
    return
  }
  if (UsdtVal.value > UsdtBalance.value) {
    Toast('USDT数量不足')
    return
  }
  Toast.loading({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  })
  if (isSale.value) {
    await saleU(uVal.value).then(res => {
      console.log('res: ', res);

      Toast('出售成功')
    }).catch(err => {
      Toast(err)
      Toast.clear()
      return
    })
  } else {

    await buyU(UsdtVal.value).then(res => {
      console.log('res: ', res);
      Toast('购买成功')

    }).catch(err => {
      Toast(err)
      Toast.clear()
      return
    })
  }
  Toast.clear()
  uVal.value = ''
  UsdtVal.value = ''
}
// eslint-disable-next-line no-unused-vars
const handleClickApprove = () => {
  Toast.loading({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  })
  if (isSale.value) {
    UApprove(uVal.value).then(res => {
      console.log('res: ', res);
      Toast('授权成功')
      isUApprove.value = true
      Toast.clear()
    }).catch(err => {
      Toast(err)
      Toast.clear()
      return
    })
  } else {
    UsdtApprove(UsdtVal.value).then(res => {
      console.log('res: ', res);
      Toast('授权成功')
      isUsdtApprove.value = true
      Toast.clear()
    }).catch(err => {
      Toast(err)
      Toast.clear()
      return
    })
  }
}

const total = computed(() => {
  return num.value * price.value
})
const actions = computed(() => {
  return [
    {name: "UNISHOPCOINS", id: "UNISHOPCOINS"},
    {name: "UNISHOP", id: "UNISHOP"},
  ]
})
// const handleSwitchClick = () => {
//   chainShow.value = !chainShow.value
// }
const onSelect = async (val) => {
  console.log("val:onSelect ", val)
  unit.value = val.name;
}
const onCancel = () => {
}
const handleShowMore = () => {
  router.go(-1);
}


const onChangeUsdtValue = _debounce(function async() {

  if (!UsdtVal.value) {
    return
  }
  if (!connected.value) {
    return Toast.fail("请先连接钱包")
  }
  getBuyCost(UsdtVal.value).then((res) => {
    uVal.value = res
  })
  return
})
const onChangeuValue = _debounce(function async() {

  console.log('onChangeuValue: ', uVal.value);
  if (!uVal.value) {
    return
  }
  if (!connected.value) {
    return Toast.fail("请先连接钱包")
  }
  getSaleCost(uVal.value).then((res) => {
    UsdtVal.value = res
  })
  return
})

const onMax =  async (isu)=>{
  if(isu) {
    console.log(isu)
    let adverbUSDT = await getSaleCost(UBalanceVal.value)
    if(new BigNumber(adverbUSDT).lte(UsdtBalanceVal.value)){
      UsdtVal.value = adverbUSDT
      uVal.value  = UBalanceVal.value
    }else {
      uVal.value  = await getBuyCost(UsdtBalanceVal.value)
      UsdtVal.value =  UsdtBalanceVal.value
    }
  }else {
   let adverbU = await getBuyCost(UsdtBalanceVal.value)
    if(new BigNumber(adverbU).lte(UBalanceVal.value)){
       uVal.value =adverbU
       UsdtVal.value  = UsdtBalanceVal.value
    }else {
      UsdtVal.value  = await getSaleCost(UBalanceVal.value)
      uVal.value =  UBalanceVal.value
    }

  }
}


const initData = async () => {
  // getVideoDomList(route.query['erc20Addr']))

  await getUsdtAddress()
  await getuAddress()
  UBalance().then(e => {
    console.log('UBalance: ', e);
    UBalanceVal.value = e
  })
  UsdtBalance().then(e => {
    console.log('UsdtBalance: ', e);
    UsdtBalanceVal.value = e
  })
  isUApprove.value = await UAllowance()
  console.log('isUApprove.value: ', isUApprove.value);

  isUsdtApprove.value = await UsdtAllowance()
  console.log('isUsdtApprove.value : ', isUsdtApprove.value);
  Toast.clear()
  onMax(true)
};

const handleClickConnectWallet = async (isAlert = true) => {
  Toast.loading({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  })
  try {
    await connectionInstance.value.onConnect(
        chain.chainType,
        () => {
          initData();
        },
        isAlert
    );
  } catch (error) {
    Toast.clear()
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
