import { Balance, Ticker } from './Types/common'
import { LimitOrderType, LimitOrderInput } from './Types/order'
import { EnginePressions, EngineSymbols, EngineInitParams, EngineResponse } from './Types/engine'

import { handlePression } from './Utils/utils'
import { logger } from './Utils/logger'
import { BotError } from './Utils/errors'
import { APIKEY, APISECRET } from './env'
import { Order } from './order'

const Binance = require('node-binance-api')

const binance = new Binance().options({
  APIKEY,
  APISECRET,
})

export class Engine {
  symbol: string
  symbols: EngineSymbols
  pressions: EnginePressions

  constructor(params: EngineInitParams) {
    this.symbol = params.symbols.first + params.symbols.second
    this.symbols = params.symbols
    this.pressions = params.pressions
  }

  pression(_qty: number, _price: number): EnginePressions {
    return {
      quantity: handlePression(_qty, this.pressions.quantity),
      price: handlePression(_price, this.pressions.price),
    }
  }

  async minBuyQty(price: number): Promise<number> {
    return 10 / price
  }

  async maxBuyQty(price: number, bal: number): Promise<number> {
    return bal / price
  }

  async balance(symbol: string): Promise<EngineResponse> {
    try {
      const data = await binance.balance()
      const target = data[symbol]
      return {
        success: true,
        data: {
          symbol: symbol,
          available: parseFloat(target.available),
          onOrder: parseFloat(target.onOrder),
        },
      }
    } catch (e: any) {
      return {
        success: false,
        error: e instanceof BotError ? e : new BotError(404, { detail: e.message }),
      }
    }
  }

  async getPrice(): Promise<EngineResponse> {
    try {
      const data = await binance.prices(this.symbol)
      return {
        success: true,
        data: parseFloat(data[this.symbol]),
      }
    } catch (e: any) {
      return {
        success: false,
        error: e instanceof BotError ? e : new BotError(404, { detail: e.message }),
      }
    }
  }

  async getTickers(): Promise<EngineResponse> {
    try {
      const data = await binance.bookTickers(this.symbol)
      return {
        success: true,
        data: { symbol: data.symbol, bidPrice: parseFloat(data.bidPrice), bidQty: parseFloat(data.bidQty), askPrice: parseFloat(data.askPrice), askQty: parseFloat(data.askQty) },
      }
    } catch (e: any) {
      return {
        success: false,
        error: e instanceof BotError ? e : new BotError(404, { detail: e.message }),
      }
    }
  }

  async limitOrder(input: LimitOrderInput): Promise<EngineResponse> {
    const { quantity, price } = this.pression(input.quantity, input.price)

    logger(`Trying to ${input.orderType}: ${this.symbol} qty ${quantity} price ${price} `)

    if (quantity <= 0) throw new BotError(1001)
    if (price <= 0) throw new BotError(1002)

    try {
      let order

      switch (input.orderType) {
        case LimitOrderType.Buy: {
          const data = await binance.buy(this.symbol, quantity, price)
          order = new Order(this.symbol, data)
          break
        }
        case LimitOrderType.Sell: {
          const data = await binance.sell(this.symbol, quantity, price)
          order = new Order(this.symbol, data)
          break
        }
        default: {
          throw new BotError(1000, {
            recivedType: `Unknown order type: ${input.orderType}`,
          })
        }
      }

      return {
        success: true,
        data: order,
      }
    } catch (e: any) {
      return {
        success: false,
        error: e instanceof BotError ? e : new BotError(404, { detail: e.message }),
      }
    }
  }
}
