<template>
  <div class="bg-white min-h-[326px]">
    <div class="head">
      <!-- TODO 预留头 -->
    </div>
    <div class="body">
      <div>aaaa</div>
      <img class="w-[189px] h-[88px] mx-auto mb-[24px]" src="../../assets/img/logo.jpg" />
      <div class="space-y-4 px-4">
        <div v-for="item in list" :key="item.id">
          <!-- 未展开部分 -->
          <div class="list   w-[343px] h-[80px] flex justify-between items-center mx-auto p-[12px] relative  z-20"
            :class="`bg${item.id}`">
            <div class="flex flex-1 items-center">
              <img v-if="item.id == 1" class="w-[40px] h-[40px]  mr-[8px]"
                src="../../assets/img/ranking_ic_first@2x.png" alt="">
              <img v-if="item.id == 2" class="w-[40px] h-[40px]  mr-[8px]"
                src="../../assets/img/ranking_ic_second@2x.png" alt="">
              <img v-if="item.id == 3" class="w-[40px] h-[40px]  mr-[8px]"
                src="../../assets/img/ranking_ic_third@2x.png" alt="">

              <div v-if="item.id > 3"
                class="w-[48px] h-[48px] flex items-center justify-center  mr-[8px] text-center font-semibold text-2xl ">
                {{ item.id }}
              </div>
              <img class="w-[48px] h-[48px]  mr-[8px]" :src="`//${item.cid}.ipfs.dweb.link`" alt="" />
              <div class="text-[#333] text-base font-bold overflow-ellipsis">
                {{ item.name }} ({{ item.chain }})
              </div>
            </div>
            <div>
              <div class="text-white text-base overflow-ellipsis" :class="{ 'text-black': item.id > 3 }">
                {{ item.offStakeDisplay }}
                UNISHOP
              </div>
              <div class="text-white text-opacity-60 text-xs overflow-ellipsis" :class="{ 'text-black': item.id > 3 }">
                ≈{{ item?.usd?.toFixed(2) }} $
              </div>
            </div>
            <div class="absolute bottom-0 w-[319px] text-center">
              <van-icon class="animate-bounce" @click="showMore(item)" v-show="!item.isShow" name="arrow-down"
                color="#000" size="16px" />
            </div>
          </div>
          <!-- 展开部分 -->
          <div v-show="item.isShow"
            class="w-[343px] min-h-[291px] bg-yellow-100 mx-auto mt-[-10px] rounded-[16px] rounded-t-none pt-[30px] pl-[12px] pr-[12px]"
            :class="{ 'bg-white-100': item.id > 4 }">
            <div>
              <div class="flex justify-between items-center mb-4">
                <div class="flex-2 overflow-ellipsis text-sm text-[#333]">
                  社长地址：
                </div>
                <span class="flex-1 overflow-hidden overflow-ellipsis text-xs text-right">{{ item.owner }}</span>
              </div>
              <div class="flex justify-between items-center mb-4">
                <div class="flex-1 overflow-ellipsis text-sm text-[#333]">
                  UNISHOP质押总量：
                </div>
                <b class="overflow-ellipsis text-base text-right">{{ item.offStakeDisplay }} UNISHOP</b>
              </div>
              <div class="flex justify-between items-center mb-4">
                <div class="flex-1 overflow-ellipsis text-sm text-[#333]">
                  UNISHOPCOINS.COM质押总量：
                </div>
                <b class="overflow-ellipsis text-base text-right">
                  {{ item.stake ? fromWei('??', `${item.stake}`) : '0' }}
                  UNISHOP</b>
              </div>
              <div class="flex justify-between items-center mb-4">
                <div class="flex-1 overflow-ellipsis text-sm text-[#333]">
                  UNISHOP合约矿工费收入：
                </div>
                <b class="overflow-ellipsis text-base text-right">0 UNISHOP</b>
              </div>
              <div class="flex justify-between items-center mb-5">
                <div class="flex-1 overflow-ellipsis text-sm text-[#333]">
                  公社商品市盈率经济收入：
                </div>
                <b class="overflow-ellipsis text-base text-right">0 U</b>
              </div>
              <div class="flex justify-between items-center mb-5">
                <div class="flex-1 overflow-ellipsis text-sm text-[#333]">
                  公社商品市盈率经济收入：
                </div>
                <b class="overflow-ellipsis text-base text-right">0 UNISHOP</b>
              </div>
              <div class="btns w-full flex justify-end items-center">
                <!-- <button class="btn-share w-[80px] h-[28px] mr-3">
                  分享有礼
                </button> -->
                <button @click="handleClickRouter(item)" class="btn-in w-[80px] h-[28px]">进入公社</button>
              </div>
              <div class="w-full flex justify-center mt-2 pb-2">
                <van-icon @click="showMore(item)" name="arrow-up" color="#333" size="16px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <NavTab />
  <div class=" h-16"></div>
</template>

<script>
import NavTab from '@/components/NavTab.vue'
import { fromWei, unit } from "@/web3/tools";
import { useChainStore } from '@/store';

export default {
  name: "rankPages",
  components: { NavTab },
  props: {
    msg: String,
  },
  setup() {
    const chain = useChainStore();
    return {
      chain
    }
  },
  data() {
    return {
      list: [
        {
          isShow: false,
          id: 1,
        },
      ],
    };
  },
  methods: {
    unit,
    fromWei,
    getFetchList() {
      fetch(`//unishopcoins.com/unishopapi_v1/list/ETH?time=` + Date.now())
        .then((res) => res.json())
        .then((res) => {
          this.list = res.map((item, index) => {
            let offStake = item.offStake ? fromWei('???', `${item.offStake}`) : '0';
            let offStakeDisplay = Number(offStake).toFixed(4);
            return {
              id: index + 1,
              isShow: index == 0,
              offStakeDisplay,
              ...item,
            };
          });
        });
    },
    async handleClickRouter(item) {
      this.chain.setChainType(item.chain)
      const { isShow, chain, stake, usd, owner, ...url } = item
      console.log('isShow: ', isShow, chain, stake, usd, owner);
      this.$router.push({
        path: `/commune_details`, query: {
          chianType: item.chain,
          ...url
        }
      })
    },
    showMore(item) {
      console.log(item);
      item.isShow = !item.isShow;
    },
  },
  created() {
    this.getFetchList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  background: rgba(255, 255, 255);
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.05);
  opacity: 1;
  border-radius: 16px;
}

.bg1 {
  background: url("../../assets/img/ranking_ic_first-bg@2x.png") no-repeat;
  background-size: 100% 100%;
}

.bg2 {
  background: url("../../assets/img/ranking_ic_second_bg@2x.png") no-repeat;
  background-size: 100% 100%;
}

.bg3 {
  background: url("../../assets/img/ranking_ic_third_bg@2x.png") no-repeat;
  background-size: 100% 100%;
}

.btn-share {
  border: 1px solid #fdc532;
  border-radius: 14px;
  color: #fdc532;
}

.btn-in {
  background: linear-gradient(135deg, #fee25a 0%, #fca90a 100%);
  border-radius: 14px;
  color: #ffffff;
}
</style>
