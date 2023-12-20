<template>
  <!-- <div class="h-[44px] px-4 flex items-center justify-end bg-[#fff]">
    <div class="flex gap-x-4">
      <div
        @click="chainShow = true"
        class="w-[72px] h-[28px] border-[1px] rounded-[8px] border-[#1A8BFF] border-solid flex justify-center items-center text-xs text-[#333]"
      >
        {{ chain.chainType }}
        <van-icon name="arrow-down" size="12px" class="ml-[15px]" />
      </div>
      <button
        v-if="!connectionInstance?.connected"
        @click="handleClickConnectWallet"
        class="ring-[1px] ring-[#8CC5FF] ring-offset-2 w-[72px] h-[28px] bg-[#1A8CFF] text-[#fff] font-normal text-xs rounded-lg"
      >
        {{ `连接钱包` }}
      </button>
    </div>
  </div> -->
  <div class="bg-[#002866] p-4 rounded-b-xl">
    <van-field class="rounded-xl h-8" v-model="value" center left-icon="search" placeholder="请输入关键词">
      <template #extra>
        <div class="flex items-center">
          <span class="text-gray-300 pr-2">|</span><span>搜索</span>
        </div>
      </template>
    </van-field>
    <div class="flex items-center justify-around text-white text-center mt-5">
      <div @click="handleProduct">
        <img class="w-[50px] h-[50px] mx-auto" src="../../assets/goods/my_ic_product@2x.png" alt=""/>
        <div>产品管理</div>
      </div>
      <div>
        <img class="w-[50px] h-[50px] mx-auto" src="../../assets/goods/my_ic_scan@2x.png" alt=""/>
        <div>扫一扫</div>
      </div>
      <div @click="toShopCart">
        <img class="w-[50px] h-[50px] mx-auto" src="../../assets/goods/my_icshoppingcart@2x.png" alt=""/>
        <div>购物车</div>
      </div>
    </div>
  </div>
  <div class="h-5"></div>
  <div class="border w-[343px] m-auto p-2 rounded-2xl border-[#002866]">
    <p class="lineClamp" v-show="showMoreInfo">
      为你所信仰的东西积极的站出来冒犯数百万人，总比试图让每个人都开心，结果却一无所获要好。勇敢的站起来，为你的价值观而战，做一个极简主义者
    </p>
    <div v-show="!showMoreInfo">
      <p>
        为你所信仰的东西积极的站出来冒犯数百万人，总比试图让每个人都开心，结果却一无所获要好。勇敢的站起来，为你的价值观而战，做一个极简主义者
      </p>
      <p class="text-right">————Viatlik（V神）</p>
      <p>UNISHOP商品：卖的是信任和价值，卖的是匠心与股东社群的终生价值；</p>
      <p>
        1.“CPE长视频”，如同一种对产品的上市IPO路演，创始人心路与人格魅力，匠心与细节，知识的传递与考究，用户的见证与支持，强大的背书，先追求口碑与信任，在有序引入强大的流量；
      </p>
      <p>
        2.“用户即股东”形成融为一体的长期价值，好的匠心产品和富有人格魅力的创始人，一定可以为股东们创造巨额利润；25%的现金流注入流动池，加上市盈率的财富放大能力，将会形成巨大的财富红利
      </p>
      <p>
        3.“消费即挖矿”未来的区块链人口还将增长20亿人，CPE消费总额中将会有10%进入POS矿池，通过长期挖矿实现对所有商品销售额100%的全返！（时间的积累，形成永续的消费力）
      </p>
      <p>
        4.“一码一通证”CPE商城为了保证商户建立私有流量和终生客户关系，平台只能依靠“二维码和商品合约地址”才能搜索出产品；
      </p>
      <p>
        5.“二维码”从任何浏览器扫码都能“看到一段视频”，是一种干净到极致的界面，一种后极简主义美学；
      </p>
      <p>
        6.“向上滑动推荐商品”新钱包地址进入商城后，初始商品总量为0，可以像抖音一样向上滑动屏幕，查看下一件被推荐商品；（每件一产品，只能推荐一件产品）
      </p>
      <p>一种信任的背书，</p>
      <p>一种对下一件产品的精选，</p>
      <p>一种用户生态价值的传递，</p>
      <p>用户所要做的仅仅只是，</p>
      <p>“向上滑动屏幕”</p>
      <p>
        每款产品都是后极简化主义的设计风格，去掉了文字描述，避免上传图片，仅仅只能通过一个【短视频】来展示产品的全部内容（短视频是上传到IPFS分布式网络上的），一定让消费者通过二维码打开产品界面的时候，就眼前一亮；
      </p>
      <p>
        创世团队认为未来的区块链Dapp入口在于二维码，二维码会取代搜索引擎，成为区块链钱包链接价值和交易产品的根本性工具；
      </p>
      <p>
        团队重新设计和发明了【元数据二维码】：这是一种基于IPFS网络的【元数据链接】在节点够多的情况下，一旦传上去就再也不会被关掉，也永远不会再出现404，505等无法找到资源的界面；而且随着未来Dapp钱包的改进和升级，使用的人数越多，速度就将会越快，不会给服务器带来压力
      </p>
      <p>
        Aitalik团队创立UNISHOP商城系统的价值观：把商城合约以及系统部署在以太坊十几大公链上，让链商获得无法撼动的超级管理员权限，以及无法被审核与拦截的交易系统，再加之以IPFS的元数据网络存储数据（为未来淘汰HTTPS网络做准备），做极简化的商城（CPE链商商城全都是没有任何一件产品的，所有产品都只能扫二维码获取）
      </p>
      <p>
        人们都在过分关注“流量问题”，实际上就是有四家互联网巨头，对“一切对手进行限流”，“收集一切个人用户做画像和收集用户隐私”，然后不断提高流量成本，让企业和民众为此买单，可以被理解为“流量税”；
        所以创造千万级，亿万级流量的秘密，不在模式创新，而在于技术创新，必须重新定义甚至放弃Https协议，把一个更低成本和更加安全的世界重新还给人民群众；
      </p>
      <p>做一盏灯：当所有的灯都关上的时候，仍然为你亮着的一盏灯；</p>
      <p>安全是一切文明和商业形态发展的第一需求；</p>
      <p>
        未来将会遇到比当下更大更猛烈的贸易战，金融战，数据战，法律诉讼战，军事管制战，银行系统金融战，产业链重组战，外贸竞价战，等多维度的生死较量；
        继续使用Https协议，Swift协议，WTO贸易系统，纳斯达克上市系统，迟早会面临更为严重的挑战和复杂系统危机，UNISHOP要做一盏灯，保护世界的资产安全和系统稳定，让人民有强大的工具可以面对这些危机和挑战；
      </p>
      <p>
        +用“元数据二维码”插入国际市场（这种二维码可以对“互联网封锁”免疫）从而依靠品质和口碑做深度的耕耘；
      </p>
      <p>
        +用“CPE商品市盈率经济”建立国际消费者股东自治社区（以对Swift系统的封锁免疫），和当地人绑定在一起，依靠优质的产品盈利，建立比纳斯达克更大范围的股东生态；
      </p>
      <p>
        +用NFT超级管理员体系，实现链商的独立自治（对亚马逊的关店和基于各种平台的不合理政策免疫）；
      </p>
      <p>+用IPFS发布IP视频和建立自治社区（以对互联网网管的大规模删除免疫）；</p>
      <p>
        +用密码学无审桥进行跨链，以对链商资产的匿名性进行保护（对国际法律诉讼免疫）
      </p>
      <p>为什么电商时代的IP经济很难取得成功？</p>
      <p>
        在自身店铺不安全和随时会被封店的情况下，因为你不知道亚马逊会不会以莫须有的条款，关掉你的店铺，你不知道明天自己账户上的美元是否还能正常使用，也不知道纳斯达克交易所是否会同意你的上市请求；
      </p>
      <p>
        我们认为这些真理是不言而喻的：人人生而平等，造物者赋予他们若干不可剥夺的权利，其中包括生命权、自由权和追求幸福的权利。当任何形式的政府对这些目标具破坏作用时，人民便有权力改变或废除它，以建立一个新的政府；其赖以奠基的原则，其组织权力的方式，务使人民认为唯有这样才最可能获得他们的安全和幸福。
      </p>
      <p class="text-right">——————1776年美国独立宣言，华盛顿</p>
      <p>
        The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.
        2019年11月3号泰晤士报，财政大臣濒临破产的银行进行第二次救助。
      </p>

      <p class="text-right">—————Nakamoto中本聪</p>
      <p>
        2022年5月6日，将从6月开始启动缩表计划。
        初始阶段，美国国债的缩减规模将为每月300亿美元，3个月后每月减持规模将扩大至600亿美元；
        本次加息50个基点。
      </p>
      <p class="text-right">————美国联邦储备银行</p>
    </div>
    <van-icon @click="showMoreInfo = !showMoreInfo" class="animate-bounce w-full text-center"
              :name="showMoreInfo ? 'arrow-down' : 'arrow-up'"></van-icon>
  </div>
  <!-- 总资产 -->
  <div class="w-[343px] mt-6 m-auto">
    <div>
      <span class="text-base mr-3 font-semibold">总资产</span>
      <!-- <van-icon name="eye-o" color="#8CC5FF" /> -->
    </div>
    <div class="mt-2 p-3 rounded-xl" style="box-shadow: 0px 0px 20px 1px rgba(51, 119, 255, 0.1)">
      <div class="text-center mt-6  text-[#333] text-base font-bold">
        {{ totalCard?.data.total }} UNISHOP
      </div>
      <div class=" mb-10 text-center text-[#999999]">
        ≈ {{ totalCard?.data.totalU }}$
      </div>
      <div class="flex justify-between items-start mb-2">
        <div>
          <div class="text-base">UNISHOP消费挖矿</div>
          <p size="small" class="text-[#999999]">
            UNISHOP商城内的任何消费，全都可以通过UNISHOP长期挖矿进行100%全额返回；在UNISHOP商城上的任何消费都将有10%会作为UNISHOP/U的底池，从某种长期主义角度看，UNISHOP商城内的一切商品都肯定是免费的，因为资金在快速流动中产生了全新的价值；这将会为下一个商品消费时代，创造前所未有的红利；
          </p>
        </div>

      </div>
      <div class="flex justify-between">
        <div class="text-base">挖矿额:</div>
        <div class="font-semibold text-[#333333] mb-1 text-right">
          {{ totalCard?.data.consume[0] }} UNISHOP
        </div>
      </div>
      <div class="flex justify-between">
        <div class="text-base">消费总额:</div>
        <div class="font-semibold text-[#333333] mb-1 text-right">

          {{ totalCard?.data.consume[1] }} UNISHOP
        </div>
      </div>
      <div class="mt-6 w-[200px] m-auto">
        <van-button round block @click="handleWithdraw" color="linear-gradient(135deg, #CC2200 0%, #B3122C 100%)">
          领取挖矿收益
        </van-button>
      </div>
    </div>
  </div>

  <!-- TODO 兑换 -->
  <div class="w-[343px] mt-6 m-auto">
    <div class="flex justify-between mb-2">

      <div class="text-[16px] ">兑换</div>
      <div class="text-[16px]">
        U底池: {{ unishop2UAddressUBalance }} 枚U
      </div>
    </div>
    <p size="small" class="text-[#999999]">
      {{
        `当U的底池=0的时候UNISHOP/U将会停止交易；
      当U底池小于100万U时，UNISHOP价格将会锁定为20000U/枚
      当U底池大于100万U时，UNISHOP价格将会锁定为40000U/枚
      当U底池大于200万U时，UNISHOP价格将会锁定为80000U/枚
      随着wbe3应用的发展当U底池大于40.96亿U时，UNISHOP将会进入1.63亿美元/枚的价格；`
      }}
    </p>
    <div class="w-[343px] min-h-[208px] py-3 rounded-2xl mb-2"
         style="box-shadow: 0px 0px 20px 1px rgba(51, 119, 255, 0.1)">
      <div class="relative flex flex-col">
        <div :class="isSale ? 'order-1' : 'order-2'"
             class=" w-[319px] min-h-16 bg-white bg-opacity-30 rounded-xl border-2 border-[#FFE6CC] m-auto  mb-3  py-1 px-3">
          <div class="flex">
            <div class="flex-1">
              <input v-model="unishopValue" :placeholder="isSale ? '请输入' : ''" @input="onChangeuValue" v-if="isSale"
                     class="h-10  bg-transparent">
              <span v-else class="h-10 text-[#999999]  bg-transparent">
                {{ unishopValue ? unishopValue : (!isSale ? '预计消耗数量' : '') }}
              </span>
            </div>
            <div>
              <div
                  class="w-[96px] h-8  bg-[#FFE6CC] rounded-lg truncate text-black text-xs font-bold px-2 flex justify-between items-center">
                UNISHOP
              </div>

            </div>
          </div>
          <div class="text-xs text-right  mt-1">余额：{{ unishopBalance }}</div>
        </div>

        <div @click="isSale = !isSale"
             class="absolute top-[68px] left-[167px] w-5 h-5 bg-[#8CC5FF] bg-opacity-50 m-auto rounded-lg text-center leading-[20px]">
          <van-icon color="white" name="down"></van-icon>
        </div>
        <div :class="isSale ? 'order-2' : 'order-1'"
             class=" w-[319px] min-h-16 bg-white bg-opacity-30 rounded-xl border-2 border-[#CCE6FF] m-auto mb-3 py-1 px-3">
          <div class="flex">
            <div class="flex-1">
              <input v-if="!isSale" @input="onChangeuValue" :placeholder="!isSale ? '请输入' : ''" v-model="UValue"
                     class="h-10 bg-transparent">
              <span v-else class="h-10 text-[#999999]  bg-transparent">
                {{ UValue ? UValue : (isSale ? '预计消耗数量' : '') }}
              </span>
            </div>
            <div>
              <div
                  class="w-[96px] h-8  bg-[#E6F2FF] rounded-lg truncate text-black text-xs font-bold px-2 flex justify-between items-center">
                U
              </div>
            </div>
          </div>
          <div class="text-xs text-right  mt-1">余额：{{ UBalance }}</div>
        </div>
      </div>

      <van-button @click="handleSubmit" class=" text-[#1A8CFF] w-[200px] mx-auto" block round plain>
        {{ !isSale ? (!isUApprove ? 'Approve' : 'SWAP') : !isUNISHOPApprove ? 'Approve' : 'SWAP' }}

      </van-button>
    </div>
  </div>

  <!-- 商品市盈率 -->
  <van-action-sheet v-model:show="chainShow" :actions="actions" @select="onSelect" cancel-text="取消"
                    close-on-click-action @cancel="onCancel"/>
  <NavTab/>
  <div class="h-16"></div>
</template>

<script>
export default {
  name: "GoodsPage",
};
</script>
<script setup>
import {onMounted, ref} from "vue";
import {TRON, ARBITRUM, BSC} from "@/web3/config";
import {_debounce} from "@/libs/util"
import {useChainStore} from "@/store";
import NavTab from "@/components/NavTab.vue";
import {useRouter, useRoute} from "vue-router";
import {storeToRefs} from "pinia";
import useApplyChian from "@/web3/contract/useApplyChian";
import {Toast} from "vant";
import useUnishop2U from '@/web3/contract/useUnishop2U'

const chain = useChainStore();
let {connectionInstance, chainType} = storeToRefs(chain);
const router = useRouter();
const route = useRoute()
const {connected, userAddress, web3} = storeToRefs(connectionInstance.value);

const {
  getUnishopAddress,
  getRecordUpdated,
  totalCard,
  getuAddress,
  getWithdraw,
  getUnishopOutput,
  getUOutput,
  UAllowance,
  unishopAllowance,
  unishop2U,
  u2Unishop,
  getUnishop2UAddressBalance,
  UApprove, unishopApprove,
  unishopBalance: unishopBalancefun,
  UBalance: UBalancefun
} = useUnishop2U({
  userAddress,
  web3,
  type: chainType,
  //TODO is tronlink  contract
  // utoUsdtContract,
})
// eslint-disable-next-line no-unused-vars
let getNftAddress, tokenOfOwnerByIndex;


const showMoreInfo = ref(true);
const isSale = ref(true);
const chainShow = ref(false);
const isUApprove = ref(false);
const isUNISHOPApprove = ref(false);
const UBalance = ref(0);
const unishop2UAddressUBalance = ref(0);
const unishopBalance = ref(0);
const unishopValue = ref(null);
const UValue = ref(null);
const actions = [
  {name: ARBITRUM, id: ARBITRUM},
  {name: TRON, id: TRON},
  {name: BSC, id: BSC},
];


const toShopCart = () => {
  router.push({
    path: "/shop_cart",
    query: route.query
  });
};
const onSelect = (item) => {
  chainShow.value = false;
  chain.setChainType(item.name);
};

const onChangeuValue = _debounce(function async(val) {
  console.log('val: ', val);
  if (isSale.value) { // unishop => u
    getUOutput(val.target.value || '0').then(
        res => {
          console.log(res)
          UValue.value = res
        }
    )
  } else {
    getUnishopOutput(val.target.value || '0').then(
        res => {
          console.log(res)
          unishopValue.value = res
        }
    )
  }
});
const handleClickApprove = () => {
  Toast.loading({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  })
  if (!isSale.value) {
    UApprove(UValue.value).then(res => {
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
    unishopApprove(unishopValue.value).then(res => {
      console.log('res: ', res);
      Toast('授权成功')
      isUNISHOPApprove.value = true
      Toast.clear()
    }).catch(err => {
      Toast(err)
      Toast.clear()
      return
    })
  }
}
const handleSubmit = async () => {
  if (!connected.value) {
    return handleClickConnectWallet()
  }
  if (!isUApprove.value && !isSale.value) {
    return handleClickApprove()
  }
  if (!isUNISHOPApprove.value && isSale.value) {
    return handleClickApprove()
  }

  if (UValue.value === '') {
    Toast('请输入U数量')
    return
  }

  if (unishopValue.value === '') {
    Toast('请输入UNISHOP数量')
    return
  }

  Toast.loading({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  })
  if (isSale.value) {
    if (unishopValue.value > unishopBalance.value) {
      Toast('UNISHOP数量不足')
      return
    }
    console.log('unishopValue.value: ', unishopValue.value);
    await unishop2U(unishopValue.value).then(res => {
      console.log('res: ', res);

      Toast('出售成功')
    }).catch(err => {
      Toast(err)
      Toast.clear()
      return
    })
  } else {
    if (UValue.value > UBalance.value) {
      Toast('U数量不足')
      return
    }
    console.log('UValue.value: ', UValue.value);
    await u2Unishop(UValue.value).then(res => {
      console.log('res: ', res);
      Toast('购买成功')

    }).catch(err => {
      Toast(err)
      Toast.clear()
      return
    })
  }
  Toast.clear()
  UValue.value = ''
  unishopValue.value = ''
}
// const toDetail = () => {
//   router.push({
//     path: "/good_detail_video",
//     query:route.query
//   });
// };
const initData = async () => {
  Toast.loading({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  })

  getNftAddress().then((res) => {
    console.log(res);
  });
  await getUnishopAddress();
  await getuAddress();
  getUnishop2UAddressBalance().then(res => {
    console.log('getUnishop2UAddressBalance', res)
    unishop2UAddressUBalance.value = res
  })
  getRecordUpdated()
  unishopBalancefun().then(res => {
    unishopBalance.value = res
  })
  UBalancefun().then(res => {
    UBalance.value = res
  })
  isUApprove.value = await UAllowance()
  isUNISHOPApprove.value = await unishopAllowance()

  Toast.clear()
};

const handleWithdraw = () => {
  Toast.loading({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  })
  getWithdraw().then(res => {
    Toast.clear()
    Toast('领取成功')
  }).catch(res => {
    Toast.clear()
    Toast('error')
  })
}
const handleProduct = async () => {
  console.log(connected);
  if (!connectionInstance.value.connected) {
    return Toast("请连接钱包");
  }
  try {
    let result = await tokenOfOwnerByIndex();
    console.log("result: ", result);
    if (result._isBigNumber) {
      result = result.toString();
    }
    result = `${result}`.padStart(4, 0);
    router.push({
      path: "/product_management",
      query: {
        shopId: result == 0 ? 0 : Number(result.substr(-2)),
        chianType: chainType.value,
        index: result == 0 ? 0 : Number(result.slice(0, -2)),
      },
    });
  } catch (error) {
    router.push({path: "/product_management",query: { chianType: chainType.value,}})
    Toast("您当前没有权限，请联系管理员加入链商");
  }
};
onMounted(() => {
  handleClickConnectWallet()
})
const handleClickConnectWallet = async (isAlert = true) => {
  await connectionInstance.value.onConnect(
      chain.chainType,
      () => {
        const {web3, userAddress, tronApplyChainContract} = storeToRefs(
            connectionInstance.value
        );
        const c = useApplyChian({
          userAddress,
          web3,
          type: chainType,
          tronApplyChainContract,
        });
        console.log(c, '=====')
        getNftAddress = c.getNftAddress;
        tokenOfOwnerByIndex = c.tokenOfOwnerByIndex;
        initData();
      },
      isAlert
  );
};
</script>

<style scoped>
.lineClamp {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

p {
  font-size: 10px;
  text-indent: 20px;
  letter-spacing: 1px;
}
</style>
