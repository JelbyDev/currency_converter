<script setup lang="ts">
import { ref, toRefs } from "vue";
import { useCurrencyStore } from "@/stores/currency";
import CurrencyListItem from "@/components/CurrencyListItem.vue";

const { searchQuery, foundCurrencies } = toRefs(useCurrencyStore());

const reversedCurrencyExchangeTickers = ref(new Map());
function toggleReverseCurrencyExchange(ticker: string) {
  if (isReversedCurrencyExchange(ticker)) {
    reversedCurrencyExchangeTickers.value.delete(ticker);
  } else {
    reversedCurrencyExchangeTickers.value.set(ticker, 1);
  }
}

function isReversedCurrencyExchange(ticker: string): boolean {
  return reversedCurrencyExchangeTickers.value.has(ticker);
}
</script>

<template>
  <div>
    <ui-page-title>Список валют валют</ui-page-title>
    <div>
      <v-text-field
        v-model="searchQuery"
        label="Поиск валюты"
        variant="outlined"
        placeholder="Доллар, USD, usd..."
        hide-details
        autofocus
      ></v-text-field>
    </div>

    <div class="mt-7">
      <div v-if="foundCurrencies.length">
        <div class="currency-list d-flex flex-wrap">
          <CurrencyListItem
            v-for="currency in foundCurrencies"
            :key="currency.CharCode"
            class="w-100"
            :currency="currency"
            :is-reversed="isReversedCurrencyExchange(currency.CharCode)"
            @reverse="toggleReverseCurrencyExchange"
          ></CurrencyListItem>
        </div>
      </div>
      <div v-else>Список валют пуст</div>
    </div>
  </div>
</template>

<style scoped>
.currency-list {
  gap: 1.2rem;
}
</style>
