<template>
  <div class="flex justify-between items-center p-4">
    <div class="flex flex-1 items-center">
      <img v-if="$route.query['id'] == 1" class="w-10 h-10 mr-2" src="../../assets/img/ranking_ic_first@2x.png"
           alt=""/>
      <img v-if="$route.query['id'] == 2" class="w-10 h-10 mr-2" src="../../assets/img/ranking_ic_second@2x.png"
           alt=""/>
      <img v-if="$route.query['id'] == 3" class="w-10 h-10 mr-2" src="../../assets/img/ranking_ic_third@2x.png"
           alt=""/>

      <img :src="`//${$route.query['cid']}.ipfs.dweb.link`" class="w-[56px] h-[56px] mr-2" alt=""/>
      <h3 class="text-[#333] text-base font-semibold overflow-ellipsis">
        {{ $route.query["name"] || "" }}
      </h3>
    </div>
    <div class="">
      <CButton @click="handleClickManageCommunes" class="text-[#fff] border-0" style="
          background-image: linear-gradient(135deg, #1ab3ff 0%, #1a8bff 100%);
        ">
        管理公社
      </CButton>
      <CButton @click="handleShareIt" class="text-[#1A8CFF] mt-2">
        分享公社
      </CButton>
    </div>
  </div>
  <CCard>
    <div class="space-y-2">
      <CTextRow>
        <template v-slot:leftText> 公社权重：</template>
        <template v-slot:rightText> {{ unishopStakeTotal }}</template>
      </CTextRow>
      <CTextRow>
        <template v-slot:leftText> UNISHOP质押总量：</template>
        <template v-slot:rightText> {{ unishopStakeTotal }}</template>
        <template v-slot:uint> UNISHOP</template>
      </CTextRow>
      <CTextRow>
        <template v-slot:leftText> UNISHOPCOINS.COM质押总量：</template>
        <template v-slot:rightText>{{ unishopCoinStakeTotal }}</template>
        <template v-slot:uint> UNISHOP</template>
      </CTextRow>
      <CTextRow>
        <template v-slot:leftText> UNISHOP挖矿总收益：</template>
        <template v-slot:rightText> 0</template>
        <template v-slot:uint> UNISHOP</template>
      </CTextRow>
      <CTextRow class="w-full">
        <template v-slot:leftText> 商品市盈率经济收入：</template>
        <template v-slot:rightText> 0</template>
        <template v-slot:uint> U</template>
      </CTextRow>
    </div>
  </CCard>
  <h3 class="text-base mb-2 font-semibold text-[#333] mx-3 mt-6">
    {{ erc20Obj.name }}价格波动图
  </h3>
  <CCard class="min-w-[208px] h-[200px]">
    <p class="text-base py-1 font-semibold text-[#333]">$ {{ erc20Price }}</p>
    <CLine style="height: 100%; width: 100%" :xAxis="xAxis" :series="series"/>
  </CCard>

  <h3 class="text-base mb-2 font-semibold text-[#333] mx-3 mt-6">
    {{ erc20Obj.name }}购买交易
  </h3>
  <CCard class="relative">
    <div class="min-h-[64px] rounded-[12px] p-2" :class="[isSale ? 'bg-[#F3F7FB]' : 'bg-[#FCF8F4]']">
      <div class="mx-1 h-[35px] rounded-[12px] overflow-hidden flex items-center">
        <div class="flex-1">
          <input disabled type="text" v-model="_constVal" placeholder="预计消耗数量"
                 class="flex w-full px-3 text-sm placeholder-gray-200::placeholder text-base bg-transparent"/>
        </div>
        <div class="min-w-5 bg-white px-[8px] py-[6px] text-sm font-semibold text-center rounded-[8px]"
             @click="handleMaxBtnClick">
          MAX
        </div>
        <div key="to"
             class="hover:bg-opacity-60 w-[96px] rounded-[8px] px-[8px] py-[6px] flex items-center relative bg-white">
          <span class="text-sm text-center w-full font-semibold">
            <!-- {{unit(chain.chainType)}} -->
            {{ isSale ? erc20Obj.name : unit(chain.chainType) }}
          </span>
        </div>
      </div>
      <div class="text-[#ccc] font-normal text-xs text-right mt-2">
        余额：{{ isSale ? balance : assets }} 枚
      </div>
    </div>
    <div class="relative h-4">
      <img class="w-8 h-8 mx-auto absolute -top-2 left-2/4 -translate-x-2/4"
           :class="{ invisible: erc20Obj.name !== 'UNISHOP' }" src="../../assets/img/ic_switch.png"
           @click="handleSwitchClick"/>
    </div>

    <div class="min-h-[64px] rounded-[12px] p-2" :class="[!isSale ? 'bg-[#F3F7FB]' : 'bg-[#FCF8F4]']">
      <div class="mx-1 h-[35px] rounded-[12px] overflow-hidden flex items-center">
        <div class="flex-1">
          <input type="text" v-model="unishopVal" @input="onChangeUnishopValue" placeholder="请输入兑换数量"
                 class="flex w-full px-3 text-sm placeholder-gray-200::placeholder text-base bg-transparent"/>
        </div>

        <div key="from"
             class="hover:bg-opacity-60 w-[100px] rounded-[8px] bg-white px-[8px] py-[6px] flex items-center relative"
             @click="
            () => {
              if (isSale) return
              handleClickChainSelect('from')
            }
          ">
          <span class="text-sm font-semibold text-center w-full">
            <!-- {{ erc20Obj.name }}  -->
            {{ isSale ? unit(chain.chainType) : erc20Obj.name }}
          </span>
          <span v-show="!isSale"
                class="absolute right-2 -mb-1 w-[6px] border-t-[#8CC5FF] border-l-transparent border-r-transparent border-b-transparent border-4"></span>
        </div>
      </div>
      <div class="text-[#ccc] font-normal text-xs text-right mt-2">
        余额：{{ !isSale ? balance : assets }} 枚
      </div>
    </div>

    <!-- <CButton
      style="
        background-image: linear-gradient(135deg, #1ab3ff 0%, #1a8bff 100%);
      "
      class="mt-[28px] w-[176px] h-8 text-[#fff] text-xs mx-auto"
      @click="handleClickExchange"
    >
      <CLoading v-if="loading" />
      {{ connected ? "兑换" : "连接钱包" }}
    </CButton> -->

    <div class="space-x-2 flex">
      <CButton v-if="!isSaleApprove" @click="handleClickSaleApprove"
               class="mt-[28px] w-[176px] h-8 text-[#1a8bff] text-xs mx-auto">
        {{ !connected ? "连接钱包" : "Approve" }}
      </CButton>

      <CButton @click="handleClickExchange" style="
          background-image: linear-gradient(135deg, #1ab3ff 0%, #1a8bff 100%);
        " class="mt-[28px] w-[176px] h-8 text-[#fff] text-xs mx-auto">
        <CLoading v-if="loading"/>
        {{ connected ? "兑换" : "连接钱包" }}
      </CButton>
    </div>
  </CCard>
  <h3 class="text-base mb-2 font-semibold text-[#333] mx-3 mt-6">
    {{ erc20Obj.name }}质押
  </h3>

  <CCard>
    <div class="space-y-3">
      <div class="flex justify-between items-center">
        <Cfont14> 质押代币：</Cfont14>
        <div key="stake"
             class="hover:bg-opacity-60 w-[152px] h-[28px] border border-solid border-[#CCE6FF] px-2 py-[6px] rounded-[8px] relative flex items-center"
             @click="handleClickChainSelect('stake')">
          <span class="text-xs font-semibold">{{ erc20Obj.name }}</span>
          <span
              class="absolute right-2 h-0 mt-[3px] w-[6px] border-t-[#8CC5FF] border-l-transparent border-r-transparent border-b-transparent border-4"></span>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <Cfont14> 质押数量：</Cfont14>
        <van-stepper @change="onChangeStake" v-model="stakeVal" :max="balance" input-width="94px" min="0.000001"
                     step="0.01" button-size="28px"/>
      </div>
      <div class="text-[#ccc] font-normal text-xs text-right">
        {{ erc20Obj.name }}余额：{{ balance }} 枚
      </div>

      <CTextRow>
        <template v-slot:leftText> 个人算力：</template>
        <template v-slot:rightText> {{ assessPowerVal }}</template>
        <template v-slot:uint> KB</template>
      </CTextRow>

      <div v-show="erc20Obj.name == 'UNISHOP'" class="flex justify-between items-center">
        <Cfont14> 质押周期：</Cfont14>
        <div @click="cycleShow = true"
             class="hover:bg-opacity-60 w-[152px] h-[28px] border border-solid border-[#CCE6FF] px-2 py-[6px] rounded-[8px] relative flex items-center">
          <span class="text-xs font-semibold">{{ cycleActive.name }}</span>
          <span
              class="absolute right-2 h-0 mt-[3px] w-[6px] border-t-[#8CC5FF] border-l-transparent border-r-transparent border-b-transparent border-4"></span>
        </div>
      </div>
    </div>

    <div class="space-x-2 flex">
      <CButton v-if="!isApprove" @click="handleClickApprove"
               class="mt-[28px] w-[176px] h-8 text-[#1a8bff] text-xs mx-auto">
        <CLoading class="text-[#1a8bff]" v-if="loading1"/>
        {{ !connected ? "连接钱包" : "Approve" }}
      </CButton>

      <CButton @click="handleStakeClick" :disabled="loading1" style="
          background-image: linear-gradient(135deg, #1ab3ff 0%, #1a8bff 100%);
        " class="mt-[28px] w-[176px] h-8 text-[#fff] text-xs mx-auto">
        {{ !connected ? "连接钱包" : "开始质押" }}
      </CButton>
    </div>
  </CCard>
  <!-- 我的资产 -->
  <h3 class="text-base mb-2 font-semibold text-[#333] mx-3 mt-6">我的资产</h3>
  <CCard class="flex flex-col justify-between mt-2 assets-bg">
    <h2 class="text-[#fff] text-base font-normal text-center">
      <span class="font-semibold text-2xl">$</span>
      {{ currentPrice }}
    </h2>
    <div class="space-y-2 my-5">
      <CTextRow>
        <template v-slot:leftText>
          <span class="text-[#fff]">UNISHOPCOINS.COM 激活比例：</span>
        </template>
        <template v-slot:rightText>
          <span class="text-[#fff]">
            {{ preActivePercent }}
          </span>
        </template>
        <!-- <template v-slot:uint> UNISHOP </template> -->
      </CTextRow>
      <CTextRow>
        <template v-slot:leftText>
          <span class="text-[#fff]">UNISHOP质押总量：</span>
        </template>
        <template v-slot:rightText>
          <span class="text-[#fff]">
            {{ userStake }}
          </span>
        </template>
        <!-- <template v-slot:uint> UNISHOP </template> -->
      </CTextRow>
      <CTextRow>
        <template v-slot:leftText>
          <span class="text-[#fff]">推荐奖励算力：</span>
        </template>
        <template v-slot:rightText>
          <span class="text-[#fff]">
            {{ extPower }}
          </span>
        </template>
        <!-- <template v-slot:uint> UNISHOP </template> -->
      </CTextRow>
    </div>

    <ul class="flex justify-between">
      <li v-for="(item, index) in assetsTools" :key="index" @click="clickBtn"
          class="flex font-normal items-center text-xs text-white">
        <img class="flex w-[18px] mr-1 align-top" :src="item.img" alt=""/>
        {{ item.title }}
      </li>
    </ul>
  </CCard>
  <!-- 收益 -->
  <h3 class="text-base mb-2 font-semibold text-[#333] mx-3 mt-6">收益</h3>

  <CCard>
    <div class="flex justify-between">
      <Cfont14> 当前算力：</Cfont14>
      <div class="flex">
        <h5 class="text-[#333] mr-3">
          {{ powerVal }}
          <span>KB</span>
        </h5>
        <CButton @click="$router.push({ path: '/decompress', query: $route.query })" class="border-0 text-white"
                 style="background: linear-gradient(135deg, #ffaa33 0%, #fa7d00 100%)">解压
        </CButton>
      </div>
    </div>

    <CCard class="h-[116px] my-bg mt-4 mx-0">
      <div class="flex justify-between flex-col">
        <h2 class="text-[24px] font-bold text-[#FF8D1A] text-center mt-4">
          {{ Number(nowRewardDisplay).toFixed(10) }}
          <span class="text-base"> UNISHOP </span>
        </h2>
        <span class="text-[10px] font-bold opacity-40 text-[#333] text-center">
          ≈{{ (unishop2Usd * nowRewardDisplay).toFixed(6) }}$
        </span>
        <p class="text-xs font-medium text-[#333] opacity-40 text-center">
          UNISHOP铸币收益
        </p>
      </div>
    </CCard>

    <CCard style="
        background-image: linear-gradient(135deg, #ffe6cc 0%, #ffcc99 100%);
      " class="h-max-[400px] mt-4 mx-0">
      <h2 class="text-[24px] font-bold text-[#FF8D1A] text-center mt-4">
        {{nowUReward}}
        <span class="text-base"> U </span>
      </h2>
      <p class="text-xs font-medium text-[#333] opacity-40 text-center">
        U商品市盈率经济
      </p>
      <div class="space-y-2 mt-6">
        <CTextRow>
          <template v-slot:leftText> 全链商品销售总量：</template>
          <template v-slot:rightText> {{ totalUReward }}</template>
        </CTextRow>
        <CTextRow>
          <template v-slot:leftText> 我的U收益：</template>
          <template v-slot:rightText> {{ usrUReward }}</template>
        </CTextRow>
<!--        <CTextRow>-->
<!--          <template v-slot:leftText> UNISHOP挖矿收益：</template>-->
<!--          <template v-slot:rightText> 0 $</template>-->
<!--        </CTextRow>-->
      </div>
    </CCard>

    <div class="flex justify-between my-4 items-center">
      <span class="text-sm text-[#333]"> 收益选择： </span>

      <div
          @click="onChangReceive(true)"
          class="w-[64px] h-[28px] bg-[#F5F5F5] flex justify-center items-center rounded-[8px] border border-solid border-[#FF8D1A] text-xs text-[#333] ml-[8px]"
          :class="isUNISHOP?'activeToken':''"
      >
        UNISHOP
      </div>
      <div
          @click="onChangReceive(false)"
          class="w-[64px] h-[28px] bg-[#F5F5F5] flex justify-center items-center rounded-[8px] border border-solid border-[#FF8D1A] text-xs text-[#333] ml-[8px]"
          :class="!isUNISHOP?'activeToken':''"
      >
        U
      </div>
      <div></div>
      <!--      <div-->
      <!--        class="w-[64px] h-[28px] bg-[#F5F5F5] flex justify-center items-center rounded-[8px] border border-solid border-[#FF8D1A] text-xs text-[#333] ml-[8px]">-->
      <!--        全部-->
      <!--      </div>-->
    </div>
    <div @click="handleClickReceiveBtn"
         class="flex justify-center items-center h-[32px] max-w-[176px] mx-auto rounded-[16px] text-xs text-white"
         style="
        background-image: linear-gradient(135deg, #ffaa33 0%, #fa7d00 100%);
      ">
      领取收益
    </div>
  </CCard>
  <div class="mt-9"></div>
  <van-action-sheet v-model:show="chainShow" :actions="actions" @select="onSelect" cancel-text="取消"
                    close-on-click-action @cancel="onCancel"/>
  <van-action-sheet v-model:show="cycleShow" :actions="cycleList" @select="handleClickCycleSelect" cancel-text="取消"
                    close-on-click-action/>
  <van-overlay :show="isShowOverly" @click="isShowOverly = false" style="z-index: 99999">
    <div id="tp" class="w-[311px] h-[480px] mt-[20%] rounded-2xl bg-white mx-auto p-5 flex flex-col" @click.stop>
      <div class="flex justify-between">
        <img class="w-[64px] h-[64px] rounded-[12px] border border-solid border-[#efefef] mr-[12px]"
             :src="`//${$route.query['cid']}.ipfs.dweb.link`"/>
        <div class="flex flex-col h-[64px] justify-around p-1 flex-1">
          <h4 class="text-xs text-[#333] font-semibold">
            {{ $route.query["name"] || "" }}
          </h4>
          <p class="flex justify-between text-xs text-[#ccc]">
            公社年化利润：
            <span class="text-[#1A8CFF] text-xs font-medium">
              231,932,128$
            </span>
          </p>
        </div>
      </div>
      <div class="text-xs text-[#ccc] mt-2">
        分享好友，质押UNISHOP <br/>
        质押200天获得：15%推荐奖励算力<br/>
        质押700天获得：25%推荐奖励算力<br/>
        推荐奖励算力，永久有效，永不归零<br/>
      </div>
      <div class="border-t border-dashed border-[#efefef] my-4"></div>
      <div class="rounded-[14] bg-[#f5f5f5] p-[20px]">
        <img :src="codeUrl"/>
      </div>
    </div>
    <div class="flex space-x-8 mx-[16%]">
      <div @click="downLoadImg"
           class="flex items-center justify-center text-sm text-white w-[112px] h-[40px] bg-[#00CC88] mt-7 rounded-[12px]">
        保存图片
      </div>
      <div v-copy="windsHrefFun() + userAddress" style="
          background-image: linear-gradient(135deg, #1ab3ff 0%, #1a8bff 100%);
        " class="flex items-center justify-center text-sm text-white w-[112px] h-[40px] mt-7 rounded-[12px]">
        分享给好友
      </div>
    </div>
  </van-overlay>
</template>

<script>
import vCopy from "@/directives/copy"
import QRCode from "qrcodejs2"
import html2canvas from "html2canvas"
import CButton from "@/components/CButton.vue"
import CCard from "@/components/CCard.vue"
import CTextRow from "@/components/CTextRow.vue"
import Cfont14 from "@/components/Cfont14.vue"
import CLoading from "@/components/CLoading.vue"
import {
  computed,
  getCurrentInstance,
  nextTick,
  toRef,
  onUnmounted,
  reactive,
  ref,
} from "vue"
import {useChainStore} from "@/store"
import {useToggle} from "@vant/use"
import {storeToRefs} from "pinia"
import useErc20tokenAddress from "@/web3/contract/useErc20tokenContract"
import useStakeContract from "@/web3/contract/useStakeContract"
import useReceiveContract from "@/web3/contract/useReceiveContract"
import useCommonStakeContract from "@/web3/contract/useCommonStakeContract"
import useBuyContract from "@/web3/contract/useBuyContract"
import {_debounce} from "@/libs/util"
import {ARBITRUM, TRON, BSC, GAS} from "@/web3/config"
import {fromWei, unit} from "@/web3/tools"
import BigNumber from "bignumber.js"
import CLine from "../../components/CLine.vue"
import {useRoute, useRouter} from "vue-router"
import useUReceiveContract from '@/web3/contract/useUReceiveContract'
import {HOST as HOST_IP} from "../../web3/constants.js"

const PRICE_URL = "//unishopcoins.com/unishopapi_v1/price"
// const PRICE_URL = "/unishopapi_v1/price"

let timer, timer_u

function stopTimer() {
  if (timer) {
    clearInterval(timer)
  }
  if (timer_u) {
    clearInterval(timer_u)
  }
}

export default {
  name: "communeDetailPages",
  components: {CButton, CCard, CTextRow, Cfont14, CLoading, CLine},
  data() {
    return {
      assetsTools: [
        // { title: "扫一扫", img: require("../../assets/img/my_ic_scan@2x.png") },
        // {
        //   title: "转账",
        //   img: require("../../assets/img/ranking_ic_transfer@2x.png"),
        // },
        // {
        //   title: "收款",
        //   img: require("../../assets/img/ranking_ic_receive@2x.png"),
        // },
      ],
      apiCurrentPrice: 0,
      xAxis: [],
      series: [],
      cycleShow: false,
      cycleList: [
        {name: "30天", subname: "10KB/枚，无奖励，质押30天", id: "1"},
        {name: "200天", subname: "20KB/枚，奖励5%UNISHOP，质押200天", id: "2"},
        {name: "700天", subname: "30KB/枚，奖励10%UNISHOP，质押700天", id: "3"},
      ],
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const {proxy} = getCurrentInstance()
    const erc20Obj = reactive({name: "UNISHOP", id: "UNISHOP"})
    const cycleActive = reactive({name: "700天", id: "3"})
    const stakeVal = ref(0.01) //质押value
    const balance = ref(0) // 代币余额
    const unishopVal = ref(null) // 用户输入的值
    const unitUsdPrice = ref(0) // 代币单价
    const unishopStakeTotal = ref(0) // unishop 总质押量
    const unishopCoinStakeTotal = ref(0) // unishopcoins 总质押量
    const powerVal = ref(0) // 用户算力
    const assessPowerVal = ref(0) // 质押时预估算力
    const nowReward = ref(0) // 可以领取多少unishop
    const nowUReward = ref(0) // 可以领取多少u
    const totalUReward = ref(0) // 全网u
    const usrUReward = ref(0) // 全网u
    const nowRewardDisplay = ref(0) //
    const unishop2Usd = ref(0) // 我的资产中ent换成usd
    // const goodsVal = ref(null); // 购买的代币
    const _constVal = ref(null)
    const [loading, setLoading] = useToggle(false) // 兑换的loading
    const [loading1, setLoading1] = useToggle(false) // 质押loading
    const isApprove = ref(false)
    const isSaleApprove = ref(false)
    const isShowOverly = ref(false)
    const isSale = ref(false)
    const [chainShow, setChainShow] = useToggle(false) // 下拉选择显示和隐藏
    const currentPrice = ref(0) // 我的资产
    const preActivePercent = ref(0) // 激活比例
    const extPower = ref(0) // 推荐奖励算力
    const userStake = ref(0) // 质押量
    const unishopCoinNum = ref(0) // unishopCoinValue 个数

    const codeUrl = ref("")
    const isUNISHOP = ref(true)



    const actions = computed(() => {
      return [
        {name: "UNISHOPCOINS", id: "UNISHOPCOINS"},
        {name: "UNISHOP", id: "UNISHOP"},
      ]
    })

    const chain = useChainStore()
    let {connectionInstance, chainType} = storeToRefs(chain)
    console.log("type: ", chainType)


    const {
      web3,
      tronWeb,
      userAddress,
      assets,
      connected,
      tronBuyContract,
      tronTokenContract,
      tronStakeContract,
      tronReceiveContract,
      tronCommonStakeContract,

    } = storeToRefs(connectionInstance.value)

    console.log(
        "web3, tronWeb, userAddress",
        web3,
        tronWeb,
        userAddress,
        assets
    )

    const {getCost, buyToken, getBuyCost, getSaleCost, saleToken} =
        useBuyContract({
          userAddress,
          web3,
          type: chainType,
          tronBuyContract,
          erc20Type: toRef(erc20Obj, "id"),
        })

    const {getBalance, approve, allowance, saleApprove, saleAllowance} =
        useErc20tokenAddress({
          userAddress,
          web3,
          type: chainType,
          tronTokenContract,
          erc20Type: toRef(erc20Obj, "id"),
        })

    // eslint-disable-next-line no-unused-vars
    const {stake, stakeWithAdvice, getNftStake} = useStakeContract({
      userAddress,
      web3,
      type: chainType,
      tronStakeContract,
      erc20Type: toRef(erc20Obj, "id"),
    })

    const {
      getPreActivePercent,
      getUserStake,
      getExtPower,
      getUserPower,
      getGroupStake,
    } = useCommonStakeContract({
      userAddress,
      web3,
      type: chainType,
      tronCommonStakeContract,
    })

    const {tokenRecords, sendToken:USendToken} = useUReceiveContract({
      userAddress,
      web3,
      type: chainType,
      tronReceiveContract,
      erc20Type: toRef(erc20Obj, "id"),
    })
    // eslint-disable-next-line no-unused-vars
    const {getSentToken, sendToken} = useReceiveContract({
      userAddress,
      web3,
      type: chainType,
      tronReceiveContract,
      erc20Type: toRef(erc20Obj, "id"),
    })
    const windsHrefFun = () => {
      const WINDOWURL =
          window.location.origin + window.location.pathname + window.location.hash
      return (
          (WINDOWURL.includes("upaddress")
              ? WINDOWURL.slice(0, WINDOWURL.lastIndexOf("upaddress") - 1)
              : WINDOWURL) + `&upaddress=`
      )
    }

    const fetchGetUReward = (reduceReceive = 0) => {

      let host = "unishop_bsc"
      if (chainType.value === ARBITRUM) {
        host = "unishop_arbi"
      }
      if (chainType.value === TRON) {
        host = "unishop_tron"
      }
      const url = `//${HOST_IP}/${host}/frontGetProdRewards?addr=${userAddress.value}`
      console.log("frontGetProdRewards url = ", url)
      fetch(url, {
        method: "GET",
      })
          .then((res) => res.json())
          .then((data) => {
            console.log('datafrontGetProdRewards',data)
              console.log('reduceReceive = ',reduceReceive);

            // const speed = data.data.speed
            totalUReward.value = Number(fromWei("??",  data.data.allReward)).toFixed(2)
            usrUReward.value = Number(fromWei("??",  data.data.usrReward)).toFixed(12)
            nowUReward.value = Number(fromWei("??",new BigNumber(data.data.usrReward || 0).minus(
                reduceReceive
            ))).toFixed(12)
            // nowUReward.value = fromWei("??", nowReward.value)

          })
    }

    const fetchGetNftReward = (reduceReceive = 0) => {

      let host = "unishop_bsc"
      if (chainType.value === ARBITRUM) {
        host = "unishop_arbi"
      }
      if (chainType.value === TRON) {
        host = "unishop_tron"
      }
      const index = route.query["index"]
      const url = `//${HOST_IP}/${host}/frontGetUnishopReward?addr=${userAddress.value}&nft=${index}`
      fetch(url, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          const totalReward = data.data.totalValue
          const speed = data.data.speed

          nowReward.value = totalReward - reduceReceive
          // unishop2Usd.value = data.data.usdPrice;  //TODO: 老算法
          stopTimer()
          timer = setInterval(() => {
            nowReward.value += speed
            nowRewardDisplay.value = fromWei("??", nowReward.value)
          }, 1000)
        })
    }
    const onChangReceive = (e) => {
      isUNISHOP.value = e
    }
    const handleClickReceiveBtn = async () => {
      if (!connected.value) {
        return handleClickConnectWallet()
      }
      proxy.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      })


      let host = "unishop_bsc"
      if (chainType.value === ARBITRUM) {
        host = "unishop_arbi"
      }
      if (chainType.value === TRON) {
        host = "unishop_tron"
      }

      if(isUNISHOP.value){
        let URL = `//${HOST_IP}/${host}/frontUnishopSignToken?sender=${userAddress.value}&nft=${route.query["index"]}`;
        const result = await fetch(URL ).then((res) => res.json());

        if (result.success) {
          sendToken(route.query["index"],result.data.value,result.data.sig).then((res) => {
            console.log("sendToken: ", res)
            proxy.$toast.clear()
            proxy.$toast.success("链上确认中!请前往区块浏览器查看")
          })
        }
      }else {
        let URL = `//${HOST_IP}/${host}/frontProdSignToken?sender=${userAddress.value}`
        const result = await fetch(URL ).then((res) => res.json());
        if (result.success) {
          USendToken(result.data.value,result.data.sig).then((res) => {
            console.log("sendToken: ", res)
            proxy.$toast.clear()
            proxy.$toast.success("链上确认中!请前往区块浏览器查看")
          })
        }
      }





    }

    const handleClickConnectWallet = async (isAlert = true) => {
      await connectionInstance.value.onConnect(
          chain.chainType,
          // route.query.chainType,
          () => {
            initData()
          },
          isAlert
      )
    }

    const onChangeStake = async () => {
      assessPower()
      if (isApprove.value) return
      isApprove.value = await allowance()
    }
    const assessPower = () => {
      const _level = cycleActive.id
      let _value = stakeVal.value
      if (_level === "1" || erc20Obj.name !== "UNISHOP") {
        assessPowerVal.value = _value * 10
      } else if (_level === "2") {
        assessPowerVal.value = _value * 20
      } else if (_level === "3") {
        assessPowerVal.value = _value * 30
      }
    }

    const handleClickChainSelect = () => {
      setChainShow(true)
    }

    const onSelect = async (val) => {
      console.log("val:onSelect ", val)
      isSale.value = false
      erc20Obj.name = val.name
      erc20Obj.id = val.id
      unishopVal.value = ""
      _constVal.value = ""
      isApprove.value = false

      if (val.name === "UNISHOPCOINS") {
        isSaleApprove.value = true
      }
      if (chainType.value === TRON) {
        await connectionInstance.value.setLibraryContract(val.name)
      }
      initData()
    }

    const handleClickCycleSelect = (val) => {
      cycleActive.name = val.name
      cycleActive.id = val.id
      unishopVal.value = ""
      _constVal.value = ""
      assessPower()
    }

    const onCancel = () => {
    }

    const handleClickApprove = () => {
      if (!connected.value) {
        return handleClickConnectWallet()
      }
      proxy.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      })
      approve().then(() => {
        isApprove.value = true
        proxy.$toast.clear()
        proxy.$toast.success("链上确认中!请前往区块浏览器查看")
      })
    }

    const handleClickSaleApprove = () => {
      if (!connected.value) {
        return handleClickConnectWallet()
      }
      proxy.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      })
      saleApprove().then(() => {
        isSaleApprove.value = true
        proxy.$toast.clear()
        proxy.$toast.success("链上确认中!请前往区块浏览器查看")
      })
    }

    const handleStakeClick = () => {
      if (!connected.value) {
        return handleClickConnectWallet()
      }
      if (!isApprove.value) {
        return proxy.$toast.fail("请先Approve")
      }
      let methodStake = stake,
          level = null,
          upAddress = null

      if (erc20Obj.name === "UNISHOP") {
        level = cycleActive.id
        upAddress = route.query["upaddress"] ?? null
        methodStake = route.query["upaddress"] ? stakeWithAdvice : stake
      }
      setLoading1(true)
      let sValue = stakeVal.value + "";
      //fix max issue
      if (Math.abs(balance.value - stakeVal.value) < 0.0000000000000001) {
        sValue = balance.value + "";
      }

      methodStake(route.query["index"], sValue, level, upAddress)
          .then((res) => {
            setLoading1(false)
            console.log("stake", res)
            _constVal.value = ""
            unishopVal.value = ""
            initData()
            proxy.$toast.clear()
          })
          .catch((error) => {
            setLoading1(false)
            _constVal.value = ""
            unishopVal.value = ""
            proxy.$toast.clear()
            console.table(error)
          })
    }
    const handleMaxBtnClick = async () => {
      if (!connected.value) {
        return proxy.$toast.fail("请先连接钱包")
      }
      let uintPrice = null,
          toBalance = null, // 消耗掉的币
          fromBalance = null
      if (erc20Obj.name === "UNISHOP") {
        if (isSale.value) {
          uintPrice = await getSaleCost("1")
          toBalance = balance.value
          fromBalance = assets.value
        } else {
          uintPrice = await getBuyCost("1")
          toBalance = assets.value
          fromBalance = balance.value
        }
      } else {
        uintPrice = await getCost("1")
        toBalance = assets.value
        fromBalance = balance.value
      }
      console.log(
          "===============uintPrice,toBalanc,fromBalance,GAS[erc20Obj.name]====================="
      )
      if (!isSale.value) {
        toBalance = toBalance - GAS[chainType.value];
        if (toBalance < 0) {
          toBalance = 0;
        }
      }

      console.log(uintPrice, toBalance, fromBalance, GAS[chainType.value], chainType)
      console.log("====================================")
      const consume = new BigNumber(toBalance).div(uintPrice)

      unishopVal.value = consume.toFixed(6)

      onChangeUnishopValue()
    }
    const onChangeUnishopValue = _debounce(function async() {
      if (!unishopVal.value) {
        return
      }
      if (!connected.value) {
        return proxy.$toast.fail("请先连接钱包")
      }
      if (erc20Obj.name === "UNISHOP") {
        if (isSale.value) {
          //
          getSaleCost(unishopVal.value).then((res) => {
            _constVal.value = res
          })
          return
        } else {
          getBuyCost(unishopVal.value).then((res) => {
            _constVal.value = res
          })
          return
        }
      } else {
        getCost(unishopVal.value).then((res) => {
          _constVal.value = res
        })
      }
    })

    const handleClickExchange = () => {
      if (!connected.value) {
        return handleClickConnectWallet()
      }
      if (!unishopVal.value) return
      // if (!goodsVal.value) return;
      setLoading(true)
      proxy.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      })
      if (isSale.value && !isSaleApprove.value) {
        return proxy.$toast.fail("请先Approve")
      }
      // 判断 是否是 逆向兑换
      let contractMethods = isSale.value ? saleToken : buyToken
      contractMethods(unishopVal.value, _constVal.value)
          .then((res) => {
            console.log("buyToken", res)
            _constVal.value = ""
            unishopVal.value = ""
            setLoading(false)
            proxy.$toast.clear()
          })
          .catch((error) => {
            setLoading(false)
            console.table(error)
            proxy.$toast.clear()
          })
    }

    const initData = async () => {
      proxy.getAjaxLine()

      onChangeStake()

      getUserPower(route.query["index"], userAddress.value).then((res) => {
        console.log(res)
        powerVal.value = res
      })
      getExtPower(userAddress.value, route.query["index"]).then((res) => {
        extPower.value = res
      })

      getPreActivePercent(userAddress.value, route.query["index"]).then(
          (res) => {
            preActivePercent.value = res.join("/")
            unishopCoinNum.value = res[1]
          }
      )
      getUserStake(userAddress.value, route.query["index"]).then((res) => {
        userStake.value = res
      })
      getGroupStake(route.query["index"]).then((res) => {
        unishopStakeTotal.value = Number(res).toFixed(4)
      })
      getNftStake(route.query["index"]).then((res) => {
        console.log("resVue:getNFtStake ", res)
        unishopCoinStakeTotal.value = Number(res).toFixed(4)
      })
      tokenRecords().then((res) => {
        fetchGetUReward(res)
      })
      balance.value = await getBalance()
      stakeVal.value = balance.value
      console.log("balance.value: ", balance.value)

      const unitUsdPriceJson = await fetch(PRICE_URL).then((res) => res.json())
      unitUsdPrice.value = unitUsdPriceJson[chainType.value]
      const unishopcoinPrice = await getCost("1")
      const unishopPrice = await getBuyCost("1")
      console.log("unishopPrice: ", unishopPrice)

      if (unitUsdPriceJson) {
        const unishopCoinValue = new BigNumber(unishopcoinPrice)
            .times(unishopCoinNum.value)
            .times(unitUsdPriceJson[chainType.value])
        currentPrice.value = new BigNumber(userStake.value)
            .times(unishopPrice)
            .times(unitUsdPriceJson[chainType.value])
            .plus(unishopCoinValue)
            .toFixed(6)
        console.log("currentPrice.value : ", currentPrice.value)
        unishop2Usd.value = new BigNumber(1)
            .times(unishopPrice)
            .times(unitUsdPriceJson[chainType.value]) //TODO:新算法
      }

      if (erc20Obj.name === "UNISHOP") {
        const reduceReceive = await getSentToken(
            route.query["index"],
            userAddress.value
        )
        fetchGetNftReward(reduceReceive)
        isSaleApprove.value = await saleAllowance()
      } else {
        const reduceReceive = await getSentToken(
            route.query["index"],
            userAddress.value
        )
        fetchGetNftReward(reduceReceive)
      }
      assessPower()
    }

    const handleSwitchClick = async () => {
      isSale.value = !isSale.value
      unishopVal.value = ""
      _constVal.value = ""
      isSaleApprove.value = await saleAllowance()
    }

    const handleShareIt = () => {
      if (!connected.value) {
        return handleClickConnectWallet()
      }
      codeUrl.value = proxy._qrcode(windsHrefFun() + userAddress.value)
      isShowOverly.value = true
    }
    onUnmounted(() => {
      connectionInstance.value.resetApp()
    })
    const handleClickManageCommunes = async () => {
      // if (!connected.value) {
      //   await handleClickConnectWallet()
      // }
      // const isNext = await getCommOwner(route.query["index"]).then(e => e == userAddress.value)
      // if (!isNext) {
      //   return proxy.$toast('您当前还没有权限管理')
      // }
      router.push({
        path: '/manage_communes', query: {
          ...route.query
        }
      })
    }
    return {
      isUNISHOP,
      assets,
      loading1,
      loading,
      isApprove,
      isSaleApprove,
      stakeVal,
      unishopVal,
      powerVal,
      assessPowerVal,
      userStake,
      unitUsdPrice,
      isShowOverly,
      codeUrl,
      userAddress,
      isSale,
      cycleActive,
      preActivePercent,
      extPower,
      unishopCoinStakeTotal,
      // goodsVal,
      nowRewardDisplay,
      unishop2Usd,
      currentPrice,
      connected,
      balance,
      chainShow,
      actions,
      erc20Obj,
      usrUReward,
      chain,
      nowUReward,
      totalUReward,
      onChangReceive,
      windsHrefFun,
      _constVal,
      connectionInstance,
      unishopStakeTotal,
      handleClickChainSelect,
      onCancel,
      onSelect,
      onChangeUnishopValue,
      handleClickConnectWallet,
      handleClickExchange,
      onChangeStake,
      handleStakeClick,
      handleClickApprove,
      handleMaxBtnClick,
      handleClickSaleApprove,
      handleShareIt,
      handleSwitchClick,
      handleClickCycleSelect,
      handleClickReceiveBtn,
      handleClickManageCommunes,
    }
  },
  directives: {
    copy: vCopy,
  },
  computed: {
    erc20Price() {
      if (this.erc20Obj.name) {
        return new BigNumber(this.apiCurrentPrice ?? 0 + '').times(this.unitUsdPrice ?? '0').toFixed(6)
      }
      return 0
    }

  },
  methods: {
    unit,
    getUsd(type, stakeValue) {
      const val = stakeValue
      switch (type) {
        case BSC:
          return new BigNumber(val).times(366).toFixed(2)
        case ARBITRUM:
          return new BigNumber(val).times(2600).toFixed(2)
        default:
          return ""
      }
    },
    getAjaxLine() {

      let url = "unishop_bsc"
      if (this.$route.query["chianType"] === ARBITRUM) {
        url = "unishop_arbi"
      }
      if (this.$route.query["chianType"] === TRON) {
        url = "unishop_tron"
      }
      fetch(
          `//${HOST_IP}/${url}/getPriceHistory?limit=500&time=` + Date.now()
      )
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              nextTick(() => {

                console.log('apiCurrentPrice: ', res.data.currentPrice);
                if (this.erc20Obj.name === "UNISHOP") {
                  //
                  this.apiCurrentPrice = res.data.offCurrentPrice;
                  this.xAxis = res.data.offHistory.map(
                      (item) => item.createTime.split(".")[0]
                  )

                  this.series = res.data.offHistory.map((item) => item.price)
                  return
                }
                this.apiCurrentPrice = res.data.currentPrice;
                this.xAxis = res.data.history.map(
                    (item) => item.createTime.split(".")[0]
                )

                this.series = res.data.history.map((item) => item.price)
              })
            }
          })
    },
    clickBtn() {
      this.$dialog.alert({
        message: "预计4月20号后，UNISHOP挖矿将进入正式交易阶段！",
      })
    },

    downLoadImg() {
      const _this = this
      // 获取想要转换的dom节点
      // var dom = document.querySelector('body');
      const dom = document.getElementById("tp")
      html2canvas(dom, {
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
      }).then((canvas) => {
        // 将canvas转换成图片渲染到页面上
        const url = canvas.toDataURL("image/png") // base64数据
        const image = new Image()
        image.src = url
        _this.savePicture(url)
      })
    },
    _qrcode(url) {
      const div = document.createElement("div")
      // eslint-disable-next-line new-cap
      const code = new QRCode(div, {
        text: url,
        width: 500,
        height: 500,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      })
      // 这里如果需要在页面上展示的话，就将div节点给添加到dom树上去；node.appendChild(div)
      const canvas = code._el.querySelector("canvas") // 获取生成二维码中的canvas，并将canvas转换成base64
      const base64Text = canvas.toDataURL("image/png")
      const blob = this.getBlob(base64Text) // 将base64转换成blob对象
      return window.URL.createObjectURL(blob)
    },
    getBlob(base64) {
      const mimeString = base64.split(",")[0].split(":")[1].split(";")[0] // mime类型
      const byteString = atob(base64.split(",")[1]) // base64 解码
      const arrayBuffer = new ArrayBuffer(byteString.length) // 创建缓冲数组
      const intArray = new Uint8Array(arrayBuffer) // 创建视图
      for (let i = 0; i < byteString.length; i += 1) {
        intArray[i] = byteString.charCodeAt(i)
      }
      return new Blob([intArray], {
        type: mimeString,
      })
    },
    savePicture(Url = this.codeUrl) {
      const blob = new Blob([""], {type: "application/octet-stream"})
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = Url
      // eslint-disable-next-line prefer-destructuring
      a.download = Url.replace(/(.*\/)*([^.]+.*)/gi, "$2").split("?")[0]
      const e = document.createEvent("MouseEvents")
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
      )
      a.dispatchEvent(e)
      URL.revokeObjectURL(url)
    },
  },
  mounted() {
    this.getAjaxLine()
    if (this.chain.chainType === TRON) {
      var obj = setInterval(async () => {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
          clearInterval(obj)
          this.handleClickConnectWallet()
          console.log("tronWeb successfully detected!")
          // this.chain.setChainType(TRON);
          // this.setCommune()
        }
      }, 10)
      setTimeout("", 3000)
    } else if (
        this.connectionInstance?.web3Modal?.cachedProvider ||
        this.connectionInstance?.connected
    ) {
      this.handleClickConnectWallet()
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  @apply bg-white text-[#333];
}

.assets-bg {
  /* height: 112px; */
  background-image: linear-gradient(135deg, #ffaa33, #fa7d00);
  box-shadow: 0px 0px 20px rgba(51, 119, 255, 0.1);
  opacity: 0.75;
  position: relative;
  overflow: hidden;
}

.assets-bg:after {
  content: "";
  background: url("../../assets/img/assets_bg@2x.png") no-repeat;
  background-size: 100% 100%;
  z-index: -1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.my-bg {
  background-image: linear-gradient(135deg, #ffe6cc 0%, #ffcc99 100%);
  opacity: 1;
  position: relative;
  overflow: hidden;
}

.my-bg:after {
  content: "";
  background: url("../../assets/img/profit_bg@2x.png") no-repeat;
  background-size: 100% 100%;
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.activeToken {
  @apply bg-[#FFE6CC] text-[#FF8D1A];
}
</style>
