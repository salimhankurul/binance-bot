import Binance from 'node-binance-api'
import { OrderData } from './Types/order'
import { EngineResponse } from './Types/engine'
import { BotError } from './Utils/errors'
import { logger } from './Utils/logger'

import * as dotenv from 'dotenv'
dotenv.config()

const { APIKEY, APISECRET } = process.env

const binance = new Binance().options({
  APIKEY,
  APISECRET,
})

// TODO all functions should return EngineResponse
// TODO all functions should use logger

export class Order {
  symbol: string
  data: OrderData

  constructor(symbol: string, data: OrderData) {
    this.symbol = symbol
    this.data = data
  }

  async shouldTick(): Promise<boolean> {
    switch (this.data.status) {
      case 'CANCELLED':
        return false
      case 'FILLED':
        return false
      case 'PARTIALLY_FILLED':
        return true
      case 'NEW':
        return true
      default:
        return false
      // code block
    }
  }

  async isFilled(): Promise<boolean> {
    return this.data.status === 'FILLED'
  }

  async printStatus(): Promise<void> {
    console.log('orderId:', this.data.orderId)
    console.log('status:', this.data.status)
  }

  async isTimedOut(secods: number): Promise<boolean> {
    const timeLeft = 10 * 1000 - (Date.now() - this.data.time)
    return timeLeft <= 0
  }

  async cancel(): Promise<EngineResponse> {
    logger(`Order::Cancel:: ${this.data.orderId} `)
    try {
      this.data = await binance.cancel(this.symbol, this.data.orderId)
      return {
        success: true,
        data: this.data,
      }
    } catch (e: any) {
      return {
        success: false,
        error: e instanceof BotError ? e : new BotError(404, { detail: e.message }),
      }
    }
  }

  async updateStatus(): Promise<EngineResponse> {
    logger(`Order::updateStatus:: ${this.data.orderId} `)
    try {
      this.data = await binance.orderStatus(this.symbol, this.data.orderId)
      return {
        success: true,
        data: this.data,
      }
    } catch (e: any) {
      return {
        success: false,
        error: e instanceof BotError ? e : new BotError(404, { detail: e.message }),
      }
    }
  }
}
