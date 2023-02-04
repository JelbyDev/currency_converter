import { ref, onMounted, shallowReactive } from "vue";
import { defineStore } from "pinia";
import { getCurrencies } from "@/api/Currency";
import type { CurrenciesFromApi, CurrencyItem } from "@/types";

// Вынести RUB в конфиг
// Вынести toFixed в конфиг
// Вынести путь до JSON в конфиг

export const useCurrencyStore = defineStore("currency", () => {
  const isLoadingCurrencies = ref<boolean>(true);
  const currencies = shallowReactive<CurrenciesFromApi>({});
  const currenciesTickers = ref<string[]>([]);
  const currenciesArr = ref<CurrencyItem[]>([]);
  const MAIN_CURRENCY = {
    CharCode: "RUB",
    Value: 1,
  };

  async function loadCurrencies() {
    const response = await getCurrencies();
    if (typeof response === "object") {
      Object.assign(currencies, response);
      currenciesTickers.value = Object.keys(response).sort((a, b) =>
        a.localeCompare(b)
      );
      currenciesArr.value = Object.values(response).sort((a, b) =>
        a.CharCode.localeCompare(b.CharCode)
      );
      isLoadingCurrencies.value = false;
    }
  }

  function convertedPriceToRUB(ticker: string, value = 1): number {
    if (ticker === MAIN_CURRENCY.CharCode) return value;

    const currencyDetails = currencies[ticker];
    if (!currencyDetails) {
      alert(`Не нашел информации по валюте ${ticker}`);
      return 0;
    }

    return (1 / currencyDetails.Value) * value;
  }

  function formattedPrice(price: number): number {
    const returnPrice = price % 1 ? price.toFixed(4) : price.toFixed(0);
    return Number(returnPrice);
  }

  onMounted(() => {
    loadCurrencies();
  });

  return {
    MAIN_CURRENCY,
    currencies,
    currenciesTickers,
    currenciesArr,
    isLoadingCurrencies,
    convertedPriceToRUB,
    formattedPrice,
  };
});
