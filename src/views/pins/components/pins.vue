<template>
  <div class="fixed top-0 left-0 w-screen h-screen text-xl z-20">{{ id }}</div>
</template>

<script setup>
  defineProps({
    id: {
      type: String,
      required: true
    }
  })
</script>
