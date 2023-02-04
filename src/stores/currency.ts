import { ref, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { getCurrencies } from "@/api/Currency";
import type { CurrencyItem } from "@/types";

export const useCurrencyStore = defineStore("currency", () => {
  const MAIN_CURRENCY = {
    Name: "Российский рубль",
    CharCode: "RUB",
    Value: 1,
  };
  const NUMBER_DIGITS_WHEN_FORMATTED = 4;

  const currencies = ref<CurrencyItem[]>([]);
  const searchQuery = ref<string>("");
  const isLoadingCurrencies = ref<boolean>(true);

  const foundCurrencies = computed<CurrencyItem[]>(() => {
    if (!searchQuery.value) return currencies.value;

    function isFound(currency: CurrencyItem) {
      return (
        currency.CharCode.toLowerCase().includes(
          searchQuery.value.toLowerCase()
        ) ||
        currency.Name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }

    return currencies.value.filter((currency) => isFound(currency));
  });

  async function loadCurrencies(): Promise<void> {
    const response = await getCurrencies();
    if (typeof response === "object") {
      currencies.value = Object.values(response).sort((a, b) =>
        a.CharCode.localeCompare(b.CharCode)
      );
      isLoadingCurrencies.value = false;
    }
  }

  function convertFromMainCurrency(
    currency: CurrencyItem,
    quantity = 1
  ): number {
    if (currency.CharCode === MAIN_CURRENCY.CharCode) return quantity;
    return formatValue((1 / currency.Value) * quantity);
  }

  function convertAnyCurrency(
    toCurrency: CurrencyItem,
    fromCurrency: CurrencyItem,
    quantity = 1
  ): number {
    if (toCurrency.CharCode === fromCurrency.CharCode) return quantity;

    return formatValue((fromCurrency.Value / toCurrency.Value) * quantity);
  }

  function formatValue(price: number): number {
    const formattedValue =
      price % 1
        ? price.toFixed(NUMBER_DIGITS_WHEN_FORMATTED)
        : price.toFixed(0);
    return Number(formattedValue);
  }

  onMounted(() => {
    loadCurrencies();
  });

  return {
    MAIN_CURRENCY,
    isLoadingCurrencies,
    searchQuery,
    currencies,
    foundCurrencies,
    convertAnyCurrency,
    convertFromMainCurrency,
    formatValue,
  };
});
