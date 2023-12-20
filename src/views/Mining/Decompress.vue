<!--  -->
<template>
  <div class="h-[30px]"></div>
  <CCard>
    <div class="space-y-3 mt-3">
      <div v-for="(item, index) in userStakeList" :key="index" class="
          rounded-[8px]
          bg-[#FFE6CC]
          h-[40px]
          flex
          justify-between
          items-center
          px-3
        ">
        <h3 class="text-base font-bold text-[#FF8D1A]">
          {{ item?.stake }}
          <span class="text-xs"> UNISHOP </span>
        </h3>
        <span class="text-xs font-normal text-[#333]">
          剩余{{ item?.day }}天
        </span>
        <div class="text-xs font-normal text-[#FF8D1A]">
          算力 {{ item?.power }}KB
        </div>
      </div>
    </div>

    <div class="h-9"></div>

    <div class="flex justify-between">
      <div class="text-sm text-[#333]">解压项目：</div>
      <div @click="showActive = true" class="
          hover:bg-opacity-60
          min-w-[212px]
          pr-5
          h-[28px]
          border border-solid border-[#FFE6CC]
          px-2
          py-[6px]
          rounded-[8px]
          relative
          flex
          items-center
        ">
        <span class="text-xs text-[#333] font-normal flex-1">
          {{ activeStakeItem?.name ?? "请选择解压的项目" }}
        </span>
        <span class="
            absolute
            right-2
            h-0
            mt-[3px]
            w-[6px]
            border-t-[#FF8D1A]
            border-l-transparent
            border-r-transparent
            border-b-transparent
            border-4
          "></span>
      </div>
    </div>
    <div class="h-8"></div>
    <div class="flex items-center">
      <div class="text-sm text-[#333]">解压比例：</div>
      <div class="flex-1">
        <van-slider max="100" v-model="sliderValue" bar-height="1.6vw" active-color="#FFD9B3">
          <template #button>
            <div class="relative w-3 h-3 rounded-full bg-[#FF8D1A]">
              <div class="
                  absolute
                  bottom-[15px]
                  translate-x-[-50%]
                  h-[20px]
                  min-w-[74px]
                  py-1
                  flex
                  items-center
                  justify-center justify-center
                  bg-[#FFE6CC]
                  text-xs
                ">
                {{
                    ((sliderValue * (activeStakeItem.stake ?? 0)) / 100).toFixed(
                      4
                    )
                }}
                UNISHOP
              </div>
            </div>
          </template>
        </van-slider>
      </div>

      <div class="text-sx text-[#FF8D1A] flex pl-2 items-center">
        <div @click="sliderValue = 100" class="
            h-7
            w-9
            bg-[#ffaa33]
            text-white text-center
            rounded-tl-[8px] rounded-bl-[8px]
          ">
          Max
        </div>
        <div class="
            mr-1
            text-sm
            h-7
            w-9
            rounded-tr-[8px] rounded-br-[8px]
            text-[#FFC68C]
            flex
            items-center
            justify-center
            border border-solid border-[#FFC68C]
          ">
          {{ sliderValue }}
        </div>
        %
      </div>
    </div>
    <div class="h-[10px]"></div>
    <div class="flex items-center">
      <div class="text-sm text-[#333]">解压获取：</div>
      <div class="
          w-[64px]
          h-[28px]
          bg-[#FFE6CC]
          flex
          justify-center
          items-center
          rounded-[8px]
          border border-solid border-[#FF8D1A]
          text-xs text-[#FF8D1A]
          ml-[8px]
        ">
        UNISHOP
      </div>
      <div class="
          w-[64px]
          h-[28px]
          bg-[#F5F5F5]
          flex
          justify-center
          items-center
          rounded-[8px]
          border-0 border-solid border-[#FF8D1A]
          text-xs text-[#333]
          ml-[8px]
        ">
        U
      </div>
    </div>
    <div class="h-6"></div>
    <div @click="handleSubmitBtn" class="
        flex
        justify-center
        items-center
        h-[32px]
        max-w-[176px]
        mx-auto
        rounded-[16px]
        text-xs text-white
      " style="
        background-image: linear-gradient(135deg, #ffaa33 0%, #fa7d00 100%);
      ">
      <CLoading class="text-[#1a8bff]" v-if="withdrawLoading" />
      解压
    </div>
  </CCard>
  <van-action-sheet v-model:show="showActive" :actions="withdrawAbleList" @select="handleClickStakeSelect"
    cancel-text="取消" close-on-click-action />
</template>

<script>
import CCard from "@/components/CCard.vue";
import { storeToRefs } from "pinia";
import { useChainStore } from "@/store";
import BigNumber from "bignumber.js"
import useStakeContract from "@/web3/contract/useStakeContract";
import { onMounted, reactive, ref, toRef, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
import { fromWei } from "@/web3/tools";
import { getDistanceSpecifiedTime, isTimePassed } from "@/libs/util";
import CLoading from "@/components/CLoading.vue";
import { useToggle } from "@vant/use";
// eslint-disable-next-line no-unused-vars
import { TRON } from "@/web3/config";
export default {
  name: "decompressPages",
  components: { CCard, CLoading },
  data() {
    return {};
  },
  setup() {
    const route = useRoute();
    const chain = useChainStore();
    // eslint-disable-next-line no-unused-vars
    const { proxy } = getCurrentInstance();
    const [withdrawLoading, setWithdrawLoading] = useToggle(false);
    const showActive = ref(false);
    const userStakeList = ref([]);
    const withdrawAbleList = ref([]);

    const sliderValue = ref(100);
    const activeStakeItem = reactive({
      name: null,
      id: null,
      stake: null,
      day: null,
      power: null,
      level: null,
    });
    let { connectionInstance, chainType } = storeToRefs(chain);
    console.log("chainType: ", chainType);
    const { web3, connected, userAddress, tronStakeContract } = storeToRefs(
      connectionInstance.value
    );
    console.log("====================================");
    console.log(web3, connected, userAddress, tronStakeContract);
    console.log("====================================");

    const { getUserStakeList, withdraw } = useStakeContract({
      userAddress,
      web3,
      type: chainType,
      tronStakeContract,
      erc20Type: toRef({ id: "UNISHOP" }, "id"),
    });

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
    const handleClickStakeSelect = (item) => {
      activeStakeItem.name = item.name;
      activeStakeItem.id = item.id;
      activeStakeItem.stake = item.stake;
      activeStakeItem.day = item.day;
      activeStakeItem.power = item.power;
      activeStakeItem.isOld = item.isOld??false;
      activeStakeItem.level = item.level;
    };
    const handleSubmitBtn = () => {
      if (!connected.value) {
        return handleClickConnectWallet();
      }
      // if (activeStakeItem.day <= 0) {
      //   return proxy.$toast.fail("质押周期未到，不能解压");
      // }
      if (activeStakeItem.id == null || !sliderValue.value) {
        return proxy.$toast.fail("请认真选择参数");
      }
      setWithdrawLoading(true);
      withdraw(
        route.query["index"],
        activeStakeItem.id,
        // (sliderValue.value * (activeStakeItem.stake ?? 0)) / 100 + ""
        new BigNumber(sliderValue.value).multipliedBy(activeStakeItem.stake??0).dividedBy(100).toString(),
          activeStakeItem.isOld??null
      ).then((res) => {
        console.log("res: ", res);
        setWithdrawLoading(false);
        initData();
      });
    };

    const initData = async () => {

      let obj = [];
      if (chainType.value === TRON) {
      const result  = await fetch(`//unishopcoins.com/unishop_tron/frontGetTronStakeList?addr=${userAddress.value}&nft=${route.query['index']}`).then(res => res.json());
      obj = result.data;
      } else {
        obj = await getUserStakeList(
          userAddress.value,
          route.query["index"]
        );
      }
      console.log('getUserStakeList',obj)
      userStakeList.value = await obj.map((item, index) => {
        const day = getDistanceSpecifiedTime(item.expire * 1000),
          stake = fromWei("??", item.stake);
        const expired = isTimePassed(item.expire * 1000);
        const power = _stakeToPower(stake, item.level);
        let nameLab = `${stake}UNISHOP 剩余${day}天 算力${power} KB  `;
        if (expired) {
          nameLab = `${stake}UNISHOP 已到期 算力${power} KB  `;
        }
        return {
          name: nameLab,
          isOld:item.isOld??false,
          id: index,
          stake,
          day,
          power,
          expired,
          level: item.level,
        };
      });
      // withdrawAbleList.value = userStakeList.value
      userStakeList.value = userStakeList.value.filter(
        (item) => item.stake > 0.00000000001
      );
      withdrawAbleList.value = userStakeList.value.filter(
        (item) => item.expired && item.stake > 0.00000000001
      );
    };
    onMounted(() => {
      if (!connected.value) {
        handleClickConnectWallet();
      } else {
        //TODO: lei:是否需要调这个方法？
        initData();
      }
    });
    function _stakeToPower(_value, _level) {
      console.log("_value: ", _value);
      console.log("_level: ", _level);
      return (_value * 10 * _level).toFixed(5);
    }
    return {
      sliderValue,
      userStakeList,
      withdrawAbleList,
      activeStakeItem,
      withdrawLoading,
      showActive,
      handleSubmitBtn,
      handleClickStakeSelect,
    };
  },

  computed: {
    //计算属性
  },

  methods: {
    //方法
  },
  //beforeCreate:function(){
  //     console.log('1-beforeCreate 初始化之后');
  // },
  // created:function(){
  //     console.log('2-created 创建完成');
  // },
  // beforeMount:function(){
  //     console.log('3-beforeMount 挂载之前');
  // },
  // mounted:function(){
  //     console.log('4-mounted 被创建');
  // },
  // beforeUpdate:function(){
  //     console.log('5-beforeUpdate 数据更新前');
  // },
  // updated:function(){
  //     console.log('6-updated 被更新后');
  // },
  // activated:function(){
  //     console.log('7-activated');
  // },
  // deactivated:function(){
  //     console.log('8-deactivated');
  // },
  // beforeDestroy:function(){
  //     console.log('9-beforeDestroy 销毁之前');
  // },
  // destroyed:function(){
  //     console.log('10-destroyed 销毁之后')
  // }
};
</script>
<style lang="" scoped></style>
