
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
  
  export enum OrderStatusType {
    NEW,
    PARTIALLY_FILLED,
    FILLED,
    CANCELED,
    PENDING_CANCEL,
    REJECTED,
    EXPIRED,
  }

  export enum LimitOrderType {
    Sell = "sell",
    Buy = "buy",
  }
  
  export interface LimitOrderInput {
    orderType: LimitOrderType;
    quantity: number;
    price: number;
  }
  
  