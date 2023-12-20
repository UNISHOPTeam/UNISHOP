<template>
  <div class="h-4"></div>
  <!-- <div class="card-img">
    <img src="//bafkreihlbis2medj32mni6qark3bzvvdhjtqfpwujarc3inn6r425ecueu.ipfs.dweb.link"
      class="w-[64px] h-[64px] bg-gray-400 block m-auto" />
    <h3 class="leading-[30px] text-center font-bold text-white">叁点半公社</h3>
    <div class="border border-[#1A8CFF] rounded-[12px] bg-white bg-opacity-60 h-[36px] flex">
      <input class="px-2 text-center bg-transparent w-full flex-1" placeholder="请输入合约地址" />
    </div>
    <div class="flex justify-center space-x-6">
      <p class="text-[#FF0000] text-xs flex items-center">
        <img src="../../assets/mining/erorr@2x.png" class="w-3 h-3" />
        转让公社
      </p>
      <p class="text-[#FF0000] text-xs flex items-center">
        <img src="../../assets/mining/erorr@2x.png" class="w-3 h-3" />
        转让链商
      </p>
      <p class="text-[#FF0000] text-xs flex items-center">
        <img src="../../assets/mining/erorr@2x.png" class="w-3 h-3" />
        转让超级管理员
      </p>
    </div>
    <p class="pt-4 text-xs text-white text-center">神洲第一龙大米</p>
    <div class="text-xs text-white text-center">
      0xcbC9eBa8DbDad08a491E5105Fe288E4e960AA012
    </div>
  </div> -->
  <div class="h-6"></div>
  <h3 class="px-4 text-base font-semibold text-[#333] leading-[22px] mb-2">
    上传产品
  </h3>
  <div class="bg-white rounded-[16px] px-4">
    <div class="divide-y divide-[#EFEFEF]">
      <div>
        <div class="flex justify-between items-center py-4">
          <h4 class="text-sm font-medium text-[#333]">产品名称：</h4>
          <input
              type="text"
              v-model="productName"
              placeholder="请输入产品名称"
              class="placeholder-[#CCCCCC] text-right text-sm"
          />
        </div>
        <p class="text-right text-xs text-[#CCCCCC] mb-2">
          *产品名称=Token名称，上传后Token名称不可修改
        </p>
      </div>

      <div class="flex justify-between items-center py-4">
        <h4 class="text-sm font-medium text-[#333]">产品价格：</h4>
        <div class="flex">
          <input
              type="text"
              v-model="productPrice"
              placeholder="请输入产品价格"
              class="placeholder-[#CCCCCC] text-right text-sm"
          />
          <div
              class="border ml-2 border-[#CCE6FF] text-sm w-[64px] rounded-[8px] px-2 h-7 flex items-center justify-center"
          >
            U
            <img src="../../assets/2.jpg" class="w-3 ml-1"/>
            <div
                class="border-[4px] ml-1 translate-y-[2px] h-2 w-2 border-l-transparent border-r-transparent border-b-transparent border-t-[#8CC5FF]"
            ></div>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center py-[10px]">
        <h4 class="text-sm font-medium text-[#333]">产品视频：</h4>
        <van-uploader
            style="--van-padding-xs: 0"
            v-model="fileList"
            accept="video/*"
            :max-size="1024 * 1024 * 1024 * 2"
            :max-count="1"
            :after-read="afterRead"
        />
      </div>
    </div>
    <p class="text-right text-xs text-[#CCCCCC]">
      *支持上传2GB以上长视频 mp4，m4v，等格式
    </p>
    <p class="text-right text-xs text-[#CCCCCC]">**请竖直拍摄</p>
    <van-button
        class="mx-6 w-[295px] h-10 mt-6 mb-4"
        round
        color="linear-gradient(135deg, #1AB3FF 0%, #1A8BFF 100%)"
        @click="handleUpload"
    >
      上传产品
    </van-button>
  </div>
  <div class="h-6"></div>
  <h3 class="px-4 text-base font-semibold text-[#333] leading-[22px] mb-2">
    产品
  </h3>
  <div class="space-y-3">
    <div
        class="bg-white flex rounded-2xl py-3 px-4"
        v-for="(item, index) in listData"
        :key="index"
    >
      <div class="flex flex-1">
        <!-- bafybeia477eabjglrkl6xh5dzjzlowzf42e5p3xzttogrbrluknxngz4ju -->
        <img
            :src="item.logo ? `//unishop.mypinata.cloud/ipfs/${item.logo}` : null"
            class="w-[56px] h-[56px] bg-gray-500 mr-2 rounded-xl"
        />
        <div class="flex flex-1 flex-col justify-between">
          <div class="flex justify-between">
            <div class="text-base text-black font-medium">{{ item.name }}</div>
            <van-popover
                style="--van-popover-action-font-size: 12px"
                placement="left-end"
                v-model:show="item.showPopover"
                :actions="actions(item.isModify)"
                @select="
                (e) => {
                  onSelect(item, e);
                }
              "
            >
              <template #reference>
                <van-icon name="ellipsis"/>
              </template>
            </van-popover>
          </div>

          <div class="flex justify-between text-xs text-[#CCCCCC]">
            <div>
              价格：
              <span class="text-[#1A8CFF] text-base">
                {{ item.price }} <b>U</b>
              </span>
            </div>
            <!-- <span> 销量：200 </span> -->
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
  <ShareAlert
      v-model:isShowOverly="isShowOverly"
      :imgUrl="imgUrl"
      :activeRow="activeRow"
  ></ShareAlert>
</template>
<script setup>
import ShareAlert from '@/components/ShareAlert'

import {formatPrice} from '@/web3/tools'
import {useChainStore} from "@/store";
import {IPFS_URL, PINATA_API_KEY, PINATA_SECRET_API_KEY} from "@/web3/config";
import useProduct from "@/web3/contract/useProduct";

import {Dialog, Toast} from "vant";
import {onMounted, reactive, ref, getCurrentInstance} from "vue";
import {storeToRefs} from "pinia";
import {useRouter, useRoute} from "vue-router";
import useAuthority from "@/web3/contract/useAuthority";
import useProductChainHelper from "@/web3/contract/useProductChainHelper";

const router = useRouter();
const route = useRoute();
const {proxy} = getCurrentInstance();

// const showPopover = ref(false);
const productName = ref("");
const productPrice = ref("");
const fileList = ref([]);
const listData = ref([]);
const imgUrl = ref("");
const activeRow = reactive({item: {}});
const isShowOverly = ref(false);

const chain = useChainStore();
let {connectionInstance, chainType} = storeToRefs(chain);
const {
  web3,

  userAddress,
  tronProductChainContract,
  connected, // todo 波场链合约
} = storeToRefs(connectionInstance.value);

const {getUserProducts} = useProductChainHelper({
  userAddress,
  web3,
  type: chainType,
  productChainHelperContract: null,
})

// eslint-disable-next-line no-unused-vars
const {newProduct, updatePuroduct, getShopProducts, tokenProdMap, getuAddress} = useProduct({
  userAddress,
  web3,
  tronProductChainContract,
  type: chainType,
});
const {isOwner} = useAuthority({web3, userAddress, type: chainType, tronProductChainContract});

onMounted(() => {
  if (!connected.value) {
    handleClickConnectWallet();
  } else {
    initData();
  }
});

const initData = async () => {
  console.log('getuAddress ',getuAddress);
  await getuAddress()
  // getUserProducts().then(res => {
  //   console.log('getUserProducts', res)
  // })
  getUserProducts().then((res) => {
    console.log('res: ', res);
    let obj = res;
    obj = [];
    for (let i = 0; i < res[0].length; i++) {
      let erc20Addr, name, logo, price;
      for (let j = 0; j < Object.values(res).length; j++) {
        const current = Object.values(res)[j][i].toString();
        if (j == 0) {
          erc20Addr = current;
        }
        if (j == 1) {
          name = current;
        }
        if (j == 2) {
          logo = current;
        }
        if (j == 3) {
          price = formatPrice(current);
        }
      }
      obj.push({erc20Addr, name, logo, price, showPopover: false});
    }
    listData.value = obj;
    listData.value.map((item, index) => {
      isOwner(item.erc20Addr).then((res) => {
        console.log('isOwner: ', res);
        listData.value[index].isModify = res;
      });
    });
    console.log("obj: ", obj);
  });
};
const handleUpload = () => {
  console.log('handle upload')
  if (!connected.value) {
    return handleClickConnectWallet();
  }
  if (!productName.value) {
    Toast("请填写名字");
    return;
  }
  if (fileList.value[0]?.status !== "done") {
    Toast("请填上传视频");
    return;
  }
  if (!productPrice.value) {
    Toast("请填写价格");
    return;
  }
  if (productPrice.value < 1) {
    Toast("价格不能小于1");
    return;
  }
  // 价格最多八位小数点
  if (productPrice.value.indexOf('.') > -1) {
    if (productPrice.value.split('.')[1].length > 8) {
      Toast("价格最多八位小数点");
      return;
    }
  }
  Toast.loading({
    message: "加载中11...",
    forbidClick: true,
  });
  const videoCid = fileList.value[0].value[0].cid;
  newProduct(
      1,
      1,
      productPrice.value,
      productName.value,
      videoCid
  )
      .then(() => {
        fileList.value = [];
        Dialog.alert({
          message: "链上确认中，请前往区块浏览器查看",
        });
        Toast.clear();
        initData();
      })
      .catch(() => {
        Toast.clear();
        productName.value = "";
        productPrice.value = "";
        fileList.value = [];
        proxy.$forceUpdate();
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

const afterRead = async (file) => {
  // 此时可以自行将文件上传至服务器
  file.status = "uploading";
  file.message = "上传中";
  let formData = new FormData();
  formData.append("file", file.file);
  formData.append("pinataOptions", JSON.stringify({cidVersion: "1"}));
  return await fetch(IPFS_URL, {
    method: "POST",
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    },
    body: formData,
  })
      .then((response) => response.json())
      .then((res) => {
        if (res.IpfsHash) {
          (file.status = "done"),
              (file.value = [
                {
                  url: `//unishop.mypinata.cloud/ipfs/${res.IpfsHash}`,
                  cid: res.IpfsHash,
                  isImage: true,
                },
              ]);
          return;
        }
        throw new Error(res);
      })
      .catch((error) => {
        file.status = "failed";
        file.message = "上传失败";
        console.error("error", error);
      });
};


const onShareIt = async (item) => {

  tokenProdMap(item.erc20Addr).then((res) => {
    const url =
        window.location.origin +
        window.location.pathname +
        `#/good_detail_video?erc20Addr=${item.erc20Addr}&chianType=${chain.chainType}&video=${res.video}&preAddress=${userAddress.value}`;
    activeRow.item = {...item, url};
    imgUrl.value = url
    isShowOverly.value = true;
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    Toast.clear();
  });
};
// 通过 actions 属性来定义菜单选项
const actions = (isOwner) => {
  // console.log('isOwner: ', isOwner);
  const current = [
    {text: "分享二维码", id: 2},
    {text: "NFT超级管理员", id: 3},
  ];
  if (isOwner) {
    current.push({text: "修改产品", id: 1});
  }
  return current;
};
const onSelect = (item, action) => {
  if (action.id == 2) {
    onShareIt(item);
    return;
  }
  if (action.id == 1) {
    router.push({
      path: "/modify_product",
      query: {
        ...item,
        chianType: route.query["chianType"],
      },
    });
    return;
  }
  if (action.id == 3) {
    return router.push({
      path: "/product_details", query: {
        ...item,
        chianType: route.query["chianType"],
      }
    });

  }
};
</script>
<style>
.card-img {
  background: url("../../assets/mining/bg@2x.png") no-repeat;
  background-size: 100% 100%;
  @apply w-[100%] h-[234px] p-4;
}
</style>
