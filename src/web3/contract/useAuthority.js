/*
 * @Author: cuijian
 * @Date: 2022-06-07 23:00:35
 * @LastEditors: cuijiajun
 * @LastEditTime: 2022-06-14 20:52:49
 * @FilePath: /unishop_ui/src/web3/contract/useApplyChian.js
 */

import { productAbi } from "@/web3/abi";
import { authorityAddress, TRON } from "@/web3/config";
import { computed } from "vue";
// eslint-disable-next-line no-unused-vars
import { fromWei, toHex, toWei } from "@/web3/tools";
export default function (props) {
  const { userAddress, web3, type, tronProductChainContract } = props;

  const contract = computed(() => {
    return new web3.value.eth.Contract(
      productAbi,
      authorityAddress(type.value)
    );
  });

function getContract() {
    if (type.value !== TRON) {
      return contract?.value?.methods;
    }
    return tronProductChainContract?.value;
  }

  function isOwner(erc20Addr) {
    return getContract().isOwner(userAddress.value ,erc20Addr).call({ from: userAddress.value });
  }

  return {
    isOwner,
  };
}
