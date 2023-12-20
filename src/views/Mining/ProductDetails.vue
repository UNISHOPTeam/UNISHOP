
<template>
  <div class="bg-[#002866] min-h-[200px]">
    <div class="h-4"></div>
    <div
      class="bg-[#FFFFFF] bg-opacity-30 min-h-[56px] mx-3 items-center p-2 rounded-2xl border border-[#fff] border-opacity-30"
    >
      <p class="text-center text-xs text-white text-opacity-30">
        商品唯一朔源地址
      </p>
      <p class="text-white text-xs text-center">
        {{ route.query["erc20Addr"] }}
      </p>
      <div
        class="rounded-xl p-0.5 border mx-[10px] h-[36px] mt-1 border-[#fff] border-opacity-30 flex"
      >
        <input class="flex-1 bg-transparent text-white" v-model="toAddress" />
        <div
          class="rounded-[10px] bg-white px-2 text-[#E64545] text-xs leading-[30px]"
          @click="handlerSafeTransferFrom"
        >
          转让产品管理员
        </div>
      </div>
    </div>
    <div class="mt-2 text-2xl text-white font-bold text-center leading-[51px]">
      42345 <span class="text-base font-normal">U</span>
    </div>
    <p class="text-xs text-white text-center font-light mt-2">产品销售收益</p>
    <!-- <div class="h-10"></div> -->
    <!-- <VanButton round color="#fff" class="w-[176px] h-8 block mx-auto">
      <span class="text-[#002866] text-xs"> 领取收益 </span>
    </VanButton> -->
  </div>
  <div class="h-5"></div>
  <div class="mx-4 rounded-t-2xl min-h-[48px] flex overflow-hidden">
    <div
      @click="tabIndex = 0"
      class="flex-1 clipPath text-center rounded-tl-2xl relative"
      :class="
        tabIndex == 0
          ? 'leading-[48px] bg-white '
          : 'bg-[#D0DBE8] min-h-[40px] leading-[40px] self-end'
      "
    >
      待发货商品
    </div>
    <div
      @click="tabIndex = 1"
      class="flex-1 text-center rounded-tr-2xl"
      :class="
        tabIndex == 1
          ? 'leading-[48px] bg-white '
          : 'bg-[#D0DBE8] min-h-[40px] leading-[40px] self-end'
      "
    >
      已发货商品
    </div>
  </div>
  <div class="rounded-2xl bg-white p-8 space-y-4" v-if="tabIndex == 0">
    <div
      v-for="(item, index) in notList"
      :key="index"
      class="p-3 text-sm text-[#333] shadow rounded-2xl relative"
    >
      <div class="overflow-hidden" :class="{ active: active === index }">
        <div class="mb-3 flex justify-between">
          <div class="text-[#999]">收货人：</div>
          <div>{{ item.name }}</div>
        </div>
        <div class="mb-3 flex justify-between">
          <div class="text-[#999] w-1/2">收货地址：</div>
          <div class="text-xs text-right break-all">
            {{ item.address }}
          </div>
        </div>
        <div class="mb-3 flex justify-between">
          <div class="text-[#999] w-1/2">电话：</div>
          <div>{{ item.tel }}</div>
        </div>
        <div class="mb-3 flex justify-between">
          <div class="text-[#999] w-1/2">购买数量：</div>
          <div>{{ item.count }}</div>
        </div>
        <div class="border-t border-[#EFEFEF]"></div>
        <div class="my-5 flex justify-between">
          <div class="w-1/2 font-medium">快递编号：</div>
          <div>
            <input
              v-model="courierCode[index]"
              class="text-right placeholder-[#ccc]"
              placeholder="请输入快递编号"
            />
          </div>
        </div>
        <div class="border-t border-[#EFEFEF]"></div>
        <div class="my-3 flex justify-between items-center">
          <div class="w-1/2">产品二维码：</div>
          <div>
            <!-- <img src="" class="w-20 h-20 bg-[#ccc]" alt="" /> -->
            <vue-qr
              class="w-20 h-20 bg-[#ccc]"
              :text="imgUrl"
              :logoSrc="getIconImg($route.query['chianType'])"
              :size="500"
            ></vue-qr>
          </div>
        </div>
        <div class="border-t border-[#EFEFEF]"></div>
        <div class="mt-3 mb-[40px] flex justify-between">
          <div class="w-1/2">产品消费合约地址：</div>
          <div class="text-xs text-right break-all">
            {{ productChainAddress(chainType) }}
          </div>
        </div>

        <VanButton
          @click="handlerClickShip(item,index)"
          class="w-[280px] h-10 mb-5 mx-auto block"
          round
          color="linear-gradient(135deg, #1AB3FF 0%, #1A8BFF 100%)"
        >
          确认发货
        </VanButton>
      </div>

      <div
        class="text-center absolute left-0 right-0 bottom-[2px]"
        @click="handlerClickArrow(index)"
      >
        <van-icon name="arrow-down" color="#8CC5FF" />
      </div>
    </div>
  </div>
  <div class="rounded-2xl bg-white p-8 space-y-4" v-if="tabIndex == 1">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="p-3 text-sm text-[#333] shadow rounded-2xl relative"
    >
      <div class="overflow-hidden" :class="{ active: active === index }">
        <div class="mb-3 flex justify-between">
          <div class="text-[#999]">收货人：</div>
          <div>{{ item.name }}</div>
        </div>
        <div class="mb-3 flex justify-between">
          <div class="text-[#999] w-1/2">收货地址：</div>
          <div class="text-xs text-right break-all">
            {{ item.address }}
          </div>
        </div>
        <div class="mb-3 flex justify-between">
          <div class="text-[#999] w-1/2">电话：</div>
          <div>{{ item.tel }}</div>
        </div>
        <div class="mb-3 flex justify-between">
          <div class="text-[#999] w-1/2">购买数量：</div>
          <div>{{ item.count }}</div>
        </div>
        <div class="border-t border-[#EFEFEF]"></div>
        <div class="my-5 flex justify-between">
          <div class="w-1/2 font-medium">快递编号：</div>
          <div>
            <div>{{ item.courierCode }}</div>
          </div>
        </div>
        <div class="border-t border-[#EFEFEF]"></div>
        <div class="my-3 flex justify-between items-center">
          <div class="w-1/2">产品二维码：</div>
          <div>
            <!-- <img src="" class="w-20 h-20 bg-[#ccc]" alt="" /> -->
            <vue-qr
              class="w-20 h-20 bg-[#ccc]"
              :text="imgUrl"
              :logoSrc="getIconImg($route.query['chianType'])"
              :size="500"
            ></vue-qr>
          </div>
        </div>
        <div class="border-t border-[#EFEFEF]"></div>
        <div class="mt-3 mb-[40px] flex justify-between">
          <div class="w-1/2">产品消费合约地址：</div>
          <div class="text-xs text-right break-all">
            {{ productChainAddress(chainType) }}
          </div>
        </div>
      </div>

      <div
        class="text-center absolute left-0 right-0 bottom-[2px]"
        @click="handlerClickArrow(index)"
      >
        <van-icon name="arrow-down" color="#8CC5FF" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useChainStore } from "@/store";
import { storeToRefs } from "pinia";
import useProduct from "@/web3/contract/useProduct";
import { computed, onMounted, ref } from "vue";
import { Toast } from "vant";
import { productChainAddress } from "@/web3/config";
import vueQr from "vue-qr/src/packages/vue-qr.vue";
const chain = useChainStore();
const route = useRoute();
const erc20Addr = route.query["erc20Addr"];
let { connectionInstance, chainType } = storeToRefs(chain);

const list = ref([]);
const notList = ref([]);
const active = ref(null);
const toAddress = ref(null);
const courierCode = ref([]); // 快递编号
const tabIndex = ref(0);
const { connected, web3, userAddress, tronProductChainContract } = storeToRefs(
  connectionInstance.value
);
const getIconImg = (type) => {
  switch (type) {
    case "ETH":
      return require("@/assets/img/arbi.jpg");
    case "TRON":
      return require("@/assets/img/tron.jpg");
    default:
      return require("@/assets/img/bsc.jpg");
  }
};

const imgUrl = computed(() => {
  return (
    window.location.origin +
    window.location.pathname +
    `#/good_detail_video?erc20Addr=${erc20Addr}&chianType=${chain.chainType}&preAddress=${userAddress.value}`
  );
});
const { getProdSells, dispatchProduct, safeTransferFrom,getuAddress } = useProduct({
  userAddress,
  web3,
  type: chainType,
  tronProductChainContract,
});
const handlerClickArrow = (index) => {
  if (active.value === index) {
    active.value = null;
    return;
  }
  active.value = index;
};
const handlerSafeTransferFrom = () => {
  if (!toAddress.value) {
    Toast.message("请填写转让地址");
  }
  Toast.loading({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });
  safeTransferFrom(erc20Addr, toAddress.value).then((res) => {
    console.log("safeTransferFrom res", res);
    toAddress.value = ''
    Toast.clear();
    Toast.success("链上确认中!请前往区块浏览器查看")
  });
};
const handlerClickShip = (item,index) => {
  console.log('courierCode.value[index]',courierCode.value[index],item.id)
  if (!courierCode.value[index]) {
    Toast.message("请填写快递编号");
  }
  Toast.loading({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });
  dispatchProduct(erc20Addr, item.id, {
    ...item,
    courierCode: courierCode.value[index],
  })
    .then(() => {
      initData();
      courierCode.value = "";
      Toast.clear();
    })
    .catch(() => {
      Toast.clear();
    });
};

const initData = async () => {
 await getuAddress()
  getProdSells(erc20Addr).then((res) => {
    console.log('res',res)
    if (res.length) {
      notList.value = res.filter((e) => {
        return e.courierCode == null;
      });
      list.value = res.filter((e) => {
        return e.courierCode;
      });
    }
  });
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

<style scoped>
.shadow {
  box-shadow: 0px 0px 20px 1px rgba(51, 119, 255, 0.1);
}
.active {
  height: 30px;
}
/* .clipPath:after{
        content: '';
        
        @apply h-14 bg-white w-14 origin-center rotate-45 block translate-y-[20px] translate-x-[26px] absolute right-0 bg-red-300;
    } */
</style>
