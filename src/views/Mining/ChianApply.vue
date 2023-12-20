
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
                <span class="font-normal text-[#333] text-sm"> {{ costValue }} U</span>
            </div>
        </div>
    </div>
    <div class="flex mt-6 items-center justify-center">
        <!-- <div @click="chainShow = true"
            class="w-[136px] h-[40px] border-[1px] rounded-full bg-[#1A8CFF] bg-opacity-10  border-[#1A8BFF] border-solid flex justify-center items-center text-xs text-[#1A8CFF]">
            {{ chain.chainType }} BSC 链
            <van-icon name="arrow-down" size="12px" class="ml-[15px]" />
        </div> -->
        <button @click="handleClickApprove" v-if="!isApprove && connected"
            style="background-image: linear-gradient(135deg, #1AB3FF 0%, #1A8BFF 100%);"
            class="disabled:opacity-50 shadow-sm shadow-[#1A8BFF] text-white text-base ml-[20px]  w-[136px] h-[40px] leading-[17px] rounded-3xl flex justify-center items-center">
            <CLoading v-if="approveLoading" />
            {{ 'Approve' }}
        </button>

        <button @click="handleApplyClick" style="background-image: linear-gradient(135deg, #1AB3FF 0%, #1A8BFF 100%);"
            class="disabled:opacity-50 shadow-sm shadow-[#1A8BFF] text-white text-base ml-[20px]  w-[136px] h-[40px] leading-[17px] rounded-3xl flex justify-center items-center">
            {{ connected ? '申请链商' : '连接钱包' }}
        </button>
    </div>



    <div class="mt-8"></div>
    <div class="bg-white rounded-2xl min-h-[326px] p-4 overflow-hidden">
        <ul>
            <!-- <li v-for="(item, index) in tokenList" :key="index" class="p-3 rounded-2xl space-y-3" -->
            <li v-for="(item, index) in listData" :key="index" class="p-3 rounded-2xl space-y-3"
                style="box-shadow: 0px 0px 20px rgba(0, 76, 230, 0.1);">
                <div class="flex items-center">
                    <!-- https://gateway.pinata.cloud/ipfs/QmNnGUHwagNAzhBUwGvsfCMvuVKfL294eKPu1r2juXVN3J -->
                    <img :src="`//${item.cid}.ipfs.dweb.link`" class="w-[48px] h-[48px] mr-3" alt />
                    <h2 class="text-base font-semibold text-[#333]">{{ item.name }}</h2>
                </div>
                <div class="flex">
                    <img :src="getIconImg($route.query['chianType'])" class="w-[20px] h-[20px] mr-[5px]" alt />
                    <span>{{ $route.query['chianType'] }}</span>
                </div>
                <div class="text-[#CCCCCC] text-sm mt-5">
                    <div>链商超级管理员NFT合约地址： </div>
                    <p class="truncate text-sm text-[#333] font-normal  mb-3 pr-8 relative">
                        {{ applyChainAddress(route.query['chianType']) }}
                        <van-icon v-copy="`${applyChainAddress(route.query['chianType'])}`" color="#FF8D1A"
                            name="notes-o" size="20px" class="absolute right-0" />
                    </p>
                    <div class="h-4"></div>
                    <div>
                        链商钱包地址：
                    </div>
                    <p class="truncate text-sm text-[#333] font-normal  mb-3 pr-8 relative">
                        {{ item.ownerAddress }}
                        <van-icon v-copy="`${item.ownerAddress}`" color="#FF8D1A" name="notes-o" size="20px"
                            class="absolute right-0" />
                    </p>
                </div>
                <div class="flex justify-center" v-if="item.isShow">

                    <van-button @click="handleUpLoadProduct(item.id)"
                        class="rounded-[8px] w-[294px] h-8 inline-block bg-[#1A8CFF] bg-opacity-[0.1]"
                        style="--van-button-default-color:#1A8CFF">
                        产品上传
                    </van-button>
                </div>

            </li>
        </ul>
    </div>

</template>
<script setup>
import useApplyChian from '@/web3/contract/useApplyChian'
import { ref, getCurrentInstance, onMounted } from 'vue'
import vCopy from '@/directives/copy'
import { storeToRefs } from 'pinia'
import { useChainStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { Dialog, Toast } from 'vant'
import { IPFS_URL, PINATA_API_KEY, PINATA_SECRET_API_KEY, TRON, applyChainAddress } from '@/web3/config'
const { proxy } = getCurrentInstance();
const name = ref('')
const costValue = ref('')
const fileList = ref([]);
const listData = ref([]);
const approveLoading = ref(false);
const isApprove = ref(false);
const isCanMintShop = ref(true); // 能否申请
const route = useRoute()
const router = useRouter()
// const chainShow = ref(false);
const chain = useChainStore();
let { connectionInstance, chainType } = storeToRefs(chain);
console.log('chainType: ', chainType);
const {
    web3,
    tronWeb,
    userAddress,
    assets,
    connected,
    tronApplyChainContract
} = storeToRefs(connectionInstance.value);
console.log(web3,
    tronWeb,
    userAddress,
    assets,
    connected,
)

const { approve, getUsdtAddress, mintCost, getShopOwner, canMintShop, allowance, mint, getCommShops, canUploadProduct } = useApplyChian({
    userAddress,
    web3,
    type: chainType,
    tronApplyChainContract
})
const getIconImg = (type) => {
    switch (type) {
        case "ETH":
            return require("../../assets/img/arbi.jpg");
        case TRON:
            return require("../../assets/img/tron.jpg");
        default:
            return require("../../assets/img/bsc.jpg");
    }
};
const afterRead = async (file) => {
    // 此时可以自行将文件上传至服务器
    file.status = "uploading";
    file.message = "上传中";
    let formData = new FormData();
    formData.append("file", file.file);
    formData.append("pinataOptions", JSON.stringify({ cidVersion: "1" }));
    return await fetch(IPFS_URL, {
        method: 'POST',
        headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
        body: formData
    }).then((response) => response.json())
        .then((res) => {
            if (res.IpfsHash) {
                file.status = "done",
                    file.value = [
                        {
                            url: `${res.IpfsHash}.ipfs.dweb.link`,
                            cid: res.IpfsHash,
                            isImage: true,
                        }
                    ];
                return;
            }
            throw new Error(res);
        })
        .catch((error) => {
            file.status = "failed";
            file.message = "上传失败";
            console.error("error", error);
        });
}
const handleClickApprove = () => {
    if (!connected.value) {
        return handleClickConnectWallet()
    }
    Toast.loading({
        message: "加载中...",
        forbidClick: true,
    })
    approve().then(() => {
        isApprove.value = true
        Toast.clear()
        Toast.success("链上确认中!请前往区块浏览器查看")
    })
}
const initData = () => {
    mintCost().then(res => {
        costValue.value = res
    })
    canMintShop(route.query['index']).then(res => {
        console.log(res)
        isCanMintShop.value = res
    })
    getUsdtAddress().then(() => {
        allowance().then(res => {
            console.log('allowance res: ', res);
            isApprove.value = res
        })
    })
    // getCommOwner(route.query["index"]).then(e => ownerAddress.value = e)
    getCommShops(route.query['index']).then(res => {
        let obj = res;
        obj = []
        for (let i = 0; i < res[0].length; i++) {
            let id, name, cid;
            for (let j = 0; j < Object.values(res).length; j++) {
                const current = Object.values(res)[j][i].toString();
                console.log("current: ", current);
                if (j == 0) {
                    id = current;
                }
                if (j == 1) {
                    name = current;
                }
                if (j == 2) {
                    cid = current;
                }
            }
            obj.push({ id, name, cid });
        }
        console.log(obj)
        listData.value = obj;
        obj.map(async (item, index) => {
            listData.value[index]['isShow'] = await canUploadProduct(route.query['index'], item.id)
        })
        obj.map(async (item, index) => {
            listData.value[index]['ownerAddress'] = await getShopOwner(route.query['index'], item.id)
        })
    })
}
const handleApplyClick = () => {
    if (!connected.value) {
        return handleClickConnectWallet()
    }
    if (!isCanMintShop.value) {
        return Toast("您当前还有权限申请")
    }
    if (!name.value) {
        Toast("请填写名字");
        return;
    }
    if (fileList.value[0]?.status !== "done") {
        Toast("请填上传图片");
        return;
    }
    Toast.loading({
        message: "加载中...",
        forbidClick: true,
    });
    const logoCid = fileList.value[0].value[0].cid;
    mint(route.query['index'], name.value, logoCid).then(() => {
        fileList.value = [];
        Dialog.alert({
            message: "链上确认中，请前往区块浏览器查看",
        });
        Toast.clear();
        initData();
    }).catch(() => {
        Toast.clear();
        name.value = "";
        fileList.value = [];
        proxy.$forceUpdate();
    })
}
const handleUpLoadProduct = async (shopId) => {
    // Toast.loading({
    //     message: "加载中...",
    //     forbidClick: true,
    // })
    // const isNext = await canUploadProduct(route.query['index'], shopId)
    // Toast.clear()
    // if (!isNext) {
    //     return Toast('您不能在此链商上传产品')
    // }

    router.push({
        path: '/product_management',
        query: {
            shopId,
            ...route.query,
        }
    })
}
// eslint-disable-next-line no-unused-vars
const handleClickConnectWallet = async (isAlert = true) => {
    await connectionInstance.value.onConnect(
        chain.chainType,
        // route.query.chainType,
        () => {
            initData()
        },
        isAlert
    );
};

onMounted(() => {
    if (!connected.value) {
        handleClickConnectWallet();
    } else {
        initData()
    }
})
</script>

<style scoped>
</style>
