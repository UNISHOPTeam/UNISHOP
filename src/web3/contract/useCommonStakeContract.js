
import { unishopStakeAbi } from "@/web3/abi";
import { stakeAddress,TRON} from "@/web3/config";
import { computed } from "vue";
import {fromWei,} from '@/web3/tools'
export default function (props) {
  const { userAddress, web3,type,tronCommonStakeContract} = props;


  const contract = computed(() => {
      return new web3.value.eth.Contract(unishopStakeAbi, stakeAddress(type.value,'UNISHOP'));
  });


  function getContract(){
    if(type.value!== TRON){
      return contract.value.methods
    }
    return tronCommonStakeContract.value
  }


  const getUserStake =(address,nftid) => {
    return getContract()
      .getUserStake(nftid ,address)
      .call({ from: userAddress.value })
      .then((res) => {
        console.log('res:getUserStake ', res);
        return fromWei('??',res); //  unishop 1**18
      });
  }


  const getPreActivePercent =(address,nftId) =>{
    console.log('address,nftid: ', address,nftId);
    return getContract()
      .getPreActivePercent(nftId,address,)
      .call({ from: userAddress.value })
      .then((res) => {
        const avaiableValue = fromWei('??',res[0]); //  unishop 1**18
        const allValue = fromWei('??',res[1]);
        if(allValue === 0){
          return 0;
        }

        return [Number(avaiableValue).toFixed(2),Number(allValue).toFixed(2)];
        // return (avaiableValue*100/allValue).toFixed(2);
      });
  }


  const getExtPower = (address,nftId) => {
    return getContract()
      .getExtPower(nftId,address)
      .call({ from: userAddress.value })
      .then((res) => {
        console.log('res:getExtPower ', res);
        return res/1000;  //换成kb
        // return fromWei('??',res); //  unishop 1**18
      });
  }
  const getUserPower = (nftId,address)=>{
    return getContract()
    .getUserPower(nftId,address)
    .call({ from: userAddress.value })
    .then((res) => {
      console.log('res:getUserPower ', res);
      return res/1000
      // return fromWei('??',res); //  unishop 1**18
    });
  }
  const getGroupStake = (nftId,)=>{
    return getContract()
    .getGroupStake(nftId)
    .call({ from: userAddress.value })
    .then((res) => {
      console.log('res:getGroupStake ', res);
      // return res/1000
      return fromWei('??',res); //  unishop 1**18 //stake是要除18位的
    });
  }



  return {
    getUserStake,
    getGroupStake,
    getPreActivePercent,
    getExtPower,
    getUserPower,
  };
}
