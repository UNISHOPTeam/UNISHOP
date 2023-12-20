import useCommonTools from "./useCommonTools"
import { unishop2u, erc20TokenAbi } from "@/web3/abi"
// eslint-disable-next-line no-unused-vars
import { unishop2UAddress, TRON, ARBITRUM } from "@/web3/config"
import { computed, ref,reactive } from "vue"
// eslint-disable-next-line no-unused-vars
import { fromWei, toHex, toWei } from "@/web3/tools"
import BigNumber from "bignumber.js"
let timer = null;

const unishopAddress = ref()
const unishopDecimals = ref()
const uAddress = ref()
export default function (props) {
  const { userAddress, web3, type, utoUsdtContract, erc20Type } = props
  const totalCard = reactive({
    data: {
      total: 0,
      totalU: 0,
      speed:0,
      consume: [0, 0]
    }
  })
  const contract = computed(() => {
    return new web3.value.eth.Contract(unishop2u, unishop2UAddress(type.value))
  })

  function getContract() {
    if (type.value !== TRON) {
      return contract?.value?.methods
    }
    return utoUsdtContract.value
  }

  async function getuContract() {
    if (type.value !== TRON) {
      return await new web3.value.eth.Contract(erc20TokenAbi, uAddress.value)
        ?.methods
    }
    return await window.tronWeb.contract().at(uAddress.value)
  }

  async function getUNISHOPContract() {
    if (type.value !== TRON) {
      return await new web3.value.eth.Contract(erc20TokenAbi, unishopAddress.value)
        ?.methods
    }
    return await window.tronWeb.contract().at(unishopAddress.value)
  }

  const {
    getBalance: UBalance,
    approve: UApprove,
    allowance: UAllowance,
  } = useCommonTools(getuContract, userAddress, type, unishop2UAddress, erc20Type)

  const {
    getBalance: unishopBalance,
    approve: unishopApprove,
    allowance: unishopAllowance,
  } = useCommonTools(getUNISHOPContract, userAddress, type, unishop2UAddress, erc20Type)
//   u地池
 async function getUnishop2UAddressBalance(){
    let c = await getuContract()
    return c.balanceOf(unishop2UAddress(type.value))
    .call()
    .then((res) => {
      return fromWei(erc20Type?.value, res); // unishop 1**18
    });
 }
  // 首页总产
  async function getRecordUpdated() {
    // 获取小数点位数
    const unishopC = await getUNISHOPContract()
    if (!unishopDecimals.value) {
      await unishopC
        .decimals()
        .call()
        .then((res) => {
          unishopDecimals.value = res
        })
    }

    const res = await getContract()
    .getRecordUpdated(userAddress.value)
    .call({ from: userAddress.value, })
    console.log('resgetRecordUpdated: ', res);
    const total = new BigNumber(res[0]["reward"]).minus(res[0]["payed"]).plus(res.speed)
   console.log('total',total.gte('0'));
   
    if (timer) {
      clearInterval(timer);
    }
    if(total.gt('0')){
    timer = setInterval(() => {
        totalCard.data.total =  fromWei('??',total);
        getContract().getUOutput(total.toString()).call().then(res=>{
          totalCard.data.totalU= fromWei('??',res)
         })
         totalCard.data.consume =  [
          fromWei("??", res[0]["reward"]),
          fromWei("??", res[0]["amount"]),
        ]
      }, 1000);
    }
  }

  // 领取收益
  async function getWithdraw() {
    return getContract().withdraw().send({ from: userAddress.value })
  }

  // get u address
  async function getuAddress() {
    return getContract()
      .U()
      .call({ from: userAddress.value })
      .then((e) => {
        console.log("uAddress.value : ", e)
        if (type.value === TRON) {
          uAddress.value = window.tronWeb.address.fromHex(e)

          return e
        }
        uAddress.value = e
        return e
      })
  }

  // usdt Address
  const getUnishopAddress = () => {
    return getContract()
      .UNISHOP()
      .call({ from: userAddress.value })
      .then((e) => {
        console.log("getUnishopAddress : ", e)
        if (type.value === TRON) {
          unishopAddress.value = window.tronWeb.address.fromHex(e)
          return e
        }
        unishopAddress.value = e
        return e
      })
  }
  // unishop =>u
  const getUOutput = async (value) => {
    let val = toHex(type.value, toWei("??", value))
    return await getContract()
      .getUOutput(val)
      .call()
      .then((res) => {
        console.log("res: ", res)
        return fromWei(type.value, res)
      })
  }
  // u => unishop
  const getUnishopOutput = async (value) => {
    let val = toHex(type.value, toWei("??", value))
    return await getContract()
      .getUnishopOutput(val)
      .call()
      .then((res) => {
        console.log("res: ", res)
        return fromWei(type.value, res)
      })
  }

  const unishop2U = (value) => {
    let val = toHex(type.value, toWei(type.value, value))
    // if (type.value === ARBITRUM || type.value === TRON) {
    //     console.log('getBuyCost: ', toWei(type.value, value, 'mwei'));
    //     val = toHex(type.value, toWei(type.value, value, 'mwei'))
    // }
    return getContract()
      .unishop2U(val) // unishop 1**18
      .send(
        { from: userAddress.value }
        // type.value !== TRON ? { from: userAddress.value, value: val } : {
        //     callValue: val
        // }
      )
      .then((res) => {
        console.log("buy res: ", res)
        return res
      })
  }
  const u2Unishop = (value) => {
    let val = toHex(type.value, toWei(type.value, value))
    // if (type.value === ARBITRUM || type.value === TRON) {
    //     console.log('getBuyCost: ', toWei(type.value, value, 'mwei'));
    //     val = toHex(type.value, toWei(type.value, value, 'mwei'))
    // }
    return getContract()
      .u2Unishop(val) // unishop 1**18
      .send(
        { from: userAddress.value }
        // type.value !== TRON ? { from: userAddress.value, value: val } : {
        //     callValue: val
        // }
      )
      .then((res) => {
        console.log("buy res: ", res)
        return res
      })
  }

  return {
    getUnishopAddress,
    getUNISHOPContract,
    getUnishop2UAddressBalance,
    getuContract,
    UBalance,
    unishopBalance,
    unishopApprove,
    UApprove,
    unishopAllowance,
    UAllowance,
    getuAddress,
    unishop2U,
    u2Unishop,
    getUOutput,
    getUnishopOutput,
    totalCard,
    getRecordUpdated,
    getWithdraw,
  }
}
