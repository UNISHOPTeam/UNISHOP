import { productAbi } from "@/web3/abi"
import { productChainAddress, TRON } from "@/web3/config"
import { computed, ref } from "vue"
// eslint-disable-next-line no-unused-vars
import { fromWei, toHex, toWei } from "@/web3/tools"
import { decrypt, encrypt } from "@/libs/aes"
import BigNumber from "bignumber.js"
import { erc20TokenAbi } from "@/web3/abi"
import useCommonTools from "./useCommonTools"
const uAddress = ref(null)
const uDecimals = ref()

export default function (props) {
  const { userAddress, web3, type, tronProductChainContract } = props

  const contract = computed(() => {
    return new web3.value.eth.Contract(
      productAbi,
      productChainAddress(type.value)
    )
  })

  function getContract() {
    if (type.value !== TRON) {
      return contract?.value?.methods
    }
    return tronProductChainContract?.value
  }
  async function getuContract() {
    return await new web3.value.eth.Contract(erc20TokenAbi, uAddress.value)
      ?.methods
  }
  // get u address
  async function getuAddress() {
    console.log("userAddress.value: ", userAddress.value)
    console.log("contract?.value",contract?.value);
    if (uAddress.value) return
    console.log("getContract: ", getContract())
    await getContract()
      .U()
      .call({ from: userAddress.value })
      .then((e) => {
        console.log("uAddress.value : ", e)
        uAddress.value = e

        return e
      }).catch(e=>{
        console.log(e)
      })
    await getUDecimals()
  }
  async function getUDecimals() {
    let c = await getuContract()
    c.decimals()
      .call({ from: userAddress.value })
      .then((res) => {
        console.log(res, "getUDecimals")
        window.uDecimals = res
        uDecimals.value = res
      })
  }
  async function buyProduct(productAddress, count, argsObj, adviser) {
    let b = encrypt(
      JSON.stringify(argsObj),
      userAddress.value.substr(-16),
      userAddress.value.substr(-32)
    ).toString()

    let args = web3.value.utils.utf8ToHex(b)
    return getContract()
      .buyProduct(productAddress, count, args, adviser)
      .send({ from: userAddress.value })
      .then((res) => {
        return res
      })
  }
  const {
    getBalance: UBalance,
    approve: UApprove,
    allowance: UAllowance,
  } = useCommonTools(getuContract, userAddress, type, productChainAddress)

  // 上传产品
  const newProduct = (commId, shopId, price, name, videoCid) => {
    const priceWei = price * Math.pow(10, uDecimals.value) + ""
    console.log(priceWei)
    return getContract()
      .newProduct(commId, shopId, priceWei, name, videoCid)
      .send({ from: userAddress.value })
  }
  const getShopProducts = (commId, shopId) => {
    return getContract()
      .getShopProducts(commId, shopId)
      .call({ from: userAddress.value })
  }
  const tokenProdMap = (address) => {
    console.log("address: ", address)
    return getContract().tokenProdMap(address).call({ from: userAddress.value })
  }

  const updateProduct = (
    erc20Addr,
    name,
    video,
    logo,
    qrCode,
    phone,
    next,
    price,
    metadataCid
  ) => {
    const priceWei = price * Math.pow(10, uDecimals.value) + ""
    return getContract()
      .updateProduct(erc20Addr, video, logo, qrCode, phone, next, priceWei,metadataCid)
      .send({ from: userAddress.value })
  }
  window.decrypt = decrypt;
  // 获取购买列表
  const getProdSells = (erc20Addr) => {
    return getContract()
      .getProdSells(erc20Addr)
      .call()
      .then((res) => {
        const array = Array.from(res)
        console.log("array: ", array)
        let result = array.map((item, index) => {
          // TODO 测试删除第一
          // if (index == 0 && process.env.NODE_ENV !== "production") return item
          let obj = {}
          let decryptStr = null
          try {
            if (item["saleStr"] !== "") {
              try{
                decryptStr = decrypt(
                    web3.value.utils.hexToUtf8(item["saleStr"]),
                    item["buyer"].substr(-16),
                    item["buyer"].substr(-32)
                )
              }catch (e){
                // TODO ！！！！！！
                decryptStr = decrypt(
                    web3.value.utils.hexToUtf8(item["saleStr"]),
                    userAddress.value.substr(-16),
                    userAddress.value.substr(-32)
                )
              }
              console.log('decryptStr',decryptStr)
            } else {
              try {
                decryptStr = decrypt(
                    web3.value.utils.hexToUtf8(item["buyStr"]), // TODO 波场
                    item["buyer"].substr(-16),
                    item["buyer"].substr(-32)
                )
              }catch (e){
                decryptStr = decrypt(
                    web3.value.utils.hexToUtf8(item["buyStr"]), // TODO 波场
                    userAddress.value.substr(-16),
                    userAddress.value.substr(-32)
                )
              }
            }
          } catch (error) {
            console.error("web3.value.utils.hexToUtf8 error: ", error)
          }
          if(!decryptStr) return [...new Map(Object.entries(item))].reduce((obj, [key, value]) => (obj[key] = value, obj), {id:index})
          obj = JSON.parse(decryptStr) || {}
          obj["buyer"] = item["buyer"]
          obj["price"] = new BigNumber(item["price"])
            .div(Math.pow(10, uDecimals.value))
            .toString()
          obj["count"] = item["count"]
          obj["id"] = index
          return obj
        })
        // if (process.env.NODE_ENV !== "production") result.shift()
        return result
      })
  }
  // 发货
  const dispatchProduct = (erc20Addr, index, argsObj) => {
    console.log("argsObj: ", argsObj)
    let b = encrypt(
      JSON.stringify(argsObj),
        argsObj["buyer"].substr(-16),
        argsObj["buyer"].substr(-32)
    ).toString()

    let args = web3.value.utils.utf8ToHex(b)
    console.log(b)
    return getContract()
      .dispatchProduct(erc20Addr, index, args)
      .send({ from: userAddress.value })
  }
  // 获取收益
  const safeTransferFrom = async (erc20Addr, toAddress) => {
    const tokenId = await getContract().tokenNftIdMap(erc20Addr).call()
    console.log("tokenId: ", tokenId)
    return await getContract()
      .safeTransferFrom(userAddress.value, toAddress, tokenId)
      .send({ from: userAddress.value })
  }
  function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000)
      .toLocaleString()
      .replace(/:\d{1,2}$/, " ")
  }
  // 获取订单信息
  const getOrderList = () => {
    return getContract()
      .getOrders(userAddress.value)
      .call({ from: userAddress.value })
      .then((res) => {
        console.log("getOrderList res: ", res)

        return res[0].map((item, index) => {
          let obj = {}

          let decryptStr = null
          try {
            if (item["saleStr"] != "") {
              decryptStr = decrypt(
                web3.value.utils.hexToUtf8(item["saleStr"]),
                item["buyer"].substr(-16),
                item["buyer"].substr(-32)
              )
            } else {
              decryptStr = decrypt(
                web3.value.utils.hexToUtf8(item["buyStr"]), // TODO 波场
                item["buyer"].substr(-16),
                item["buyer"].substr(-32)
              )
            }
          } catch (e) {
            console.log(e)
            obj["id"] = index
          }

          obj["buy"] = JSON.parse(decryptStr) || {}
          obj["buy"]["count"] = item["count"]
          obj["buy"]["price"] = new BigNumber(item["price"])
            .div(Math.pow(10, uDecimals.value))
            .toString(10)
            obj['buy']['total']  =  new BigNumber(item["count"]).times(item["price"]).div(Math.pow(10, uDecimals.value))
            .toString(10)
          obj["buy"]["time"] = getLocalTime(item["blockTime"])
          // obj["buy"]["video"] = res[1][index]["video"]
          Object.keys(res[1][index]).forEach((e) => {
            if (e == "price") {
              obj[`${e}`] = new BigNumber(res[1][index][e])
                .div(Math.pow(10, uDecimals.value))
                .toString()
            } else {
              obj[`${e}`] = res[1][index][e]
            }
          })
          return obj
        })
      })
  }
  return {
    getOrderList,
    safeTransferFrom,
    getProdSells,
    dispatchProduct,
    newProduct,
    tokenProdMap,
    getShopProducts,
    updateProduct,

    //购买相关的
    UBalance,
    UApprove,
    UAllowance,
    getuAddress,
    buyProduct,
  }
}
