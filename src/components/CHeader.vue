<template>
<div class="bg-[#002866] p-4 rounded-b-xl">
  <van-field class="rounded-xl h-8" v-model="value" center left-icon="search" placeholder="请输入关键词">
    <template #extra>
      <div class="flex items-center">
        <span class="text-gray-300 pr-2">|</span><span>搜索</span>
      </div>
    </template>
  </van-field>
  <slot/>
</div>
</template>
<script setup>
  import { defineProps, defineEmits} from 'vue'
  import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>