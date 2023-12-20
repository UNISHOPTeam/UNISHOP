import {productChainHelperAddress, TRON} from "@/web3/config";
import {computed} from "vue";
import productHelperAbi from "@/web3/abi/productHelperAbi";

export default function (props) {
    const {userAddress, web3, type,  productChainHelperContract} = props;
    const contract = computed(() => {
        return new web3.value.eth.Contract(productHelperAbi, productChainHelperAddress(type.value));
    });

    function getContract() {
        if (type.value !== TRON) {
            return contract?.value?.methods
        }
        return productChainHelperContract.value
    }
    const getUserProducts =  async function (){
       return await  getContract().getUserProducts(userAddress.value).call({ from: userAddress.value }).then(res=>{
            return res
        })
    }

    return{
        getUserProducts
    }
}