import { Engine, Order } from '../Engine/engine';
import { LimitOrderType, EngineInitParams } from '../Engine/types';
import { sleep } from '../Engine/utils';

export default class TinyBot extends Engine
{
 buyOrder: Order | null
 sellOrder: Order | null

  constructor(params: EngineInitParams) {
    super(params);
    this.buyOrder = null
    this.sellOrder = null
  }

  async buy(): Promise<void> {
    
    const BTCprice = await this.getPrice();
    const purchasePrice = BTCprice - 5.0
    const purchaseQTY = 10.5 / purchasePrice
    
    this.buyOrder = await this.limitOrder({
      orderType: LimitOrderType.Buy,
      quantity: purchaseQTY,
      price: purchasePrice
  })

    if (!this.buyOrder) return

    while (await this.buyOrder.shouldTick()) 
    {
      await sleep(1000)
      await this.buyOrder.updateStatus()
      await this.buyOrder.printStatus()

      if (await this.buyOrder.isFilled()) break

      if (await this.buyOrder.isTimedOut(10.0)) {
        console.log("Timed Out !")
        await this.buyOrder.cancel()
        this.buyOrder = null
        break
      } 
    }

  }
  // purchase at current price 
  // try to purchase for 5 dollar less than current price
  // than sell for  
  async start(): Promise<void> {
    
    while (!this.buyOrder)
    {
      await this.buy()
    }

    console.log("Start buy loop Finished...")
    
  }


 
 

}
