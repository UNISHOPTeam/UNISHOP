<!--
 * @Author: cuijian
 * @Date: 2022-05-25 22:36:11
 * @LastEditors: cuijiajun
 * @LastEditTime: 2022-05-25 23:53:54
 * @FilePath: /unishop_ui/src/views/Mining/TokenAdd.vue
-->
<template>
<div class="container">
  <div class="h-4"></div>
    <div class="rounded-[16px] bg-white p-4">
        <div class="border border-[#FFCCCC] rounded-[12px] p-3">
            <div class="h-[44px] text-sm flex items-center justify-between border-b-[0.5px] border-[#EFEFEF]">
                Token合约地址：
                <div class="flex-1">
                    <input class="text-right" placeholder="请输入Token合约地址">
                </div>
            </div>
            <p class="text-xs  leading-[24px]">
                添加Token数量：
            </p>
            <input value="0.00" class="text-sm text-[#333] font-bold mb-2" />


        </div>
        <div class="h-2 relative w-full">
            <div class="h-5 w-5 absolute left-0 right-0 -top-1.5 bg-[#FFCCCC] rounded-[8px] text-white text-base text-center leading-5 mx-auto">
                +
            </div>
        </div>
        <div class="border border-[#FFE6CC] rounded-[12px] p-3">

            <p class="text-xs  leading-[24px]">
                需消耗：
            </p>
            <div class="flex justify-between">
                <div class="flex">
                    <input value="0.00" class="text-sm text-[#333] font-bold mb-2" />
                </div>
                <div
                    class="w-[96px] h-[32px] font-semibold text-sm text-[#333] bg-[#FFE6CC] rounded-[8px] px-2 flex justify-between items-center">
                    <img src="" />
                    U
                    <van-icon name="arrow-down" size="12px" class="ml-[15px]" color="#FF8D1A" />
                </div>
            </div>

        </div>
        <h1 class="h-2"></h1>
        <div class="border border-[#CCE6FF] rounded-[12px] p-3 flex justify-between">

            <div class="text-sm">
                Token/U兑换比例：
            </div>
            <div class="flex">
                <div>
                    <input
                        class="h-[32px] w-[56px] border px-1 border-[#CCE6FF] rounded-[8px] flex justify-center items-center text-[#ccc] text-base font-bold">
                    <p class="text-[10px] mt-2 text-[#CCCCCC]">TOKEN</p>
                </div>
                <span class="text-2xl text-[#1A8CFF] text-center mx-2 leading-[25px]">
                    :
                </span>
                <input
                    class="h-[32px] w-[56px] border px-1 border-[#CCE6FF]  rounded-[8px] flex justify-center items-center text-[#ccc] text-base font-bold">

            </div>


        </div>
        <p class="text-sm text-[#CCCCCC] mt-3">
            兑换手续费：0.3%
        </p>
        <div class="flex justify-between mt-6">
            <VanButton color="linear-gradient(135deg, #2BD99E 0%, #0ABF64 100%)" class="w-[154px] h-10 rounded-full">
                Approve
            </VanButton>
            <VanButton class="w-[154px] h-10 rounded-full " color="linear-gradient(135deg, #1AB3FF 0%, #1A8BFF 100%)">
                Token加入商城交易</VanButton>
        </div>

    </div>
    <div class=" space-y-3 px-4 mt-6">
         <div class="flex justify-between items-center">
        <cfont-14> Token底池余额： </cfont-14>
        <van-stepper
            style="--van-stepper-background-color:#E7F3FF;"
         @change="onChangeStake" v-model="stakeVal" :max="balance" input-width="94px" min="0.000001"
            step="0.01" button-size="28px" />
    </div>
     <div class="flex justify-between items-center">
        <cfont-14> U底池余额： </cfont-14>
        <van-stepper  style="--van-stepper-background-color:#E7F3FF;" @change="onChangeStake" v-model="stakeVal" :max="balance" input-width="94px" min="0.000001"
            step="0.01" button-size="28px" />
    </div>
    </div>

</div>

</template>

<script>
import Cfont14 from '@/components/Cfont14.vue'
export default {
    components: { Cfont14 },

}
</script>

<style scoped>
.container{
    @apply bg-[#F5F7FA] min-h-[100vh]
}
:root{

}
</style>
