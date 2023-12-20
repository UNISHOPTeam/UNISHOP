<template>
  <div
    class="mt-3 mb-4 flex justify-between items-center rounded-2xl px-4 h-[52px] bg-white text-[#333]"
  >
    <div class="text-sm font-medium">商品市朔源信用经济唯一合约地址：</div>
    <p class="text-sm items-center w-[65%] break-words">
      {{ $route.query["erc20Addr"] }}
      <van-icon
        name="description"
        class="text-[#FF8D1A]"
        v-copy="`${$route.query['erc20Addr']}`"
      />
    </p>
  </div>
  <div class="rounded-2xl bg-white px-4">
    <div class="divide-y divide-[#EFEFEF]">
      <div class="flex justify-between items-center py-4">
        <h4 class="text-sm font-medium text-[#333]">产品名称：</h4>
        <p class="placeholder-[#CCCCCC] text-right text-sm">
          {{ name }}
        </p>
        <!-- <input
          type="text"
          placeholder="产品名称"
          v-model="name"
          class="placeholder-[#CCCCCC] text-right text-sm"
        /> -->
      </div>
      <div class="flex justify-between items-center py-4">
        <h4 class="text-sm font-medium text-[#333]">产品价格：</h4>
        <div class="flex">
          <input
            type="text"
            placeholder="产品价格"
            v-model="price"
            class="placeholder-[#CCCCCC] text-right text-sm"
          />
          <div
            class="border ml-2 border-[#CCE6FF] text-sm w-[64px] rounded-[8px] px-2 h-7 flex items-center justify-center"
          >
            U
            <img src="../../assets/2.jpg" class="w-3 ml-1" />
            <div
              class="border-[4px] ml-1 translate-y-[2px] h-2 w-2 border-l-transparent border-r-transparent border-b-transparent border-t-[#8CC5FF]"
            ></div>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center py-4">
        <h4 class="text-sm font-medium text-[#333]">产品logo：</h4>
        <!-- <img class="w-[56px] h-[56px] bg-[#999] rounded-xl"> -->
        <van-uploader
          v-model="logoFileList"
          style="--van-padding-xs: 0"
          accept="image/png, image/jpeg"
          :max-count="1"
          :after-read="afterRead"
        />
      </div>
      <div>
        <div class="flex justify-between items-center py-[10px]">
          <h4 class="text-sm font-medium text-[#333]">产品视频：</h4>
          <van-uploader
            v-model="videoFileList"
            style="--van-padding-xs: 0"
            accept="video/*"
            :max-size="1024 * 1024 * 1024 * 2"
            :max-count="1"
            :after-read="afterRead"
            @click-preview="handlePreview"
          >
            <!-- <template #preview-cover="{ file }">

              <video style="width:120px;height:120px;object-fit:cover;" :src="file.name" v-if="file.name"></video>
            </template> -->
          </van-uploader>
        </div>
        <p class="text-right text-xs text-[#CCCCCC]">
          *支持上传2GB以上长视频 mp4，m4v，等格式
        </p>
        <p class="text-right text-xs text-[#CCCCCC] pb-4">**请竖直拍摄</p>
      </div>

      <div class="flex justify-between items-center py-[10px]">
        <h4 class="text-sm font-medium text-[#333]">商品社区二维码：</h4>
        <van-uploader
          v-model="qrCodeFileList"
          style="--van-padding-xs: 0"
          accept="image/png, image/jpeg"
          :max-count="1"
          :after-read="afterRead"
        />
      </div>
      <div class="flex justify-between items-center py-4">
        <h4 class="text-sm font-medium text-[#333]">商户电话：</h4>
        <input
          v-model="phone"
          type="text"
          placeholder="13666668888"
          class="placeholder-[#CCCCCC] text-right text-sm"
        />
      </div>
      <div class="flex justify-between items-center py-4">
        <h4 class="text-sm flex-1 font-medium text-[#333]">向上拉私有推荐：</h4>
        <input
          type="text"
          placeholder="1200"
          v-model="next"
          class="placeholder-[#CCCCCC] text-right text-sm"
        />
      </div>
    </div>
    <van-button
      class="mx-6 w-[295px] h-10 mt-6 mb-4"
      round
      color="linear-gradient(135deg, #1AB3FF 0%, #1A8BFF 100%)"
      @click="handleSubmit"
    >
      确定修改
    </van-button>
    <van-dialog
      style="width: 80%; border-radius: 0; height: 90%"
      v-model:show="showvideoplay"
      @close="videourl = ''"
      :show-cancel-button="false"
      :show-confirm-button="false"
      closeOnClickOverlay
    >
      <video
        controls
        preload="auto"
        style="height: 100%; object-fit: contain"
        :src="videourl"
        v-if="videourl"
      ></video>
    </van-dialog>
  </div>
</template>
<script setup>
import { useChainStore } from "@/store";
import vCopy from "@/directives/copy";
import { ref, onMounted } from "vue";
import { IPFS_URL, PINATA_API_KEY, PINATA_SECRET_API_KEY } from "@/web3/config";
import { storeToRefs } from "pinia";
import useProduct from "@/web3/contract/useProduct";
import { Toast } from "vant";
import { useRoute } from "vue-router";
import { Dialog } from "vant";
import { formatPrice } from "@/web3/tools";
const VanDialog = Dialog.Component;
const route = useRoute();
const price = ref("");
const showvideoplay = ref(false);
const videourl = ref("");
const logoFileList = ref([]);
const videoFileList = ref([]);
const qrCodeFileList = ref([]);
const phone = ref("");
const next = ref("");
const name = ref("");

const chain = useChainStore();
let { connectionInstance, chainType } = storeToRefs(chain);
const { web3, userAddress, connected, tronProductChainContract } = storeToRefs(
  connectionInstance.value
);
const { updateProduct, tokenProdMap, getuAddress } = useProduct({
  userAddress,
  web3,
  type: chainType,
  tronProductChainContract,
  name,
});
onMounted(() => {
  if (!connected.value) {
    handleClickConnectWallet();
  } else {
    initData();
  }
});
console.log("chainType: ", chainType);

const handlePreview = () => {
  videourl.value = videoFileList.value[0]?.url;
  showvideoplay.value = true;
};
const initData = async () => {
  console.log("====================================");
  console.log(333, route.query["erc20Addr"]);
  console.log("====================================");
  await getuAddress();
  tokenProdMap(route.query["erc20Addr"]).then((res) => {
    console.log("res", res);
    price.value = formatPrice(res.price);
    phone.value = res.phone;
    next.value = res.next;
    name.value = res.name;
    if (res.logo) {
      logoFileList.value = [
        {
          url: `//${res.logo}.ipfs.dweb.link`,
          isImage: true,
          deletable: true,
          val: res.logo,
          status: "done",
        },
      ];
    }
    if (res.qrCode) {
      qrCodeFileList.value = [
        {
          url: `//${res.qrCode}.ipfs.dweb.link`,
          isImage: true,
          deletable: true,
          val: res.qrCode,
          status: "done",
        },
      ];
    }
    if (res.video) {
      videoFileList.value = [
        {
          url: `//${res.video}.ipfs.dweb.link`,
          deletable: true,
          type: "video",
          name: res.name,
          val: res.video,
          status: "done",
          isImage: false,
          isVideo: true,
        },
      ];
    }
  });
};
const handleSubmit = async () => {
  if (!connected.value) {
    return handleClickConnectWallet();
  }

  if (logoFileList.value[0]?.status !== "done") {
    Toast("请填上传图片");
    return;
  }
  if (!price.value) {
    Toast("请填写价格");
    return;
  }
  if (price.value < 1) {
    Toast("价格不能小于1");
    return;
  }
  if (!phone.value) {
    Toast("请填写电话");
    return;
  }
  if (!next.value) {
    Toast("请填写向上拉私有推荐");
    return;
  }
  if (videoFileList.value[0]?.status !== "done") {
    Toast("请填上传视频");
    return;
  }
  if (qrCodeFileList.value[0]?.status !== "done") {
    Toast("请填上传二维码");
    return;
  }
  Toast.loading({
    duration: 0,
    forbidClick: true,
    message: "上传中...",
  });

  const videoCid =
    videoFileList.value[0].val || videoFileList.value[0].value[0].cid;
  const logoCid =
    logoFileList.value[0].val || logoFileList.value[0].value[0].cid;
  const qrCodeCid =
    qrCodeFileList.value[0].val || qrCodeFileList.value[0].value[0].cid;
  const result = await uploaderJson(logoCid);
  if (result.IpfsHash) {
    try {
      console.log("====================================");
      console.log(
        route.query["erc20Addr"],
        name.value,
        videoCid,
        logoCid,
        qrCodeCid,
        phone.value,
        next.value,
        price.value
      );
      console.log("====================================");
      updateProduct(
        route.query["erc20Addr"],
        name.value,
        videoCid,
        logoCid,
        qrCodeCid,
        phone.value,
        next.value,
        price.value,
        result.IpfsHash,
      )
        .then((res) => {
          Toast("修改成功");
          console.log("res: ", res);
        })
        .catch(() => {
          Toast.clear();
        });
    } catch (error) {
      console.log("error: ", error);
      Toast.clear();
      Toast.fail("上传失败");
      return;
    }
  }
  Toast.clear();
};
const uploaderJson = async (cid) => {
  let formData = new FormData();
  const metadata = {
    name: name.value,
    description: "B2S 社区",
    image: `ipfs://${cid}`,
  };
  var blob = new Blob([JSON.stringify(metadata)], {
    type: "text/plain;charset=utf-8",
  });
  var file = new File([blob], "metadata.json", {
    type: "application/json",
  });
  formData.append("file", file);
  formData.append("pinataOptions", JSON.stringify({ cidVersion: "1" }));
  return await fetch(IPFS_URL, {
    method: "POST",
    headers: {
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    },
    body: formData,
  }).then((response) => response.json());
};

const afterRead = async (file) => {
  // 此时可以自行将文件上传至服务器
  file.status = "uploading";
  file.message = "上传中";
  let formData = new FormData();
  formData.append("file", file.file);
  formData.append("pinataOptions", JSON.stringify({ cidVersion: "1" }));
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
              url: `//${res.IpfsHash}.ipfs.dweb.link`,
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
</script>
