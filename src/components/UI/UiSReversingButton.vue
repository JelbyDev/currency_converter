<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "x-small" | "small" | "default" | "large" | "x-large";
  }>(),
  {
    size: "default",
  }
);
</script>

<template>
  <v-btn :size="size" icon="mdi-swap-horizontal"></v-btn>
</template>
