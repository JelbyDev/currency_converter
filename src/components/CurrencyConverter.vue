<script setup lang="ts">
import { toRefs } from "vue";
import { useCurrencyStore } from "@/stores/currency";

const { currencies } = toRefs(useCurrencyStore());
const { initConverterCurrency } = useCurrencyStore();

const {
  fromCurrency,
  toCurrency,
  fromCurrencyValue,
  toCurrencyValue,
  toggleReverseCurrencyExchange,
} = toRefs(initConverterCurrency(currencies.value[0], currencies.value[0]));
</script>

<template>
  <div>
    <ui-page-title>Конвертер валют</ui-page-title>
    <v-row class="align-center">
      <v-col cols="5">
        <v-select
          v-model="fromCurrency"
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
          v-model="toCurrency"
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
