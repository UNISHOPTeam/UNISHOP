// var CryptoJS = require("crypto-js");
// link https://blog.csdn.net/vieri_32/article/details/48345023
import CryptoJS from 'crypto-js'

// var key ="fc60b0be16b5841b9471d48a6da624f0";
// var iv = "bf09b92be284b4ea"; // 16字节 
export function encrypt(text,iv,key){
    console.log('text,iv,key: ', text,iv,key);
    return CryptoJS.AES.encrypt(text,CryptoJS.enc.Utf8.parse(key),{
        iv:CryptoJS.enc.Utf8.parse(iv),
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7
    })
}

export function decrypt(text,iv,key){
    console.log('text,iv,key: ', text,iv,key);
    var result = CryptoJS.AES.decrypt(text,CryptoJS.enc.Utf8.parse(key),{
        iv:CryptoJS.enc.Utf8.parse(iv),
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7
    })
    return result.toString(CryptoJS.enc.Utf8)
}

// var text="ni你好hao";
// var encoded=encrypt(text)
// console.log(encoded.toString());
// console.log(decrypt(encoded))