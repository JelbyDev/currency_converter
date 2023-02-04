import type { CurrenciesFromApi } from "@/types";

export async function getCurrencies(): Promise<CurrenciesFromApi | void> {
  try {
    const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const responseJSON = await response.json();
    return responseJSON.Valute;
  } catch (error) {
    alert("Ошибка при загрузке списка валют");
  }
}
