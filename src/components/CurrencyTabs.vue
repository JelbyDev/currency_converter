<script setup lang="ts">
import { ref, toRefs, defineAsyncComponent } from "vue";
import { useCurrencyStore } from "@/stores/currency";
import DoubleColumnLayout from "@/layouts/DoubleColumnLayout.vue";

const { isLoadingCurrencies } = toRefs(useCurrencyStore());

const activeTab = ref<string | null>(null);
const tabs = [
  {
    title: "Список валют",
    value: "currencyList",
    component: defineAsyncComponent(
      () => import("@/components/CurrencyList.vue")
    ),
  },
  {
    title: "Конвертер",
    value: "currencyConverter",
    component: defineAsyncComponent(
      () => import("@/components/CurrencyConverter.vue")
    ),
  },
];
</script>

<template>
  <div>
    <Teleport to="body">
      <ui-loader :is-loading="isLoadingCurrencies">
        Загрузка списка валют
      </ui-loader>
    </Teleport>

    <DoubleColumnLayout v-if="!isLoadingCurrencies" class="mt-10">
      <template #left>
        <v-tabs v-model="activeTab" direction="vertical" grow>
          <v-tab v-for="(tab, index) in tabs" :key="index" :value="tab.value">
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </template>

      <template #right>
        <v-window v-model="activeTab">
          <v-window-item
            v-for="(tab, index) in tabs"
            :key="index"
            :value="tab.value"
          >
            <component :is="tab.component"></component>
          </v-window-item>
        </v-window>
      </template>
    </DoubleColumnLayout>
  </div>
</template>
