<template>
  <div class="bg-black  box-border relative h-screen overflow-hidden">
    <div class="absolute  left-0 z-0">
      <van-swipe vertical :loop="false" :show-indicators="false" @change="changeVideo" class="h-[100vh]">
        <van-swipe-item v-for="(item, index) in goodsInfoList" :key="item.contractAddress" class="relative w-[100vw] h-[100vh]">
          <div class=" absolute flex flex-col space-y-2 bottom-[150px] z-50 right-4">
            <router-link to="/goods">
              <img class="w-10 h-10" src="../../assets/goods/ic_home@2x.png"/>
            </router-link>

            <img @click="onShareIt(item)" class="w-10 h-10" src="../../assets/goods/ic_back@2x.png"/>


          </div>
          <div v-if="item.name" class="rounded-2xl p-4 bg-black bg-opacity-80 absolute z-10 mx-auto ] block left-4 bottom-9 right-4
            border border-white border-opacity-50
          ">
            <div class="text-white text-[12px]">
              <div class="text-center -mt-4">
                <van-icon v-show="!showMore" size="15px" name="arrow-up" @click="handleShowMore(item)"></van-icon>
              </div>
              <div class="flex items-center justify-between">

                <img class="w-14 h-14 rounded-lg" :src="`//unishop.mypinata.cloud/ipfs/${item.logo}`" alt=""/>


                <div class="w-[50%] ml-2 flex-1">

                  <span class=" text-[14px]">{{ item.name }}</span>
                  <p class="text-[10px] text-white text-opacity-80">
                    Token价格：0U
                  </p>
                  <p class=" truncate overflow-hidden text-[10px] text-white text-opacity-80">
                    {{ item.contractAddress }}
                  </p>
                </div>
                <div>
                  <van-button @click.stop="toConfirmBuy(item)" class="w-[60px] h-8 rounded-lg ml-1" plain
                              type="primary">购买
                  </van-button>
                  <p class="text-white text-[10px] mt-[6px]">
                    价格：{{ item.price }}U
                  </p>
                </div>

              </div>
              <!-- <p class="text-[#FF8D1A] text-center -mb-4">
                等待产品token上市
              </p> -->
              <!-- <div class="flex justify-between mb-2">
                <span class="text-[14px]">通证合约地址：</span>
                <span class="break-all">{{ item.contractAddress }} </span>
              </div> -->

            </div>
          </div>
          <!-- 视频 -->
          <div class="w-full h-full " :id="`player${index}`">
            <!-- class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9" -->
            <!-- <VideoPlayer
            :key="`${index.contractAddress}`"
           :sources="[
            {
             src:`https://unishop.mypinata.cloud/ipfs/${item.video}`,
              type: 'video/mp4'
            }]"
            :fill="true"
            preload="auto"
            crossorigin="anonymous"
            :width="w"
            playsinline="true"
            :controls="false"
            :loop="true"
            :fluid="true"
            :playing="true"
            :autoplay="false"
            >
           <template v-slot="{player,state}">
            <van-icon :ref="el => rain[index] = {player,state}" @click="state.playing ? player.pause()  : player.play()" v-show="!state.playing"  size="56" color="#fff" name="play-circle-o"
                      class="w-14 h-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style="z-index: 999999999999999999999"></van-icon>

            
           </template>
          
            </VideoPlayer> -->
             <!-- :id="`player${index}`" -->
            <video
            :key="item.contractAddress"
            preload="auto"
             class="player"
             loop
             x-webkit-airplay="true"
     
              x5-video-player-type="h5-page"
              x5-playsinline="playsinline"
              webkit-playsinline="playsinline" 
              video-player-type="h5-page"
              playsinline="playsinline"  
                 x5-video-orientation="landscape|portrait"

              
               width="100%"
                height="100%"
               
                 :src="`//unishop.mypinata.cloud/ipfs/${item.video}`"></video>
            <van-icon
            v-show="!isPlay"
             @click="clickVideo(item, index)"  size="56" color="#fff" name="play-circle-o"
                      class="w-14 h-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style="z-index: 999999999999999999999"></van-icon>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
  <ShareAlert v-model:isShowOverly="isShowOverly" :imgUrl="imgUrl" :activeRow="activeRow"></ShareAlert>
</template>

<script setup>

//  import { VideoPlayer } from '@videojs-player/vue'
//  import 'video.js/dist/video-js.css'
  // import '@videojs/themes/dist/forest/index.css'
// import dataJSON from "./data.json";÷
import ShareAlert from '@/components/ShareAlert'
// eslint-disable-next-line no-unused-vars
import {nextTick, onMounted, ref, reactive, onErrorCaptured} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useChainStore} from "@/store";
import {storeToRefs} from "pinia";

import useProduct from "@/web3/contract/useProduct";
import {productChainAddress, TRON} from "@/web3/config";
// import 'preloadjs';

import {formatPrice} from '@/web3/tools'
import {Dialog} from "vant";
// const w = document.documentElement.clientWidth
// const rain = ref([])  
const router = useRouter();
const route = useRoute();
const chain = useChainStore();
const imgUrl = ref("");
const isShowOverly = ref(false);
const activeRow = reactive({item: {}});
const erc20Addr = route.query["erc20Addr"];
const goodsInfoList = reactive([])
let {connectionInstance, chainType} = storeToRefs(chain);
const {
  web3,
  userAddress,
  // eslint-disable-next-line no-unused-vars
  connected,
  tronProductChainContract,
} = storeToRefs(connectionInstance.value);
const {tokenProdMap, getuAddress} = useProduct({
  userAddress,
  web3,
  type: chainType,
  tronProductChainContract,
});


let isPlay = ref(false);


// let showMore = ref(false);
// const decrease = (item) => {
//   if (item.num === 0) return;
//   item.num--;
//   item.total = item.num * item.price;
// };
// const increase = (item) => {
//   item.num++;
//   item.total = item.num * item.price;
// };
const toConfirmBuy = (item) => {
 console.log('item',item.erc20Addr)
  router.push({
    path: "/confirm_buy",
    query: {
      chianType: chainType.value,
      erc20Addr: item.erc20Addr??erc20Addr,
      price: item.price,
      preAddress: route.query['preAddress']
    },
  });
};
const onShareIt = async (item) => {
  const url =
      window.location.origin +
      window.location.pathname +
      `#/good_detail_video?erc20Addr=${item.erc20Addr}&chianType=${chain.chainType}&video=${item.video}&preAddress=${userAddress.value}`;
  activeRow.item = {...item, url};
  imgUrl.value = url
  isShowOverly.value = true;
};

const handleShowMore = (item) => {
  router.push({
        path: "good_detail",
        query: {chianType: chainType.value, ...item,}
      }
  );
};
// 切换视频
const changeVideo = (index) => {
  console.log('index: ', index);
// eslint-disable-next-line no-debugger

  if (
      goodsInfoList[index]?.nextAddress
  ) {
    getVideoDomList(goodsInfoList[index].nextAddress)
  }
  goodsInfoList.forEach((_, idx) => {
      console.log(document.getElementById(`player${idx}`))
      document.getElementById(`player${idx}`)?.firstElementChild?.pause()

    });
  setTimeout(() => {
    let currentDom = document.getElementById(`player${index}`).firstElementChild;
    console.log('currentDom: ', currentDom);
    currentDom.load();
    currentDom.play();
    isPlay.value = currentDom.paused ? false : true;
  },1000);
};
// 点击视频
// eslint-disable-next-line no-unused-vars
const clickVideo = (_, index) => {
  let currentDom = document.getElementById(`player${index}`).firstElementChild;

  currentDom.paused ? currentDom.play() : currentDom.pause();
  isPlay.value = currentDom.paused ? false : true;
};
//视频预加载
//  const preloadfun = (url) => {
//   // eslint-disable-next-line no-undef
//   let preload = new createjs.LoadQueue(true);
//   preload.loadFile(url);
//   preload.on("complete", () => {
//     console.log("预加载完成");
//   });
//   preload.on("error", () => {
//     console.log("预加载失败");
//   });
//  }
const getVideoDomList = (erc20Addr, isNext = true) => {
  tokenProdMap(erc20Addr).then((res) => {
    console.log('res: ', res);
    // 
    // preloadfun('//unishop.mypinata.cloud/ipfs/' + res.video)
    goodsInfoList.push(
        {
          id: 1,
          erc20Addr: erc20Addr,
          name: res.name,
          price: formatPrice(res.price),
          video: res.video,
          logo: res.logo,//`//${res.logo}.ipfs.dweb.link`,
          contractAddress: productChainAddress(chainType),
          total: res.price,
          nextAddress: res.next,
          num: 1,
          showMore: false,
        }
    )
    if (isNext && res.next) {
      getVideoDomList(res.next, false)
    }
  });

};
const initData = async () => {
  await getuAddress()
  getVideoDomList(route.query['erc20Addr'])
};

// eslint-disable-next-line no-unused-vars
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
onErrorCaptured((error) => {
  console.log(error)
})
onMounted(() => {
  // window.webview.allowsInlineMediaPlayback = true
  // window.allowsInlineMediaPlayback = true
  // preloadfun('//unishop.mypinata.cloud/ipfs/' + route.query['video'])
  try {
    if (route.query['chianType'] == TRON) {
      if (!window.tronWeb) {
        Dialog.confirm({
          title: '提示',
          message: '您还未安装TronLink钱包，请先安装钱包',
          confirmButtonText: '安装钱包',
          cancelButtonText: '取消',
          async onConfirm() {
            window.open('https://www.tronlink.org/cn/');
          }
        })
        goodsInfoList.push({
          id: 1,
          name: '',
          price: '',
          video: route.query['video'],
          logo: '',
          contractAddress: '',
          total: '',
          nextAddress: '',
          num: 1,
          showMore: false,
        })

        return
      }

    } else {
      if (!window.ethereum) {
        Dialog.alert({
          message: '请在 TronLink、Web3、Ethereum 相关钱包打开 查看更多信息',
        }).then(() => {
          // on close
        });
        goodsInfoList.push({
          id: 1,
          name: '',
          price: '',
          video: route.query['video'],
          logo: '',
          contractAddress: '',
          total: '',
          nextAddress: '',
          num: 1,
          showMore: false,
        })
        return
      }
    }

    if (!connected.value) {
      handleClickConnectWallet();
    } else {
      initData();
    }
  } catch (error) {
    console.log('error: ', error);

  }

});
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
}

#app {
  height: 100vh;
}

video {
  width: 100%;
  height: 100%;
}
video::--webkit-media-controls-play-button{
  display: none !important;
  -webkit-appearance: none !important;
}

.player {
  position: absolute;
  z-index: 1;
  margin: 0;
  padding: 0;
  object-fit: cover;
}

.example {
  height: calc(100% - 60px);
}
</style>
