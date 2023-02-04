<script setup lang="ts">
defineProps<{
  leftColSize: string | number;
  middleColSize: string | number;
  ringColSize: string | number;
}>();
</script>

<template>
  <v-row class="align-center">
    <v-col :cols="leftColSize">
      <slot name="leftCol"></slot>
    </v-col>

    <v-col :cols="middleColSize" class="text-center">
      <slot name="middleCol"></slot>
    </v-col>

    <v-col :cols="ringColSize">
      <slot name="rightCol"></slot>
    </v-col>
  </v-row>
</template>
