<template>
  <dl class="text-sm font-normal text-[#333] flex justify-between">
    <dt><slot name="leftText" /></dt>
    <dd class="text-base font-bold text-[#333]">
      <slot name="rightText" />
      <span class="text-[12px]">
        <slot name="uint" />
      </span>
    </dd>
  </dl>
</template>
