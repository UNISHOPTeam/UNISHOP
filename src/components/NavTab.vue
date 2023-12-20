
<template>
    <div class="rounded-full flex justify-between items-center px-2 mx-[36px] pa h-[42px] fixed bottom-4 z-50 min-w-[303px]  bg-white boxShadow ">
        <router-link v-for="(item,idx) in routerList" :key="idx"
        :to="item.url"
         class="w-[74px] h-[34px] rounded-full text-sm text-[#999999] font-semibold flex justify-center items-center">
            {{item.title}}
        </router-link>
    </div>
</template>

<script setup>
   const routerList = [
       {
           title:'挖矿',
           url:'/'
       },
       {
           title:'商品',
           url:'/goods'
       }, {
           title:'跨链桥',
           url:'/cross_chain_bridge',
       },
       {
           title:'公链',
           url:'/public_chain'
       },
   ]
</script>

<style>
.boxShadow{
    box-shadow: 0px 5px 9px 1px rgba(0, 0, 0, 0.05);
}
.router-link-active.router-link-exact-active{
 @apply bg-[#F5F7FA] text-black
}
</style>