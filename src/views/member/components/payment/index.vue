<template>
  <div>
    <!-- PC 端支付 -->
    <pc-payment-vue v-if="!isMobileTerminal" />
  </div>
</template>

<script setup>
  import { isMobileTerminal } from '@/utils/flexible'
  import pcPaymentVue from './pc-payment/index.vue'
</script>
