<script setup lang="ts">
import { toRefs, computed } from "vue";
import { useCurrencyStore } from "@/stores/currency";
import type { CurrencyItem } from "@/types";

const { MAIN_CURRENCY, initConverterCurrency } = useCurrencyStore();

const props = defineProps<{
  currency: CurrencyItem;
}>();
const { currency } = toRefs(props);

const {
  fromCurrency,
  toCurrency,
  fromCurrencyValue,
  toCurrencyValue,
  toggleReverseCurrencyExchange,
  amountChangedValue,
} = toRefs(initConverterCurrency(currency.value, MAIN_CURRENCY));

const amountChangedValueIcon = computed<string>(() => {
  return amountChangedValue.value < 0 ? "mdi-arrow-down" : "mdi-arrow-up";
});

const amountChangedValueColor = computed<string>(() => {
  return amountChangedValue.value < 0 ? "red" : "green";
});
</script>

<template>
  <v-row
    no-gutters
    class="currency-item align-center justify-space-between px-5 py-3"
  >
    <v-col cols="12">
      <div class="currency-item__title text-subtitle-1 mb-3 pb-2">
        {{ currency.Name }} ({{ currency.CharCode }})
      </div>
    </v-col>

    <v-col cols="auto">
      <v-row class="align-center">
        <v-col cols="auto">
          <div class="text-5 mb-1">
            {{ fromCurrency.CharCode }}
          </div>
          <div class="text-h6">
            {{ fromCurrencyValue }}
          </div>
        </v-col>

        <v-col cols="auto" class="text-center">
          <ui-reversing-btn
            size="small"
            @click="toggleReverseCurrencyExchange"
          ></ui-reversing-btn>
        </v-col>

        <v-col cols="auto">
          <div class="text-5 mb-1">
            {{ toCurrency.CharCode }}
          </div>
          <div class="text-h6">{{ toCurrencyValue }}</div>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="auto" v-if="amountChangedValue">
      <v-sheet
        class="amount-changed-value d-flex justify-space-between px-4 py-2"
        :color="amountChangedValueColor"
      >
        {{ amountChangedValue }}
        <v-icon class="ml-4" :icon="amountChangedValueIcon"></v-icon>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<style scoped>
.currency-item {
  border: 1px solid #ccc;
  border-radius: 0.8rem;
}
.currency-item__title {
  border-bottom: 1px solid #ccc;
}
.amount-changed-value {
  width: 9rem;
  border-radius: 0.5rem;
}
</style>
