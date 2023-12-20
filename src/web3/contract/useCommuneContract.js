import { ref } from "vue";
import { TRON } from "../config";

export default function (props) {
  const { instance, userAddress,contract,type } = props;
  console.log(' instance, userAddres: ',  instance, userAddress,type);
  const tokenList = ref([]);

  function _toWei(value){
      if(type.value!==TRON){
        return instance.value.utils.toWei(value,'ether')
      }
      return instance.value.toSun(value)
  }

  function _fromWei(value){
    if(type.value!==TRON){
      return instance.value.utils.fromWei(value)
    }
    return instance.value.fromSun(value);
  }
  function getContract(){
    if(type.value!==TRON){
      return contract.value.methods
    }
    return contract.value
  }


  function safeTransferFrom(to,tokenId){
    return getContract().safeTransferFrom(userAddress.value,to,tokenId).send({from:userAddress.value})
  }

  function mintUNISHOP(uri, name, imgUrl, value,callback) {
    return getContract().mintUNISHOP(uri, name, imgUrl).send(
      type.value!==TRON? {
        from: userAddress.value,
         value: _toWei(value),
       }:{
        callValue: _toWei(value)
       }
    ).then((receipt)=>{
      console.log('mintUNISHOP--receipt: ', receipt);
      callback()
    });
  }

  function enabled() {
    return getContract()
      .enabled()
      .call({ from: userAddress.value })
      .then((res) => {
        return res;
      });
  }

  function mintPrice() {
    return getContract()
    .mintPrice()
    .call({ from: userAddress.value })
    .then((res) => {
        console.log('mintPrice: ', res);
        return _fromWei(res);
      });
  }
  
  function totalSupply() {
    return getContract()
      .totalSupply()
      .call({ from: userAddress.value }).then(res=>{
        return type.value!==TRON ? res:res.toNumber()
      });
  }
  
  async function getTokenList(supplyQuantity) {
    console.log('supplyQuantity: ', supplyQuantity);
    if (supplyQuantity <= 0) return;
    tokenList.value=[];
    for (let i = 0; i < supplyQuantity; i++) {
      try {
        const name = await getContract().tokenName(i).call();
        const image = await getContract().tokenCid(i).call();
        
        const walletAddress = await getContract().ownerOf(i).call();
        if(tokenList.value.find(item=>item.name === name)){
          continue
        }
        tokenList.value.push({ name, image, walletAddress: walletAddress });
      } catch (error) {
        console.log("error: ", error);
      }
    }
    window.sessionStorage.setItem("list", JSON.stringify(tokenList.value));
  }
  // watchEffect(() => {
  //   const oldList = window.sessionStorage.getItem("list");
  //   if (oldList) {
  //     tokenList.value = JSON.parse(oldList);
  //   }
  // });
  return {
    getTokenList,
    tokenList,
    enabled,
    safeTransferFrom,
    mintPrice,
    totalSupply,
    mintUNISHOP,
  };
}