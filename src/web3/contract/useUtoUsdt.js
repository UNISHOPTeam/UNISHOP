import useCommonTools from "./useCommonTools";
import { uToUsdtAbi, erc20TokenAbi } from "@/web3/abi";
// eslint-disable-next-line no-unused-vars
import { uMarkerAddress, TRON, ARBITRUM } from "@/web3/config";
import { computed, ref } from "vue";
// eslint-disable-next-line no-unused-vars
import { fromWei, toHex, toWei } from '@/web3/tools'
const usdtAddress = ref();
const uAddress = ref();
export default function (props) {
    const { userAddress, web3, type, utoUsdtContract, erc20Type } = props;

    const contract = computed(() => {
        return new web3.value.eth.Contract(uToUsdtAbi, uMarkerAddress(type.value));
    });

    function getContract() {
        if (type.value !== TRON) {
            return contract?.value?.methods
        }
        return utoUsdtContract.value
    }


    async function getuContract() {
        if (type.value !== TRON) {
            return await new web3.value.eth.Contract(erc20TokenAbi, uAddress.value)?.methods;
        }
        return await window.tronWeb.contract().at(uAddress.value);
    }

    async function getUsdtContract() {
        if (type.value !== TRON) {
            return await new web3.value.eth.Contract(erc20TokenAbi, usdtAddress.value)?.methods;
        }
        return await window.tronWeb.contract().at(usdtAddress.value);
    }
    const { getBalance: UBalance, approve: UApprove, allowance: UAllowance } = useCommonTools(
        getuContract,
        userAddress,
        type,
        uMarkerAddress,
        erc20Type
    );

    const { getBalance: UsdtBalance, approve: UsdtApprove, allowance: UsdtAllowance, } = useCommonTools(
        getUsdtContract,
        userAddress,
        type,
        uMarkerAddress,
        erc20Type,
        true,
    );

    // get u address
    async function getuAddress() {
        return getContract()
            .U()
            .call({ from: userAddress.value })
            .then((e) => {
                console.log('uAddress.value : ', e);
                if (type.value === TRON) {
                    uAddress.value = window.tronWeb.address.fromHex(e);

                    return e;
                }
                uAddress.value = e;
                return e;
            });
    }
    // usdt Address
    const getUsdtAddress = () => {
        return getContract()
            .usdt()
            .call({ from: userAddress.value })
            .then((e) => {
                console.log('getUsdtAddress : ', e);
                if (type.value === TRON) {
                    usdtAddress.value = window.tronWeb.address.fromHex(e);
                    return e;
                }
                usdtAddress.value = e;
                return e;
            });
    };


    const buyU = (value) => {
        let val = toWei('??', value)
        // if(type.value ===ARBITRUM){
        //     val = toWei('??', value,'u')   
        // }
        return getContract()
            .buyU(toHex(type.value, val)) // unishop 1**18
            .send({ from: userAddress.value })
            .then((res) => {
                console.log('buy res: ', res);
                return res;
            });

    };

    const getBuyCost = async (value) => {

        let val = toHex(type.value, toWei('??', value));

        // if (type.value === ARBITRUM || type.value === TRON) {
        //     console.log('getBuyCost: ', toWei(type.value, value, 'mwei'));
        //     val = toHex(type.value, toWei(type.value, value, 'mwei'))
        // }
        return await getContract().getBuyCost(val).call().then(res => {
            if (type.value === ARBITRUM || type.value === TRON) {
                return fromWei(type.value, res, 'mwei')
            }
            return fromWei(type.value, res)
        })
    }

    const getSaleCost = (value) => {
       
        let val = toHex(type.value, toWei(type.value, value))
        if (type.value === ARBITRUM || type.value === TRON) {
            console.log('getBuyCost: ', toWei(type.value, value, 'mwei'));
            val = toHex(type.value, toWei(type.value, value, 'mwei'))
        }
        return getContract().getSaleCost(val).call().then(res => {
          
            return fromWei('??', res)
        })
    }

    const saleU = (value) => {
      
        let val = toHex(type.value, toWei(type.value, value))
        if (type.value === ARBITRUM || type.value === TRON) {
            console.log('getBuyCost: ', toWei(type.value, value, 'mwei'));
            val = toHex(type.value, toWei(type.value, value, 'mwei'))
        }
        return getContract()
            .saleU(val) // unishop 1**18
            .send(
                { from: userAddress.value }
                // type.value !== TRON ? { from: userAddress.value, value: val } : {
                //     callValue: val
                // }
            )
            .then((res) => {
                console.log('buy res: ', res);
                return res;
            });

    }


    return {
        getUsdtAddress,
        getUsdtContract,
        getuContract,
        UBalance,
        UsdtBalance,
        UsdtApprove,
        UApprove,
        UsdtAllowance,
        UAllowance,
        getuAddress,
        buyU,
        saleU,
        getBuyCost,
        getSaleCost,
    };
}
