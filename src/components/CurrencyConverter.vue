<script setup lang="ts">
import { ref, toRefs, computed } from "vue";
import { useCurrencyStore } from "@/stores/currency";

const { currenciesTickers } = toRefs(useCurrencyStore());
const { convertedPriceToRUB, formattedPrice } = useCurrencyStore();

const fromCurrencyTicker = ref<string>(currenciesTickers.value[0]);
const fromCurrencyValue = ref<number>(1);

const toCurrencyTicker = ref<string>(currenciesTickers.value[0]);
const toCurrencyValue = computed(() => {
  if (!fromCurrencyTicker.value || !toCurrencyTicker.value) return 0;

  return formattedPrice(
    convertedPriceToRUB(toCurrencyTicker.value, fromCurrencyValue.value) /
      convertedPriceToRUB(fromCurrencyTicker.value)
  );
});

function onSwapCurrencyTickers() {
  [fromCurrencyTicker.value, toCurrencyTicker.value] = [
    toCurrencyTicker.value,
    fromCurrencyTicker.value,
  ];
}
</script>

<template>
  <div>
    <ui-page-title>Конвертер валют</ui-page-title>
    <v-row class="align-center">
      <v-col cols="5">
        <v-select
          v-model="fromCurrencyTicker"
          label="У меня есть:"
          :items="currenciesTickers"
          variant="underlined"
        ></v-select>

        <v-text-field
          v-model="fromCurrencyValue"
          variant="outlined"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="2" class="text-center">
        <ui-swapping-btn @click="onSwapCurrencyTickers"></ui-swapping-btn>
      </v-col>

      <v-col cols="5">
        <v-select
          v-model="toCurrencyTicker"
          label="Получу взамен:"
          :items="currenciesTickers"
          variant="underlined"
        ></v-select>

        <v-text-field
          v-model="toCurrencyValue"
          disabled
          variant="outlined"
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
