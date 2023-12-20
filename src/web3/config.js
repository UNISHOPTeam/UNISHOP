
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import { Bitski } from "bitski";
import Fortmatic from "fortmatic";
// eslint-disable-next-line global-require
const {
  CommuneAddress,
  TronCommuneAddress,
  ArbitrumCommuneAddress,
  Erc20UsdtAddress,
  //
  erc20tokenAddress,
  buyAddress,
  stakeAddress,
  authorityAddress,
  receiveAddress,
  ///
  applyChainAddress,
  productChainAddress,
  uMarkerAddress,
  //
  unishop2UAddress,

  receiveUAddress,
  productChainHelperAddress,
  oldStakeAddress
} =require("./constants")
  process.env.NODE_ENV === "production"
    ? require("./constants")
    : require("./constants");
//
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "4d491126ad1f4b50a1c6b26bb0c623f2", // TODO infuraId
    },
  },
  torus: {
    package: Torus,
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: "pk_live_74801D0A627E5F1A", // TODO key
    },
  },
  authereum: {
    package: Authereum,
  },
  bitski: {
    package: Bitski,
    options: {
      clientId: "9a7dc66e-6990-4fb2-b7e9-18c67961b0ce", // TODO
      callbackUrl: `${window.location.href}bitski-callback.html`,
    },
  },
};

const PINATA_API_KEY = "b17b0b0bffff9b435a1d";
const PINATA_SECRET_API_KEY =
  "6e55583e7d662c35e1bf37fbb0930d298733326a40771a34bda237b8465bb503";
const IPFS_URL = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const TRON = "TRON";
const ARBITRUM = "ETH";
const BSC = "BSC";
// TRX留：400做矿公费，ETH留：0.01做矿公费，BSC留：0.04做矿公费

const GAS = {
  [TRON]: 99,
  [ARBITRUM]: 0.01,
  [BSC]: 0.04,
};
export {
  Erc20UsdtAddress,
  CommuneAddress,
  TronCommuneAddress,
  ArbitrumCommuneAddress,
  providerOptions,
  PINATA_API_KEY,
  PINATA_SECRET_API_KEY,
  TRON,
  ARBITRUM,
  BSC,
  GAS,
  //
  erc20tokenAddress,
  buyAddress,
  oldStakeAddress,
  stakeAddress,
  receiveAddress,
  //
  applyChainAddress,
  authorityAddress,
  productChainAddress,
  uMarkerAddress,
  //IPFS_URL
  IPFS_URL,
  //
  unishop2UAddress
    ,receiveUAddress,

  productChainHelperAddress
};
