/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import Web3Modal from 'web3modal';
import { providerOptions } from '@/web3/config';
import { getChainData } from '@/web3/tools';
import Web3, { utils } from 'web3';
import communeAbi from "@/web3/abi/communeAbi";
import { CommuneAddress,ArbitrumCommuneAddress,ARBITRUM,TRON,BSC } from "@/web3/config";
import { Dialog } from 'vant';
// import {useChainStore} from './index'
const INITIAL_STATE = {
  type: ARBITRUM,
  web3: null,
  provider: null,
  userAddress: '',
  connected: false,
  chainId: 1,
  networkId: 1,
  fetching:false,
  contract:null
};
export const useWeb3Store = defineStore('web3Store', {
  state: () => ({
    ...INITIAL_STATE,
    assets:0,
    // web3Modal:null,
  }),
  getters: {
    // web3: (state) => state.web3,
    // provider: (state) => state.provider,
    // userAddress: (state) => state.userAddress,
    // connected: (state) => state.connected,
    // chainId: (state) => state.chainId,
    // networkId: (state) => state.networkId,
    web3Modal(){
     return new Web3Modal({
        theme: 'dark',
        network: getChainData(this?.chainId)?.network??1,
        cacheProvider: true,
        providerOptions,
      });
    }
  },
  actions: {
    // initWeb3Modal (){
    //   return new Web3Modal({
    //     theme: 'dark',
    //     network: getChainData(this.chainId).network,
    //     cacheProvider: true,
    //     providerOptions,
    //   });
    // },
    // async setLibraryContract() {
    //   this.contract = this.web3.eth.Contract(communeAbi, CommuneAddress);
    // },
    async resetApp(){
      if (this.web3 && this.web3.currentProvider && this.web3.currentProvider.close) {
        await this.web3.currentProvider.close();
      }

      this.web3Modal.clearCachedProvider();
      this.assets = 0;
      this.$state = {...this.state,...INITIAL_STATE}
    },

    getUserBalance  () {
     return  this.web3.eth.getBalance(this.userAddress).then((res) => (res ? utils.fromWei(res.toString(), 'ether') : 0))
    },

    async getAccountAssets(){
      this.fetching = true;
      try {

        this.assets = await this.getUserBalance();
        console.log('this.assets : ', this.assets );
        this.fetching = false
      } catch (error) {
        this.fetching = false
      }
    },

    async subscribeProvider  (provider) {

      if (!provider.on) {
        return;
      }
      provider.on('close', () =>this.resetApp());
      provider.on('accountsChanged', async (accounts) => {
        // eslint-disable-next-line prefer-destructuring
        this.userAddress = accounts[0];
        await this.getAccountAssets();
      });
      provider.on('chainChanged', async (chainId) => {
        console.log('333', chainId);
        const networkId = await this?.web3?.eth?.net.getId();
        this.chainId = chainId;
        this.networkId = networkId;
        await this.getAccountAssets();
      });
      provider.on("networkChanged", async (networkId) => {
        console.log('networkId: ', networkId);
        const chainId = await this?.web3?.eth?.net.getId();
        this.chainId = chainId;
        this.networkId = networkId;
        await this.getAccountAssets();
      });

    },

    async onConnect(type,callback=null,isAlert=false) {
      this.type = type;
      // const web3Modal = this.initWeb3Modal()

      const provider = await this.web3Modal.connect();

      await this.subscribeProvider(provider);
      console.log('provider: ', provider);
      const web3 = new Web3(provider);

      const chainId = await web3.eth.getChainId(); // 坑逼 注意版本 chainId
      if(process.env.NODE_ENV === 'production'){
        if(
          (type&& type ===ARBITRUM && ![421611,42161].includes(chainId))
          ||(type&& type ===BSC && ![97,56].includes(chainId))
        ){
          if(isAlert){
            return Dialog.alert({
              title: '网络错误',
              message: '请在下拉菜单或您的钱包中连接到支持的网络',
            })
          }
         return
        }

      }


      const accounts = await web3.eth.getAccounts();

      let address = accounts[0];
      // address = '0xc57F08A9aacf53b75cbB576c1CC9b488EE56eCC6';

      const networkId = await web3.eth.net.getId();

      console.log('chainId: ', chainId);
      const isArbitrum = chainId == 421611 || chainId == 42161;

      const contract = new web3.eth.Contract(communeAbi, isArbitrum?ArbitrumCommuneAddress:CommuneAddress);
      console.log("contract = ",contract._address);
      this.$state ={
        ...this.state,
        web3: web3,
        provider: provider,
        connected: true,
        userAddress: address,
        chainId:chainId,
        networkId:networkId,
        contract,
      }
      await this.getAccountAssets();
      callback && callback()
    }
  },

})
