export interface Balance {
  symbol: string;
  available: number;
  onOrder: number;
}

export interface Ticker {
  symbol: string;
  bidPrice: number;
  bidQty: number;
  askPrice: number;
  askQty: number;
}

