<script setup lang="ts">
const technologyList = ["Vue 3", "Pinia", "Vuetify", "TypeScript"];
</script>

<template>
  <v-footer absolute app color="footerBg">
    <v-container class="pa-1">
      <div class="text-center mb-1">
        <v-btn
          target="_blank"
          prepend-icon="mdi-github"
          variant="text"
          href="https://github.com/JelbyDev/currency_converter"
        >
          Currency converter
        </v-btn>
      </div>

      <div class="d-flex justify-center flex-wrap">
        <div
          v-for="(technology, index) in technologyList"
          :key="index"
          class="pa-1"
        >
          {{ technology }}
        </div>
      </div>

      <div class="text-center mt-3">© 2023</div>
    </v-container>
  </v-footer>
</template>
