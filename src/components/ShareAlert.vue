
<template>
    <van-overlay :show="isShowOverly" @click="handleClose" style="z-index: 99999">
        <div id="tp" class="w-[311px] h-[480px] mt-[10px] rounded-2xl bg-white mx-auto p-5 flex flex-col" @click.stop>
            <div class="flex justify-between">
                <img class="w-[40px] h-[40px] rounded-[12px] border border-solid border-[#efefef] mr-[12px]" :src="
                    activeRow.item.logo
                        ? `//unishop.mypinata.cloud/ipfs/${activeRow.item.logo}`
                        : null
                " />
                <div class="flex flex-col justify-around p-1 flex-1">
                    <h4 class="text-lg text-[#333] font-semibold">
                        {{ activeRow.item.name }}
                    </h4>
                </div>
            </div>
            <p class="flex justify-between text-xs text-[#ccc] mt-[5px]">
                交易所在公链：
                <span class="text-[#333] text-xs font-medium flex">
                    <!-- <img src="../../assets/img/bsc.jpg" class="w-[16px] h-[16px]" alt=""> -->
                    {{ $route.query["chianType"] }}
                </span>
            </p>
            <p class="flex justify-between text-xs text-[#ccc] mt-[5px]">
                唯一通证溯源地址：
                <span class="text-[#333] text-xs font-medium flex break-all">
                    {{ activeRow.item.erc20Addr }}
                </span>
            </p>
            <p class="flex justify-between text-xs text-[#ccc] mt-[5px]">
                产品价格：
                <span class="text-[#1A8CFF] text-xs font-medium flex break-all">
                    {{ activeRow.item.price }} U
                </span>
            </p>
            <!-- <p class="flex justify-between text-xs text-[#ccc] mt-[5px]">
        总市值：
        <span class="text-[#1A8CFF] text-xs font-medium flex break-all">
          123,125,345 U
        </span>
      </p> -->

            <div class="border-t border-dashed border-[#efefef] my-4"></div>
            <div class="rounded-[14] bg-[#f5f5f5] p-[20px]">
                <vue-qr :text="imgUrl" :logoSrc='getIconImg($route.query["chianType"])' :size="500"></vue-qr>
            </div>
        </div>
        <div class="flex space-x-8 mx-[16%]">
            <div @click="handledownLoadImg"
                class="flex items-center justify-center text-sm text-white w-[112px] h-[40px] bg-[#00CC88] mt-7 rounded-[12px]">
                保存图片
            </div>
            <div v-copy="activeRow.item.url" style="
          background-image: linear-gradient(135deg, #1ab3ff 0%, #1a8bff 100%);
        " class="flex items-center justify-center text-sm text-white w-[112px] h-[40px] mt-7 rounded-[12px]">
                分享给好友
            </div>
        </div>
        <div class="h-[10px]"></div>
        <p class="text-[10px] text-[#B3B3B3] mx-[38px]">合约规则</p>
        <p class="text-[10px] text-[#B3B3B3] mx-[38px] break-normal">
            1，消费者购买产品将获得产品消费额20%商品股权积分，享受PE红利，成为消费股东。<br />
            2，消费者产品消费额10%进入UNISHOP底池，自动回购UNISHOP，进行质押挖矿，产生算力返回消费者购买产品的本金。<br />
            3，赠送消费产品传播者5%的商品股权积分。成为分享股东。<br />
            4，消费金额将通过2%的商城总交易量给所有参与质押UNISHOP者进行加权奖励。<br />
            5，产品消费额25%进入商品交易池，让商品积分良性增值。<br />
            6，产品消费额3%合规纳税。<br />
        </p>
    </van-overlay>
</template>

<script setup>


import vCopy from "@/directives/copy";
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import html2canvas from "html2canvas";
import { defineProps, defineEmits} from 'vue'

defineProps({
    isShowOverly: Boolean,
    imgUrl:String,
    activeRow: Object
})

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
const emit = defineEmits(['update:isShowOverly'])
const handleClose = ()=>{

    emit('update:isShowOverly', false)
}
const handledownLoadImg = () => {
    // 获取想要转换的dom节点
    // var dom = document.querySelector('body');
    const dom = document.getElementById("tp");
    html2canvas(dom, {
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
    }).then((canvas) => {
        // 将canvas转换成图片渲染到页面上
        const url = canvas.toDataURL("image/png"); // base64数据
        const image = new Image();
        image.src = url;
        savePicture(url);
    });
};
const savePicture = (Url = this.codeUrl) => {
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
    URL.revokeObjectURL(url);
};
</script>

<style>
</style>