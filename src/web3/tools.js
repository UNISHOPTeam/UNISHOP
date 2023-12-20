import supportedChains from './chains';
import { ARBITRUM, TRON, BSC } from "./config";
import { utils } from 'web3'
import BigNumber from "bignumber.js"
export function getChainData(chainId) {
  const chainData = supportedChains.filter((chain) => chain.chain_id === chainId)[0];
  // console.log(chainId);
  if (!chainData) {
    throw new Error('ChainId missing or not supported');
  }

  const API_KEY = process.env.REACT_APP_INFURA_ID;

  if (
    chainData.rpc_url.includes('infura.io')
    && chainData.rpc_url.includes('%API_KEY%')
    && API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY);
    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}

export function toHex(type,value) {
  if (type !== TRON) {
    return utils.toHex(value+'')
  }
  return window.tronWeb.toHex(value+'');
}

export function toWei(type, value,unit='ether') {
  if (type !== TRON) {
    return utils.toWei(value+'', unit)
  }
  return window.tronWeb.toSun(value+'')
}

export function fromWei(type, value,unit='ether') {
  if (type !== TRON) {
    return utils.fromWei(value+'',unit)
  }
  return window.tronWeb.fromSun(value+'');
}

export function getContract(type, contract) {
  if (type !== TRON) {
    return contract.methods
  }
  return contract
}

export const unit = (val) => {
  switch (val) {
    case BSC:
      return "BNB";
    case ARBITRUM: // todo 和后端存在差异
      return "ETH";
    case TRON:
      return "TRX";
    default:
      return "ETH";
  }
};
export const formatPrice = (val) => {
 console.log(val,'formatPrice',window.uDecimals)
 var BN = BigNumber.clone()
BN.config({DECIMAL_PLACES:8})

  return BN((val._isBigNumber?(val._hex):val)).div(Math.pow(10, window.uDecimals??18)).toString(10)
 
}