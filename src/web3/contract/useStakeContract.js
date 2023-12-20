import { stakeAbi, unishopStakeAbi } from "@/web3/abi";
import {oldStakeAddress, stakeAddress, TRON} from "@/web3/config";
import { computed } from "vue";
import { fromWei, toHex, toWei } from "@/web3/tools";

export default function (props) {
  const { userAddress, web3, type, tronStakeContract,tronOldStakeContract, erc20Type } = props;

  const contract = computed(() => {
    if (erc20Type.value === "UNISHOP") {
      return new web3.value.eth.Contract(
        unishopStakeAbi,
        stakeAddress(type.value, erc20Type.value)
      );
    }
    return new web3.value.eth.Contract(
      stakeAbi,
      stakeAddress(type.value, "UNISHOPCOINS")
    );
  });

    const oldContract = computed(() => {
        return new web3.value.eth.Contract(
            unishopStakeAbi,
            oldStakeAddress(type.value, erc20Type.value)
        );
    });


    function  getOldContract() {
        if (type.value !== TRON) {
            return oldContract.value.methods;
        }
        return tronOldStakeContract.value;
    }

   function  getContract() {
    if (type.value !== TRON) {
      return contract.value.methods;
    }
    return tronStakeContract.value;
  }
  const getNftStake = async (nftId) => {
    console.log("nftId: ", nftId);
      let Contract = null;
      if (type.value === TRON){
        Contract = await window.tronWeb.contract().at(stakeAddress(type.value,"UNISHOPCOINS"));
      }else{
        Contract= new web3.value.eth.Contract(stakeAbi,stakeAddress(type.value, "UNISHOPCOINS")).methods
      }
    return  Contract.getNftStake(nftId, false)
      .call({ from: userAddress.value })
      .then((res) => {
        console.log("res:getNFtStake ", res);
        return fromWei("??", res); //  unishop 1**18
      });
  };

  const getStakeList = (value) => {
    const val = toHex(type.value, toWei(type.value, value));
    console.log("val: ", val);
    return getContract()
      .getStakeList(val)
      .call({ from: userAddress.value })
      .then((res) => {
        return fromWei(type.value, res);
      });
  };

  const stake = (nftId, value, level) => {
    const val = toHex(type.value, toWei("??", value)); //  unishop 1**18
    let params = [nftId, val, level ? toHex(type.value, level) : null];
    if (erc20Type.value !== "UNISHOP") {
      params = [nftId, val];
    }
    return getContract()
      .stake(...params)
      .send({ from: userAddress.value })
      .then((res) => {
        console.log("stake res: ", res);
        return res;
      });
  };

  const stakeWithAdvice = (nftId, value, level, upAddress) => {
    const val = toHex(type.value, toWei("??", value)); //  unishop 1**18
    return getContract()
      .stakeWithAdvice(nftId, val, toHex(type.value, level), upAddress)
      .send({ from: userAddress.value })
      .then((res) => {
        console.log("stake res: ", res);
        return res;
      });
  };

  const withdraw = (nftId, id, value,isOld) => {
      let Contract = getContract();
      if(isOld) {
          Contract = getOldContract()
      }
    const val = toHex(type.value, toWei("??", value));
    return Contract
      .withdraw(nftId, id, val)
      .send({ from: userAddress.value })
      .then((res) => {
        console.log("withdraw res: ", res);
        return res;
      });
  };

  // Compatibility between new and old contracts
  const getUserStakeList = async (address, nftId) => {
     const old =  await getOldContract().getUserStakeList(nftId, address).call({ from: userAddress.value })

      const result =old.map(e=>{
            return Object.keys(e).reduce((acc, curr, i) => {
                acc[curr] = Object.values(e)[i]
                return acc
            }, [])
      })
   const newVal = await getContract().getUserStakeList(nftId, address).call({ from: userAddress.value })
      return [...(result.map(e=>(e.isOld=true,e))),...newVal]
  };

  return {
    getUserStakeList,
    getNftStake,
    getStakeList,
    stakeWithAdvice,
    stake,
    withdraw,
  };
}
