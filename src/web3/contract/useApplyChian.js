
import useCommonTools from "./useCommonTools";
import { applyChianAbi, erc20TokenAbi,communeAbi} from "@/web3/abi";
import { applyChainAddress, TRON, ARBITRUM } from "@/web3/config";
import { computed, ref } from "vue";
// eslint-disable-next-line no-unused-vars
import { fromWei, toHex, toWei } from "@/web3/tools";

const usdtAddress = ref();
const NftAddress = ref();
export default function (props) {
  const { userAddress, web3, type, tronApplyChainContract } = props;

  const contract = computed(() => {
    return new web3.value.eth.Contract(
      applyChianAbi,
      applyChainAddress(type.value)
    );
  });

  function getContract() {
    if (type.value !== TRON) {
      return contract?.value?.methods;
    }
    return tronApplyChainContract?.value;
  }

  async function getUsdtContract() {
    if (type.value !== TRON) {
      return await new web3.value.eth.Contract(erc20TokenAbi, usdtAddress.value)?.methods;
    }
    return await window.tronWeb.contract().at(usdtAddress.value);
  }



  const { approve, allowance } = useCommonTools(
    getUsdtContract,
    userAddress,
    type,
    applyChainAddress,
    null
  );

  async function getNftContract() {
    console.log( NftAddress.value,type.value)
    if (type.value !== TRON) {
      return await new web3.value.eth.Contract(communeAbi, NftAddress.value)?.methods;
    }
    return await window.tronWeb.contract().at(NftAddress.value);
  }
   // Nft Address
   const getNftAddress = () => {
    return getContract().shopNft().call({ from: userAddress.value }).then((e) => {
      if (type.value === TRON) {
        NftAddress.value = window.tronWeb.address.fromHex(e);
      }

      NftAddress.value = e;
      console.log(NftAddress.value,'NftAddress.value')
      return e;
    }
    );
  }

  // const 
  const tokenOfOwnerByIndex = async () => {
    const result =  await getNftContract()
    return await result.tokenOfOwnerByIndex(userAddress.value,0).call({ from: userAddress.value });

  }
  /**
   *  读:
   *  */
  // usdt Address
  const getUsdtAddress = () => {
    return getContract()
      .usdt()
      .call({ from: userAddress.value })
      .then((e) => {
        if (type.value === TRON) {
          usdtAddress.value = window.tronWeb.address.fromHex(e);
        }
        usdtAddress.value = e;
        return e;
      });
  };
 
  // 费用
  const mintCost = () => {
    return getContract()
      .mintCost()
      .call({ from: userAddress.value })
      .then((res) => {
        if (type.value === TRON) {
          return window.tronWeb.fromSun(res);
        }
        if (type.value === ARBITRUM) {
          return web3.value.utils.fromWei(res, "mwei");
        }
        return web3.value.utils.fromWei(res, "ether");
      });
  };
  //公社owner     getCommOwner(commId)
  const getCommOwner = (id) => {
    return getContract()
      .getCommOwner(id)
      .call({ from: userAddress.value })
      .then((res) => {
        console.log("res:getCommOwner ", res);
        if (type.value === TRON) {
          console.log("res:getCommOwner ", window.tronWeb.address.fromHex(res));
          return window.tronWeb.address.fromHex(res);
        }
        return res; //true;
        // return res;
      });
  };

  //     已申请的链商个数 getShopNum(commId)
  const getShopNum = (id) => {
    return getContract()
      .getShopNum(id)
      .call({ from: userAddress.value })
      .then((res) => {
        console.log("res:getShopNum ", res);
        if (type.value === TRON) {
          return res.toNumber();
        }
        return res;
      });
  };
  //     判断能否申请 canMintShop(address, commId)
  const canMintShop = (id) => {
    return getContract()
      .canMintShop(id, userAddress.value)
      .call({ from: userAddress.value })
      .then((res) => {
        console.log("res:canMintShop ", res);
        return res;
      });
  };

  const getShopOwner = (commId, shopId) => {
    return getContract()
      .getShopOwner(commId, shopId)
      .call({ from: userAddress.value })
      .then((res) => {
        if (type.value === TRON) {
          console.log("res:canMintShop ", window.tronWeb.address.fromHex(res));
          return window.tronWeb.address.fromHex(res);
        }
        return res;
      });
  };
  //     能否上传产品 canUploadProduct(address, commId)
  const canUploadProduct = (id, shopId) => {
    return getContract()
      .canUploadProduct(userAddress.value, id, shopId)
      .call({ from: userAddress.value })
      .then((res) => {
        console.log("res:canUploadProduct ", res);
        return res;
      });
  };
  //     当链商列表   getCommShops(commId)
  const getCommShops = (id) => {
    return getContract()
      .getCommShops(id)
      .call({ from: userAddress.value })
      .then((res) => {
        console.log("res:getCommShops ", res);
        return res;
      });
  };
  // 写:
  //     邀请      invite(to)
  const invite = (to, id) => {
    console.log(getContract());
    return getContract()
      .invite(to, id)
      .send({ from: userAddress.value })
      .then((res) => {
        console.log("res:invite ", res);
        return res;
      });
  };
  //     申请链商    mint(to, commid,name,logo)
  const mint = (commid, name, logo) => {
    return getContract()
      .mint(commid, name, logo)
      .send({ from: userAddress.value })
      .then((res) => {
        console.log("res:mint ", res);
        return res;
      });
  };

  return {
    approve,
    allowance,
    getCommOwner,
    getShopOwner,
    mintCost,
    getShopNum,
    canMintShop,
    getUsdtAddress,
    getNftAddress,
    canUploadProduct,
    getCommShops,
    invite,
    mint,
    tokenOfOwnerByIndex,
  };
}
