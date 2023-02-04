export interface CurrenciesFromApi {
  [index: string]: CurrencyItem;
}

export interface CurrencyItem {
  CharCode: string;
  ID: string;
  Name: string;
  Nominal: number;
  NumCode: string;
  Previous: number;
  Value: number;
}
