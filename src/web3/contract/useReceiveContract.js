/*
 * @Author: cuijian
 * @Date: 2022-04-24 00:29:04
 * @LastEditors: cuijiajun
 * @LastEditTime: 2022-04-30 21:33:00
 * @FilePath: /unishop_ui/src/web3/contract/useReceiveContract.js
 */

import { receiveAbi } from "@/web3/abi";
import { receiveAddress,TRON} from "@/web3/config";
import { computed } from "vue";
// eslint-disable-next-line no-unused-vars
import {fromWei, toHex, toWei} from '@/web3/tools'
import BigNumber from 'bignumber.js';
export default function (props) {
  const { userAddress, web3,type,tronReceiveContract,erc20Type } = props;
  console.log('userAddress, web3,type,tronReceiveContract,erc20Type: ', userAddress, web3,type,tronReceiveContract,erc20Type);

  const contract = computed(() => {
    return new web3.value.eth.Contract(receiveAbi, receiveAddress(type.value));
  });


  function getContract(){
    if(type.value!== TRON){
      return contract?.value?.methods
    }
    return tronReceiveContract.value
  }


  const sendToken = ( nft, balance, sig) => {
    // const val = toHex(type.value, toWei("??", balance)); //  unishop 1**18
    let val = new BigNumber(balance);
    val = val.toFixed(0);
    return getContract()
      .sendToken(nft, val, sig)
      .send({ from: userAddress.value })
      .then((res) => {
        console.log("sendToken res: ", res);
        return res;
      });
  };


  const getSentToken = (nftId, to) => {
    return getContract()
      .getSentToken(nftId,to)
      .call({ from: userAddress.value })
      .then((res) => {
        console.log("getSentToken res: ", res);
        return res;
        // return fromWei(type.value, res);
      });
  };

  return {
    getContract,
    sendToken,
    getSentToken
  };
}
