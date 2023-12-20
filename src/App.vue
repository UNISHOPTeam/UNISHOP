
<template>

  <router-view v-slot="{ Component }">
    <keep-alive include="GoodDetailVideo,GoodDetail">
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <!-- <NavTab/>
  <div class=" h-16"></div> -->
</template>
<script>
// import NavTab from './components/NavTab.vue'

export default {
  name: "App",
  // components:{
  //   NavTab
  // },
  setup() { },
  created(){

    // fetch('/alert.json').then(res=>res.json()).then(res=>{
    //   if(res.msg){
    //     this.$dialog.alert({
    //       title: `${res.title}`,
    //       messageAlign:'left',
    //       message: `${res.msg}`,
    //     })
    //   }
    // })
  }
};
</script>
<style>
:root {
  --van-uploader-size: 56px;
  -van-stepper-border-radius: 8px;
  --van-stepper-background-color: #fff;
  --van-stepper-button-icon-color: #1a8cff;
}

.van-stepper {
  border: 1px solid #cce6ff;
  border-radius: 8px;
}

body {
  @apply bg-[#F5F7FA];
}
</style>
