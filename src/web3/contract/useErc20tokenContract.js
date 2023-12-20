import useCommonTools from "./useCommonTools";
import { erc20TokenAbi } from "@/web3/abi";
import { buyAddress, erc20tokenAddress,stakeAddress,TRON} from "@/web3/config";
import { computed } from "vue";

export default function (props) {
  const { userAddress, web3,type,tronTokenContract,erc20Type } = props;
  console.log('type: ', type);
  const erc20tokenContract = computed(() => {
    return new web3.value.eth.Contract(erc20TokenAbi, erc20tokenAddress(type.value,erc20Type.value));
  });
  function getContract(){
    if(type.value!== TRON){
      return erc20tokenContract.value.methods
    }
    return tronTokenContract.value
  }

  
  const { getBalance,approve,allowance } = useCommonTools(
    getContract,
    userAddress,
    type,
    stakeAddress,
    erc20Type
  );

  const {approve:saleApprove, allowance:saleAllowance } = useCommonTools(
    getContract,
    userAddress,
    type,
    buyAddress,
    erc20Type
  );

  return {
    saleApprove,
    saleAllowance,
    getBalance,
    approve,allowance 
  };
}
