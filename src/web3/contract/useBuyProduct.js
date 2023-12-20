// eslint-disable-next-line no-unused-vars
import { productChainAddress, TRON } from "@/web3/config";
// eslint-disable-next-line no-unused-vars
import { encrypt, decrypt } from "../../libs/aes";
import { productAbi } from "@/web3/abi";
import { erc20TokenAbi } from "@/web3/abi";
import { ref, computed } from "vue";
import useCommonTools from "./useCommonTools";

export default function (props) {
  const { userAddress, web3, type, erc20Type } = props;
  const uAddress = ref();

  const contract = computed(() => {
    return new web3.value.eth.Contract(
      productAbi,
      productChainAddress(type.value)
    );
  });

  function getContract() {
    
    return contract?.value?.methods;
  }

  // get u address
  async function getuAddress() {
    

    return getContract()
      .U()
      .call({ from: userAddress.value })
      .then((e) => {
        
        uAddress.value = e;
        return e;
      });
  }

  async function getuContract() {
    return await new web3.value.eth.Contract(erc20TokenAbi, uAddress.value)
      ?.methods;
  }

  async function buyProduct(productAddress, count, argsObj,adviser) {
    let b = encrypt(
      JSON.stringify(argsObj),
      userAddress.value.substr(-16),
      userAddress.value.substr(-32)
    ).toString();
  
    let args = web3.value.utils.utf8ToHex(b);
    return getContract()
      .buyProduct(productAddress, count, args,adviser)
      .send({ from: userAddress.value })
      .then((res) => {
        
        return res;
      });
  }

  const {
    getBalance: UBalance,
    approve: UApprove,
    allowance: UAllowance,
  } = useCommonTools(
    getuContract,
    userAddress,
    type,
    productChainAddress,
    erc20Type
  );

  return {
    UBalance,
    UApprove,
    UAllowance,
    getuAddress,
    buyProduct,
  };
}
