<script setup lang="ts">
import { toRefs, computed } from "vue";
import { useCurrencyStore } from "@/stores/currency";
import type { CurrencyItem } from "@/types";

const { MAIN_CURRENCY, convertFromMainCurrency, formattedValue } =
  useCurrencyStore();

const props = defineProps<{
  currency: CurrencyItem;
  isReversed: boolean;
}>();
const { currency, isReversed } = toRefs(props);

const emits = defineEmits<{
  (e: "reverse", charCode: string): void;
}>();

const fromCurrencyTitle = computed<string>(() => {
  return isReversed.value ? MAIN_CURRENCY.CharCode : currency.value.CharCode;
});

const toCurrencyTitle = computed<string>(() => {
  return isReversed.value ? currency.value.CharCode : MAIN_CURRENCY.CharCode;
});

const toCurrencyValue = computed<number>(() => {
  return isReversed.value
    ? convertFromMainCurrency(currency.value)
    : currency.value.Value;
});

const amountChangedValue = computed<number>(() => {
  const difference = currency.value.Value - currency.value.Previous;
  return formattedValue(isReversed.value ? -difference : difference);
});

const amountChangedValueIcon = computed<string>(() => {
  return amountChangedValue.value < 0 ? "mdi-arrow-down" : "mdi-arrow-up";
});

const amountChangedValueColor = computed<string>(() => {
  return amountChangedValue.value < 0 ? "red" : "green";
});

function onReverse() {
  emits("reverse", currency.value.CharCode);
}
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
            {{ fromCurrencyTitle }}
          </div>
          <div class="text-h6">1</div>
        </v-col>

        <v-col cols="auto" class="text-center">
          <ui-reversing-btn size="small" @click="onReverse"></ui-reversing-btn>
        </v-col>

        <v-col cols="auto">
          <div class="text-5 mb-1">
            {{ toCurrencyTitle }}
          </div>
          <div class="text-h6">{{ toCurrencyValue }}</div>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="auto">
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
