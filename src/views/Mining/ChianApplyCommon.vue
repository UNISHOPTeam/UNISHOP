
<template>
    <!-- <div class="h-[44px] px-4 flex items-center justify-between bg-white">
        <button
            class="ring-[1px] ring-[#8CC5FF] ring-offset-2 w-[72px] h-[28px] bg-[#1A8CFF] text-[#fff] font-normal text-xs rounded-lg">{{ `连接钱包` }}</button>
    </div> -->
    <div class="mt-[10px] bg-white rounded-2xl min-h-[326px] px-4 overflow-hidden">
        <img class="w-[189px] h-[88px] mt-5 mx-auto " src="../../assets/mining/logo_linker@2x.png" />

        <div class="mt-4"></div>
        <div class="divide-y divide-[#EFEFEF]">
            <div class="flex justify-between items-center py-4">
                <h4 class="text-sm font-medium text-[#333]">链商名称：</h4>
                <input type="text" placeholder="请输入链商名称" v-model="name"
                    class="placeholder-[#CCCCCC] text-right text-sm" />
            </div>
            <div class="flex justify-between items-center py-[10px]">
                <h4 class="text-sm font-medium text-[#333]">链商logo：</h4>
                <van-uploader style="--van-padding-xs:0" accept="image/png, image/jpeg" :after-read="afterRead"
                    :max-count="1" v-model="fileList" />
            </div>
            <div class="flex justify-between items-center py-4">
                <h4 class="text-sm font-medium text-[#333]">本次申请需消耗：</h4>
                <span class="font-normal text-[#333] text-sm">{{ price }}{{ unit(chain.chainType) }}</span>
            </div>
        </div>
    </div>
    <div class="flex mt-6 items-center justify-center">

        <button @click="() => {
        
            $router.push('/token_add')
        }" :disabled="!isOpen" style="background-image: linear-gradient(135deg, #1AB3FF 0%, #1A8BFF 100%);"
            class="disabled:opacity-50 shadow-sm shadow-[#1A8BFF] text-white text-base ml-[20px]  w-[295px] h-[40px] leading-[17px] rounded-3xl flex justify-center items-center">
            <CLoading v-if="loading" />
            申请通证商
        </button>
    </div>

    <div class="mt-8"></div>
    <div class="bg-white rounded-2xl min-h-[326px] p-4 overflow-hidden">
        <ul>
            <!-- <li v-for="(item, index) in tokenList" :key="index" class="p-3 rounded-2xl space-y-3" -->
            <li v-for="(item, index) in 9" :key="index" class="p-3 rounded-2xl space-y-3"
                style="box-shadow: 0px 0px 20px rgba(0, 76, 230, 0.1);">
                <div class="flex items-center">
                    <!-- https://gateway.pinata.cloud/ipfs/QmNnGUHwagNAzhBUwGvsfCMvuVKfL294eKPu1r2juXVN3J -->
                    <img :src="`//bafkreihlbis2medj32mni6qark3bzvvdhjtqfpwujarc3inn6r425ecueu.ipfs.dweb.link`"
                        class="w-[48px] h-[48px] mr-3" alt />
                    <h2 class="text-base font-semibold text-[#333]">BSC</h2>
                </div>
                <div class="flex">
                    <img src="../../assets/img/bsc.jpg" class="w-[20px] h-[20px] mr-[5px]" alt />
                    <span>BSC</span>
                </div>
                <div class="text-[#CCCCCC] text-sm mt-5">
                    <div>链商超级管理员NFT合约地址： </div>
                    <p class="truncate text-sm text-[#333] font-normal  mb-3 pr-8 relative">
                        0xab5801a7d398351b8be11c439e05c5b3259aec9b
                        <van-icon color="#FF8D1A" name="notes-o" size="20px" class="absolute right-0" />
                    </p>
                    <div class="h-4"></div>
                    <div>
                        链商钱包地址：
                    </div>
                    <p class="truncate text-sm text-[#333] font-normal  mb-3 pr-8 relative">
                        0xab5801a7d398351b8be11c439e05c5b3259aec9b
                        <van-icon color="#FF8D1A" name="notes-o" size="20px" class="absolute right-0" />
                    </p>
                </div>
                <div class="flex justify-center">

                    <van-button @click="() => {
                    
                        $router.push('/token_add')
                    }" class="rounded-[8px] w-[294px] h-8 inline-block bg-[#1A8CFF] bg-opacity-[0.1]"
                        style="--van-button-default-color:#1A8CFF">
                        新Token上线
                    </van-button>
                </div>

            </li>
        </ul>
    </div>

</template>
<script setup>
import { ref } from 'vue'
import { unit } from '@/web3/tools'
// import { storeToRefs } from 'pinia'
import { useChainStore } from '@/store'
const name = ref('')
const fileList = ref([]);
const price = ref(1);
const loading = ref(false);
const isOpen = ref(true);

// const chainShow = ref(false);
const chain = useChainStore();
// let { connectionInstance } = storeToRefs(chain);
const afterRead = () => {

}
</script>

<style scoped>
</style>
