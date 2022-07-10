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

export interface OrderData {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  transactTime: number;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  fills: any;
  stopPrice: string;
  icebergQty: string;
  time: number;
  updateTime: number;
  isWorking: boolean;
  origQuoteOrderQty: string;
}

export interface BinanceError {
  code: number;
  msg: string;
}

export interface EngineSymbols {
  first: string;
  second: string;
}

export interface EnginePressions {
  quantity: number;
  price: number;
}

export interface EngineInitParams {
  symbols: EngineSymbols;
  pressions: EnginePressions,
}

export enum LimitOrderType {
  Sell = "sell",
  Buy = "buy",
}

export enum OrderStatusType {
  NEW,
  PARTIALLY_FILLED,
  FILLED,
  CANCELED,
  PENDING_CANCEL,
  REJECTED,
  EXPIRED,
}

export interface LimitOrderInput {
  orderType: LimitOrderType;
  quantity: number;
  price: number;
}

