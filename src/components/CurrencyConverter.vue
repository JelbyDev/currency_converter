<script setup lang="ts">
import { ref, toRefs, computed } from "vue";
import { useCurrencyStore } from "@/stores/currency";
import type { CurrencyItem } from "@/types";

const { currencies } = toRefs(useCurrencyStore());
const { convertAnyCurrency } = useCurrencyStore();

const fromCurrencyTicker = ref<CurrencyItem>(currencies.value[0]);
const toCurrencyTicker = ref<CurrencyItem>(currencies.value[0]);

const fromCurrencyValue = ref<number>(1);
const toCurrencyValue = computed<number>(() => {
  if (!fromCurrencyTicker.value || !toCurrencyTicker.value) return 0;

  return convertAnyCurrency(
    toCurrencyTicker.value,
    fromCurrencyTicker.value,
    fromCurrencyValue.value
  );
});

function toggleReverseCurrencyExchange(): void {
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
          :items="currencies"
          item-title="CharCode"
          :item-value="(item) => item"
          variant="underlined"
        >
        </v-select>

        <v-text-field
          v-model="fromCurrencyValue"
          variant="outlined"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="2" class="text-center">
        <ui-reversing-btn
          @click="toggleReverseCurrencyExchange"
        ></ui-reversing-btn>
      </v-col>

      <v-col cols="5">
        <v-select
          v-model="toCurrencyTicker"
          label="Получу взамен:"
          :items="currencies"
          item-title="CharCode"
          :item-value="(item) => item"
          variant="underlined"
        >
        </v-select>

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
