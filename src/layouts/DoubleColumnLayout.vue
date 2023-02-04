<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <v-app>
    <TheHeader></TheHeader>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="3">
            <slot name="left"></slot>
          </v-col>

          <v-col cols="12" sm="9">
            <slot name="right"></slot>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <TheFooter></TheFooter>
  </v-app>
</template>

<style>
.v-container {
  max-width: 1280px;
}
</style>
