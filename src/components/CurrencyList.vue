<script setup lang="ts">
import { ref, toRefs, computed } from "vue";
import { useCurrencyStore } from "@/stores/currency";
import type { CurrencyItem } from "@/types";

const { currenciesArr } = toRefs(useCurrencyStore());
const { MAIN_CURRENCY, formattedPrice } = useCurrencyStore();

const searchQuery = ref<string>("");
const swappedTickers = ref(new Map());

const searchedCurrencies = computed<CurrencyItem[]>(() => {
  if (!searchQuery.value) return currenciesArr.value;

  return currenciesArr.value.filter((currency) => {
    if (
      currency.CharCode.toLowerCase().includes(
        searchQuery.value.toLowerCase()
      ) ||
      currency.Name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
      return true;
  });
});

function toggleSwapCurrency(ticker: string) {
  if (isSwappedCurrency(ticker)) {
    swappedTickers.value.delete(ticker);
  } else {
    swappedTickers.value.set(ticker, 1);
  }
}

function isSwappedCurrency(ticker: string) {
  return swappedTickers.value.has(ticker);
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

    <div class="mt-10">
      <div v-if="searchedCurrencies.length">
        <div v-for="currency in searchedCurrencies" :key="currency.CharCode">
          <v-row class="align-center justify-space-between">
            <v-col cols="auto">
              <v-row class="align-center">
                <v-col cols="auto">
                  <div class="text-5 mb-1">
                    {{
                      isSwappedCurrency(currency.CharCode)
                        ? currency.CharCode
                        : MAIN_CURRENCY.CharCode
                    }}
                  </div>
                  <div class="text-h6">1</div>
                </v-col>

                <v-col cols="auto" class="text-center">
                  <ui-swapping-btn
                    @click="toggleSwapCurrency(currency.CharCode)"
                  ></ui-swapping-btn>
                </v-col>

                <v-col cols="auto">
                  <div class="text-5 mb-1">
                    {{
                      isSwappedCurrency(currency.CharCode)
                        ? MAIN_CURRENCY.CharCode
                        : currency.CharCode
                    }}
                  </div>
                  <div class="text-h6">
                    {{
                      isSwappedCurrency(currency.CharCode)
                        ? formattedPrice(1 / currency.Value)
                        : currency.Value
                    }}
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="auto">
              <v-sheet
                class="px-4 py-2"
                :color="currency.Previous > currency.Value ? 'red' : 'green'"
              >
                {{ formattedPrice(currency.Value - currency.Previous) }}
                <v-icon
                  class="ml-4"
                  :icon="
                    currency.Previous > currency.Value
                      ? 'mdi-arrow-down'
                      : 'mdi-arrow-up'
                  "
                ></v-icon>
              </v-sheet>
            </v-col>
          </v-row>
        </div>
      </div>
      <div v-else>Список валют пуст</div>
    </div>
  </div>
</template>
