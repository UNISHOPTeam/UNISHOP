// export const CommuneAddress = "0x3C997b7aE60A93D63C0faA227bfd016bA966c328"; // bsc
// export const ArbitrumCommuneAddress = "0x0BfB12808cd32f7a5d2F361B808e70c46723Fb98"; // Arbitrum
// export const TronCommuneAddress = "TRdTWXScDF71jBMeTHT9svgFEoEVh493V1"; // tron
export const HOST = 'unishopcoins.com'
//正式版
export const CommuneAddress = "0x48835A9065AF7315916ADfc1f952b7aBebdBFd62"; // bsc
export const ArbitrumCommuneAddress = "0xcbC9eBa8DbDad08a491E5105Fe288E4e960AA012"; // Arbitrum
export const TronCommuneAddress = "TDkAHzrrwedbn6qa3QTqaWmeXAMGERkH7X"; // tron

export const Erc20UsdtAddress = "0x55d398326f99059ff775485246999027b3197955"; // todo 写死

//公社详情
//BSC:
// export const  erc20tokenAddress = "0xAaAaC1846734e0Edc24F74c4a7F2385F1D79EAe5";
// export const  buyAddress = '0x0878294A6a1a7D189dE8C15bA29774DE861F1548'
// export const  stakeAddress = '0xCac28157713da4ccaDac983163379Ac9D5bc3D8C'


// UNISHOPCOINS 测试币
export const erc20tokenAddress=(chianType,erc20Type='UNISHOP')=>{
    if(erc20Type === 'UNISHOP'){
        switch (chianType) {
            case 'BSC':
                return '0xaaAaAaaa6d080446bA8E298d025c01117C049cF1'
            case 'ETH': // arbitrum
                return '0xaaAaAaaa6d080446bA8E298d025c01117C049cF1'
            default:   // tron
                return "TKyRze6giJsBdMeqigydQm18rvQbPZSrAg"
        }
    }

    switch (chianType) {
        case 'BSC':
            return '0xAaAaC1846734e0Edc24F74c4a7F2385F1D79EAe5'
        case 'ETH': // arbitrum
            return '0xAaAaC1846734e0Edc24F74c4a7F2385F1D79EAe5'
        default:   // tron
            return "TP8BLTLjWnnM2v1c3JSeR72FAG1PfBhFkJ"
    }
}

// // UNISHOP 正式币
// export const UnishopErc20tokenAddress=(chianType,erc20Type='UNISHOP')=>{
//     switch (chianType) {
//         case 'BSC':
//             return '0xe02a29c6f78007b155708a0D2643e905ef8Dc481'
//         case 'ETH': // arbitrum
//             return '0xe02a29c6f78007b155708a0D2643e905ef8Dc481'
//         default:   // tron
//             return ""
//     }
// }


export const buyAddress=(chianType,erc20Type='UNISHOP')=>{
    if(erc20Type === 'UNISHOP'){
        switch (chianType) {
            case 'BSC':
                return '0x6742025ad3ebe6f252de70a80af28b184e8adc08'
            case 'ETH': // arbitrum
                return '0x491fda2291dc5b462b83a2923aaebbd9874b1203'
            default:   // tron
                // return "TALUGyUYdUbUFF7R88ZwLbBejrqzGz6RHB" //1 trx小数位版
                return "TV3ZK32tcxvwrtLt5n2qPPju6gPXwExUm2"    //1 trx小数位fix版
        }
    }
    switch (chianType) {
        case 'BSC':
            return '0x0878294A6a1a7D189dE8C15bA29774DE861F1548'
        case 'ETH': // arbitrum
            return '0x95e0091ab10ecb292f802ef911a28cf218e663cd'
        default:    // tron
            return "TUGSrkMWkmDKUdPF34nVuhZLUPyH6swpyG"
    }
}
// old a address ，first
export const oldStakeAddress = (chianType,) => {
    switch (chianType) {
        case 'BSC':
            return '0x5ad206787ad642af8f43db7867f66c980ff9a379'
        case 'ETH': // arbitrum
            return '0x5Dd5510334FE9bB4ACE396D4a9c8607AA27B06f4'
        default:   // tron
            return "TWXvEMwd7Wfx2mAuE3LtvBCbWfSJHxGpkV"
    }
}

export const stakeAddress=(chianType,erc20Type='UNISHOP')=>{
    if(erc20Type === 'UNISHOP'){
        switch (chianType) {
            case 'BSC':
                return '0x9e55ece6f19709cf634b7ee07e0c40070ec2d6bb'//0x5ad206787ad642af8f43db7867f66c980ff9a379
            case 'ETH': // arbitrum
                return '0x5Dd5510334FE9bB4ACE396D4a9c8607AA27B06f4'
            default:   // tron
                return "TWXvEMwd7Wfx2mAuE3LtvBCbWfSJHxGpkV"
        }
    }
    switch (chianType) {
        case 'BSC':
            return '0xCac28157713da4ccaDac983163379Ac9D5bc3D8C'
        case 'ETH': // arbitrum
            return '0xfdc194f96c312ae4176e3e372f758535874c0809'
        default:    // tron
            return "TTdsm4Rbb4ZHPzCfissf9hGv7dnGpDvrSv"
    }
}

export const receiveAddress = (chianType)=>{

    switch (chianType) {
        case 'BSC':
            return '0x12519b21a727b647a631a9f8ad07401185877ac3'
        case 'ETH': // arbitrum
            return '0x0765a2faf9a9a58994ce490fffb4b0f7a2943fd5'
        default:   // tron
            return "TBtm8bp422shRRGWXquGuKAvWBV23Vcnxg" //need more test
    }

}

export const receiveUAddress = (chianType)=>{

    switch (chianType) {
        case 'BSC':
            return '0xb1b5d954e10129f6a85adbed008676de51e28ec3'
        case 'ETH': // arbitrum
            return '0xb1b5d954e10129f6a85adbed008676de51e28ec3'
        default:   // tron
            return "0xb1b5d954e10129f6a85adbed008676de51e28ec3" //need more test
    }

}


// 申请链商链
export const applyChainAddress = (chianType) => {
    switch (chianType) {
        case "BSC":
            return "0xBceF2955C8955342E9CC92A090bDaEcFF8c562F8";
            //0xd0dc899fa3a48af484f03085e8874ddd352215ca factory
        case "ETH": // arbitrum
            return "0xD7EF2c1f428FD8E7d00119722c77F9c750F2a600";
            //0xeBE07D1e37296ce741b34F45878Eec7D8c8fb7c4 factory
        default:
            // tronTM9Exfw7eRJPZZcQc3kj2EavUpdzWPG8RH
            return "TBueAoryBRW2LfQJ7MoVvB85cshRhcbqME"; //
            //TYE5TfFLDajb7YSdcXiveVdWSTJPjLQ1PX factory
    }
};


//商品链
export const productChainAddress = (chianType) => {
    console.log('productChainAddress prod called',chianType);
    return "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
};

export const productChainHelperAddress = (chianType) => {
    return productChainAddress(chianType);
};

//  权限
export const authorityAddress = (chianType) => {
    return productChainAddress(chianType);
};

//  U换USDT的交易合约
export const uMarkerAddress = (chianType) => {
    switch (chianType) {
        case "BSC":
            // return "0xc0e8D30D2ead2C324b3f1A8386992Ba1Be534CbF";
            return "0x99a9bbC8Bc0D3164Dc774617e94fF2c1D6A138Fa"; //买卖价格分开版
        case "ETH": // arbitrum
            // return "0x1Dfaa319944Eb24cc46d1778c42f639dA2C651f5";
            return "0x687BDfc9c39B0BAf8bD84E319D667FD41643ec05";        //fix小数
        default:
            //U: TCoDNsSM8aML4tqYHQPECDbb5E4hZRdizw
            //usdt:TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
            return "TD3xRzbykxutbbpeaoCE6dokekED5vXXZL";
    }
};

// unishop to U and fullback
export const unishop2UAddress =(chianType)=>{
    switch (chianType) {
        case "BSC":
            // return "0x022A98c7f49654e2f4bcDB46a8460c76dB954215";
            // return "0x8ff258a3facc53dc0d352b480971f911357dbd98";    //10times
            return "0x04AF1113D03138Adb87EE750480384A60B2d8466";    //fix withdraw U
        case "ETH": // arbitrum
            // return "0x1Dfaa319944Eb24cc46d1778c42f639dA2C651f5";
            return "0x022A98c7f49654e2f4bcDB46a8460c76dB954215";        //fix小数
        default:
            return "";
    }
}
