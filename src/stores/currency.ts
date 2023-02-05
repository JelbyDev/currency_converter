import { ref, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { getCurrencies } from "@/api/Currency";
import type { CurrencyItem } from "@/types";

export const useCurrencyStore = defineStore("currency", () => {
  const MAIN_CURRENCY = {
    CharCode: "RUB",
    ID: "CUSTOM",
    Name: "Российский рубль",
    Nominal: 1,
    NumCode: "643",
    Previous: 1,
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

  function initConverterCurrency(
    fromCurrencyArg: CurrencyItem,
    toCurrencyArg: CurrencyItem
  ) {
    const fromCurrency = ref<CurrencyItem>(fromCurrencyArg);
    const toCurrency = ref<CurrencyItem>(toCurrencyArg);

    const fromCurrencyValue = ref<number>(1);
    const toCurrencyValue = computed<number>(() => {
      if (!fromCurrency.value || !toCurrency.value) return 0;

      return convertCurrency(
        toCurrency.value,
        fromCurrency.value,
        fromCurrencyValue.value
      );
    });

    const amountChangedValue = computed<number>(() => {
      const difference = fromCurrencyArg.Value - fromCurrencyArg.Previous;
      const isReversed = fromCurrencyArg.CharCode === toCurrency.value.CharCode;

      return formatValue(isReversed ? -difference : difference);
    });

    function toggleReverseCurrencyExchange(): void {
      [fromCurrency.value, toCurrency.value] = [
        toCurrency.value,
        fromCurrency.value,
      ];
    }

    return {
      fromCurrency,
      toCurrency,
      fromCurrencyValue,
      toCurrencyValue,
      toggleReverseCurrencyExchange,
      amountChangedValue,
    };
  }

  function convertCurrency(
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
    currencies,
    searchQuery,
    foundCurrencies,
    initConverterCurrency,
  };
});
