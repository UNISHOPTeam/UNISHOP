import { defineStore } from 'pinia'
import { useWeb3Store } from '@/store/web3Store'
import { GetQueryString } from '@/libs/util'
// eslint-disable-next-line no-unused-vars
import { ARBITRUM, TRON,BSC } from '@/web3/config'
console.log('ssss',GetQueryString('chianType'));

export const useChainStore = defineStore('chainStore', {
  state: () => ({ 
    chainType:GetQueryString('chianType')|| BSC,
    connectionInstance:useWeb3Store(),
  }),
  getters: {
    useWeb3Store:()=>useWeb3Store(),
  },
  actions: {
    async setChainType(type){
      console.log('setChainType: ', type);
      this.chainType = type
      this.connectionInstance = this.useWeb3Store
      console.log('connectionInstance: ', this.connectionInstance );

    }
  }
})
