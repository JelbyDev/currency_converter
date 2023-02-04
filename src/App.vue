<script setup lang="ts">
import { ref, toRefs, defineAsyncComponent } from "vue";
import { useCurrencyStore } from "@/stores/currency";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

const { isLoadingCurrencies } = toRefs(useCurrencyStore());

const activeTab = ref<string | null>(null);
const tabs = [
  {
    title: "Конвертер",
    value: "currencyConverter",
    component: defineAsyncComponent(
      () => import("@/components/CurrencyConverter.vue")
    ),
  },
  {
    title: "Список валют",
    value: "currencyList",
    component: defineAsyncComponent(
      () => import("@/components/CurrencyList.vue")
    ),
  },
];
</script>

<template>
  <v-app>
    <TheHeader></TheHeader>

    <v-main>
      <v-container>
        <Teleport to="body">
          <ui-loader :is-loading="isLoadingCurrencies">
            Загрузка списка валют
          </ui-loader>
        </Teleport>

        <v-row v-if="!isLoadingCurrencies" class="mt-10">
          <v-col clos="3">
            <v-tabs v-model="activeTab" direction="vertical" grow>
              <v-tab
                v-for="(tab, index) in tabs"
                :key="index"
                :value="tab.value"
              >
                {{ tab.title }}
              </v-tab>
            </v-tabs>
          </v-col>

          <v-col cols="9">
            <v-window v-model="activeTab">
              <v-window-item
                v-for="(tab, index) in tabs"
                :key="index"
                :value="tab.value"
              >
                <component :is="tab.component"></component>
              </v-window-item>
            </v-window>
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
