
<template>
  <div>
    <div class="bg-white rounded-4 px-4 py-3">
      <div class="w-[224px] h-[103px] mx-auto bg-img relative flex items-end">
        <img :src="`//${$route.query['cid']}.ipfs.dweb.link`" class="w-[64px] h-[64px] m-auto relative top-[16%]" />
      </div>

      <div class="w-[100%] border h-10 border-[#1A8CFF] border-solid flex mt-6 rounded-[12px] overflow-hidden">
        <input class="flex-1 text-center" placeholder="请输入地址" v-model="toValue" />
      </div>

      <div class="flex justify-between mt-3">
        <div @click="handelSafeTransferFrom">
          <div class="h-10 w-[96px] flex justify-center items-center text-white text-[10px] rounded-[8px]" style="
              background-image: linear-gradient( 135deg, #ff6666 0%,#e63939 100%);
            ">
            <img src="../../assets/mining/ic_warning@2x.png" class="w-4 h-4 mr-2" />
            <p>
              确定转让<br />
              超级管理员
            </p>
          </div>
        </div>
        <div @click="handleChianApplyClick">
          <div class="h-10 w-[96px] flex justify-center items-center text-white text-xs rounded-[8px]" style="
              background-image: linear-gradient(135deg,#2bd99e 0%,#0abf64 100%);
            ">
            <img src="../../assets/mining/ic_warning@2x.png" class="w-4 h-4 mr-2" />
            <p>链商邀请</p>
          </div>
          <p class="text-center text-[10px] text-[#00CC88] font-normal mt-1">
            {{ chianNum }}/99
          </p>
        </div>
        <div @click="
          () => {
            $router.push('/chian_apply_common');
          }
        ">
          <div class="h-10 w-[96px] flex justify-center items-center text-white text-xs rounded-[8px]" style="
              background-image: linear-gradient(135deg, #1ab3ff 0%, #1a8bff 100%);
            ">
            <img src="../../assets/mining/ic_warning@2x.png" class="w-4 h-4 mr-2" />
            <p>通证商邀请</p>
          </div>
          <p class="text-center text-[10px] text-[#1A8CFF] font-normal mt-1">
            99/99
          </p>
        </div>
      </div>
    </div>
    <div class="w-full border border-[#E3B600] rounded-[32px] px-4 mt-3 bg-[#EEDBB4]" id="tp">
      <div class="border-[1px] border-[#B3801B] rounded-[16px] mt-[29px] h-[247px] w-[247px] m-auto overflow-hidden">

        <vue-qr v-if="imgUrl" :text="imgUrl" :logoSrc="getIconImg(type)" :size="500"></vue-qr>
      </div>
      <div class="h-3"></div>
      <div class="flex gap-x-6">
        <p @click="handledownLoadImg" v-if="isShowbtn"
          class="w-[194px] h-10 text mx-auto border border-[#B3801B] text-[#B3801B] rounded-full flex justify-center items-center"
          style="
            background-image: linear-gradient(135deg, #fff5dd 0%, #feecb7 100%);
          ">
          生成长图
        </p>
        <p v-if="isShowbtn" v-copy="`${imgUrl}`"
          class="w-[194px] h-10 text mx-auto border border-[#B3801B] text-[#B3801B] rounded-full flex justify-center items-center"
          style="
            background-image: linear-gradient(135deg, #fff5dd 0%, #feecb7 100%);
          ">
          复制
        </p>
      </div>

      <div class="h-5" />
      <h3 class="text-[#B3801B] text-xl font-semibold text-center">成为链商</h3>
      <p class="text-[#B3801B] text-sm leading-[24px] mb-5" v-for="(item, index) in textList" :key="index">
        {{ item }}
      </p>
    </div>
    <div class="h-6" />
    <!-- <h2 class="mx-4 text-base font-semibold text-[#333]">收益领取</h2>
  <div class="h-2" />

  <div class="rounded-[16px] bg-white p-4">
    <div class="flex justify-between w-[100%]">
      <van-checkbox>
        <div class="text-sm text-[#333] font-medium">UNISHOP产币收益：</div>
      </van-checkbox>
      <div class="text-sm text-[#333]">12.3 ETM</div>
    </div>
    <div class="w-[100%] mt-3">
      <div class="flex justify-between w-[100%]">
        <van-checkbox>
          <div class="text-sm text-[#333] font-medium">公社UNISHOP质押收益：</div>
        </van-checkbox>
        <div class="text-sm text-[#333]">12.3 ETM</div>
      </div>
      <div class="flex justify-between w-[100%] mt-3">
        <div class="ml-[25px] text-sm text-[#333] font-medium">
          公社UNISHOP解压处罚：：
        </div>
        <div class="text-sm text-[#333]">12.3 ETM</div>
      </div>
    </div>
    <div class="flex justify-between w-[100%] mt-3">
      <van-checkbox>
        <div class="text-sm text-[#333] font-medium">
          UNISHOPCOINS.COM组织奖励：
        </div>
      </van-checkbox>
      <div class="text-sm text-[#333]">12.3 ETM</div>
    </div>
    <div class="flex justify-between w-[100%] mt-3">
      <van-checkbox>
        <div class="text-sm text-[#333] font-medium">商品市盈率经济收益：</div>
      </van-checkbox>
      <div class="text-sm text-[#333]">12.3 ETM</div>
    </div>

    <VanButton
      round
      color="linear-gradient(135deg, #FFAA33 0%, #FA7D00 100%)"
      class="mx-auto w-[176px] h-8 block mt-6"
    >
      执行合约
    </VanButton>
  </div> -->

    <div class="mt-10 px-4 text-[#999]">
      <h3 class="text-sm">公社社长八大收益</h3>
      <p v-for="(item, index) in tipsText" :key="index" class="text-[10px] leading-4 my-2">
        {{ item }}
      </p>
    </div>
  </div>
</template>
<script setup>
import vCopy from "@/directives/copy";

import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import html2canvas from "html2canvas";
import { nextTick, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import useApplyChian from "@/web3/contract/useApplyChian";
import { useChainStore } from "@/store";
import { useRoute } from "vue-router";
import { Toast } from "vant";
import useCommuneContract from "@/web3/contract/useCommuneContract";
import { TRON } from "@/web3/config";
const chain = useChainStore();
const route = useRoute();
let { connectionInstance, chainType } = storeToRefs(chain);
console.log("chainType: ", chainType);
const {
  web3,
  tronWeb,
  userAddress,
  assets,
  contract,
  connected,
  type,
  tronApplyChainContract,
} = storeToRefs(connectionInstance.value);
console.log(web3, tronWeb, userAddress, assets, connected);
const { invite, getShopNum, getCommOwner } = useApplyChian({
  userAddress,
  web3,
  type: chainType,
  tronApplyChainContract,
});
const { safeTransferFrom } = useCommuneContract({
  instance: web3 ?? tronWeb,
  userAddress,
  contract,
  type,
});

const imgUrl = ref("");

const toValue = ref("");
const chianNum = ref(0);
const isShowbtn = ref(true);
// eslint-disable-next-line no-unused-vars
const getBlob = (base64) => {
  const mimeString = base64.split(",")[0].split(":")[1].split(";")[0]; // mime类型
  const byteString = atob(base64.split(",")[1]); // base64 解码
  const arrayBuffer = new ArrayBuffer(byteString.length); // 创建缓冲数组
  const intArray = new Uint8Array(arrayBuffer); // 创建视图
  for (let i = 0; i < byteString.length; i += 1) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], {
    type: mimeString,
  });
};


const getIconImg = (type) => {
  switch (type) {
    case "ETH":
      return require("../../assets/img/arbi.jpg");
    case TRON:
      return require("../../assets/img/tron.jpg");
    default:
      return require("../../assets/img/bsc.jpg");
  }
};
const savePicture = (Url) => {
  console.log('Url: ', Url);
  const blob = new Blob([""], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = Url;
  // eslint-disable-next-line prefer-destructuring
  a.download = Url.replace(/(.*\/)*([^.]+.*)/gi, "$2").split("?")[0];
  const e = document.createEvent("MouseEvents");
  e.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
  URL.value.revokeObjectURL(url);
};
const handledownLoadImg = () => {
  // 获取想要转换的dom节点
  // var dom = document.querySelector('body');
  const dom = document.getElementById("tp");
  isShowbtn.value = false;
  nextTick(() => {
    html2canvas(dom, {
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      useCORS: true,
    }).then((canvas) => {
      // 将canvas转换成图片渲染到页面上
      const url = canvas.toDataURL("image/png"); // base64数据
      console.log('url: ', url);
      const image = new Image();
      image.src = url;
      isShowbtn.value = true;
      savePicture(url);
    });
  });
};
const handelSafeTransferFrom = async () => {
  if (!connected.value) {
    handleClickConnectWallet();
  }
  const isNext = await getCommOwner(route.query["index"]).then(
    (e) => e == userAddress.value
  );
  if (!isNext) {
    return Toast("您当前还没有权限管理");
  }
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
  });
  safeTransferFrom(toValue.value, route.query["index"])
    .then((res) => {
      console.log("safeTransferFrom: ", res);
      Toast.clear();
      Toast.success("链上确认中!请前往区块浏览器查看");
    })
    .catch((error) => {
      Toast.clear();
    });
};

const handleChianApplyClick = async () => {
  if (!connected.value) {
    handleClickConnectWallet();
  }
  const isNext = await getCommOwner(route.query["index"]).then(
    (e) => e == userAddress.value
  );
  if (!isNext) {
    return Toast("您当前还没有权限管理");
  }
  if (!toValue.value) return;
  // route.query['index']
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
  });
  invite(toValue.value, route.query["index"])
    .then((res) => {
      console.log("invite: ", res);
      Toast.clear();
      Toast.success("链上确认中!请前往区块浏览器查看");
    })
    .catch((error) => {
      console.table(error);
      Toast.clear();
    });
};
const initData = () => {
  getShopNum(route.query["index"]).then((res) => {
    chianNum.value = res;
  });
};
const handleClickConnectWallet = async (isAlert = true) => {
  await connectionInstance.value.onConnect(
    chain.chainType,
    // route.query.chainType,
    () => {
      initData();
    },
    isAlert
  );
};

onMounted(() => {
  const query = route.query;
  const url =
    window.location.origin +
    window.location.pathname +
    "#/chian_apply?" +
    `chianType=${query["chianType"]}&index=${query["index"]}`;
  imgUrl.value = url
  if (!connected.value) {
    handleClickConnectWallet();
  } else {
    initData();
  }
});

const textList = [
  " 1.所谓“链商“就是让每件商品都生成一个唯一的收款合约地址，全网公开，通证朔源，就像比特币和以太坊的数字货币有一个唯一的地址一样，每件产品都有一个唯一的合约地址，不可篡改，革命性的解决电商时代的假货问题；",
  " 2.一切商品交易都可以在链上查询，具备完整而独立的匿名交易体验；使用数字货币的支付系统，做一种互联网无法拦截和限制的交易体系；",
  " 3.真正的链商需要去中心化，使得每个链商都是超级管理员；任何一个商户一旦上线，都会在链上永远独立自主的存在下去，整套系统在区块链合约上独立运行，没有任何人可以关闭和限制自己的店铺；（即便互联网关掉，也无法影响链上商城的正常交易）一切不能自己当超级管理员的链商，都是电商（随时可以被超管封店和关闭）",
  " 4.UNISHOP挖矿属性，所有商品的10%资金量都会参与到“100%全返”挖矿的过程中，通过对主流数字货币UNISHOP的生产，最终实现对一切链上消费额的100%全额返还；（返还速度纯粹由真实的市场决定，完全0泡沫，UNISHOP价格高，返还速度加快，价格低返还速度减慢） 5.链商可以独立自主的“打造自身IP”建立自己的粉丝社群和私有流量，不必再陷入流量战和价格战的内卷环境中；每件产品都 = “一家独立的上市公司”，每件产品都能产生自己的PE产品市盈率，链商既可以赚到产品的钱，更可以赚到市值的钱；",
  " 6.链商可以围绕好的产品IP，凝聚一批真正想投资实体经济发展的投资人，同时把每一个消费者都变成自己的上市公司投资人，消费者在消费的时候就会拥有自己产品的部分股权，可随时在交易所进行变现；被市场看好的产品，有时候可以卖1000万的产品融到1个亿的CPE的钱;",
  " 7.链商实行的是“公社自治”体系，可以自主参与到公社治理当中； 8.成为链商仅需缴纳 1998$，便可进入公社企业微信群，电报群，享受长达1年的公社会员服务。",
];
const tipsText = [
  "1. 拥有独立的NFT资产帐户价值无限，可转让；",
  " 2. 享受UNISHOPCOINS.COM测试币3300枚24个月空投的20%（33个公社社长按权重排名分配）；",
  " 3. 链上商城所有商品消费流水的2%的20%的收益（33公社社长按公社排名分配）；",
  " 4. 社长享免购买UNISHOP手续费；",
  " 5. 公社社区总质押UNISHOP的算力奖，质押200天：社长奖5% ；质押700天：社长奖10%；",
  " 6. 每个公社社区挖矿总收益社长享受10%（按挖矿总收益公社排名权重计出社区挖矿收益）；",
  " 7. STO上市，公社社长成为原始股东，参与巨大资本市场红利；",
  " 8. 全球3000枚UNISHOP销毁通缩至1500枚，全球独创商品市盈率经济模型助推UNISHOP天价收。",
];
</script>

<script>
export default {
  name: "ManagePage", // 管理公社
};
</script>

<style>
.bg-img {
  background: url("../../assets/mining/logo@2x.png") no-repeat;
  background-size: 100% 100%;
}
</style>
