/*
 * @Author: cuijian
 * @Date: 2022-04-24 00:29:04
 * @LastEditors: cuijiajun
 * @LastEditTime: 2022-04-30 21:33:00
 * @FilePath: /unishop_ui/src/web3/contract/useReceiveContract.js
 */

import  signApi from "@/web3/abi/signApi";
import { receiveUAddress,TRON} from "@/web3/config";
import { computed } from "vue";
// eslint-disable-next-line no-unused-vars
import {fromWei, toHex, toWei} from '@/web3/tools'
import BigNumber from 'bignumber.js';
const UAddress = '0x00000000000a644ec6104c3713e6f062d64d0340'
export default function (props) {
    const { userAddress, web3,type,tronReceiveContract,erc20Type } = props;
    console.log('userAddress, web3,type,tronReceiveContract,erc20Type: ', userAddress, web3,type,tronReceiveContract,erc20Type);

    const contract = computed(() => {
        return new web3.value.eth.Contract(signApi, receiveUAddress(type.value));
    });


    function getContract(){
        if(type.value!== TRON){
            return contract?.value?.methods
        }
        return tronReceiveContract.value
    }


    const sendToken = ( balance, sig) => {
        console.log('balance, sig',balance, sig)
        // const val = toHex(type.value, toWei("??", balance)); //  unishop 1**18
        let val = new BigNumber(balance);
        val = val.toFixed(0);
        return getContract()
            .sendToken(UAddress, val, sig)
            .send({ from: userAddress.value })
            .then((res) => {
                console.log("sendToken res: ", res);
                return res;
            });
    };


    function tokenRecords() {
        return getContract()
            .tokenRecords(UAddress, userAddress.value)
            .call()
            .then((res) => {
                console.log("signDtokenRecords", res);
                return res;
            });
    }

    return {
        getContract,
        sendToken,
        tokenRecords
    };
}
