
import BigNumber from "bignumber.js";
import {BSC } from "../config";
import { fromWei, toHex, toWei } from "../tools";
import isPromise from "is-promise";
export default (Contract, userAddress, type, currentAddress, erc20Type,isUsdt) => {
  async function allowance() {
    let c = null;
    if (isPromise(Contract())) {
      c = await Contract();
    } else {
      c = Contract();
    }

    return await c
      .allowance(
        userAddress.value,
        currentAddress(type.value, erc20Type?.value)
      )
      .call({ from: userAddress.value })
      .then((res) => {
        console.log('allowanceres: ', res);
        if (res._isBigNumber) {
          return res.gt(0);
          
        }
        return new BigNumber(res).gt(0);
      });
  }
  async function getBalance() {
    let c = null;
    if (isPromise(Contract())) {
      c = await Contract();
    } else {
      c = Contract();
    }

    return await c
      .balanceOf(userAddress.value)
      .call()
      .then((res) => {
        console.log("res: ", res);
        if(isUsdt&&type.value !== BSC){
            return fromWei(erc20Type?.value, res,'mwei');
        }
        return fromWei(erc20Type?.value, res); // unishop 1**18
      });
  }
  async function approve() {
    let c = null;
    if (isPromise(Contract())) {
      c = await Contract();
    } else {
      c = Contract();
    }
    return await c
      .approve(
        currentAddress(type.value, erc20Type?.value),
        toHex(
          type.value,
          toWei(type.value, "1000000000000000000000000000", "gwei")
        )
      )
      .send({ from: userAddress.value });
  }
  return {
    allowance,
    getBalance,
    approve,
  };
};
