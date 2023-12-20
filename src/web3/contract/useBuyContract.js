import useCommonTools from "./useCommonTools";
import { buyAbi,unishopBuyAbi } from "@/web3/abi";
import { buyAddress,TRON} from "@/web3/config";
import { computed } from "vue";
// eslint-disable-next-line no-unused-vars
import {fromWei, toHex, toWei} from '@/web3/tools'
export default function (props) {
  const { userAddress, web3,type,tronBuyContract,erc20Type } = props;

  const contract = computed(() => {
    if(erc20Type.value === 'UNISHOP'){
      return new web3.value.eth.Contract(unishopBuyAbi, buyAddress(type.value,erc20Type.value));
    }
    return new web3.value.eth.Contract(buyAbi, buyAddress(type.value,erc20Type.value));
  });


  function getContract(){
    if(type.value!== TRON){
      return contract?.value?.methods
    }
    return tronBuyContract.value
  }

   


  const { getBalance } = useCommonTools(
    getContract,
    userAddress,
    type,
    buyAddress,
    erc20Type
  );

  const getCost = async (value) => {
    
    const val = toHex(type.value,toWei('??',value)) // unishop 1**18
    let Contract =null;

    if (type.value === TRON){
      Contract = await window.tronWeb.contract().at(buyAddress(type.value,"UNISHOPCOINS"));
    }else{
      console.log('getCost: ', getCost);
      Contract= new web3.value.eth.Contract(buyAbi,buyAddress(type.value, "UNISHOPCOINS")).methods
      
    }

    return await Contract
      .getCost(val)
      .call({ from: userAddress.value })
      .then((res) => {
        console.log('res:getCost ', res,fromWei(type.value,res));
        return fromWei(type.value,res);
      });
  };
  
  const buyToken = (value,costVal) => {
    const val =toHex(type.value,toWei(type.value,costVal))
      return getContract()
      .buy(toHex(type.value,toWei('??',value))) // unishop 1**18
      .send(
        type.value!==TRON? { from: userAddress.value,value:val }:{
          callValue: val
         })
      .then((res) => {
        console.log('buy res: ', res);
        return res;
      });
   
  };

  const getBuyCost =async (value) => {
    
    let Contract =null;
    if (type.value === TRON){
      Contract = await window.tronWeb.contract().at(buyAddress(type.value,"UNISHOP"));
    }else{
      console.log('getBuyCost: ', getBuyCost);
      Contract= new web3.value.eth.Contract(unishopBuyAbi,buyAddress(type.value, "UNISHOP")).methods
    }

    const val = toHex(type.value,toWei('??',value))
   
    return await Contract.getBuyCost(val).call().then( res =>{
    
      return fromWei(type.value,res)
    })
  }

  const getSaleCost = (value) => {
    const val = toHex(type.value,toWei(type.value,value))
    return getContract().getSaleCost(val).call().then( res =>{
      return fromWei('??',res)
    })
  }

  const saleToken = (value) =>{
    return getContract()
    .sale(toHex(type.value,toWei('??',value))) // unishop 1**18
    .send({ from: userAddress.value})
    .then((res) => {
      console.log('buy res: ', res);
      return res;
    });
 
  } 


  return {
    getBalance,
    getCost,
    buyToken,
    saleToken,
    getBuyCost,
    getSaleCost,
  };
}
