import { Engine, Order } from '../Engine/engine';
import { LimitOrderType, EngineInitParams } from '../Engine/types';

export default class SplitterBot extends Engine
{
 orders: Order[] 

  constructor(params: EngineInitParams) {
    super(params);
    this.orders = []
  }
  
  async place_splitted_orders(orderType: LimitOrderType, targetPrice: number, orderCount: number) {
    const usdBalance = await this.balance(this.symbols.first);
    const qty_per_order = usdBalance.available / orderCount

    console.log(`Orders qty: ${qty_per_order}`)

    for (let i = 0; i < orderCount; i++) 
    {
      const order = await this.limitOrder({
        orderType: orderType,
        quantity: qty_per_order,
        price: targetPrice,
      })

      if (!order) continue;
      
      this.orders.push(order)
    }
  }

  async printAllOrders() {
    const currentPrice = await this.getPrice()
    
    this.orders.forEach(async(order) => {
        
      const status = await order.updateStatus()

        if (!status) return

        console.log(order.data.status)
        
        console.log("CurrentPrice: " + currentPrice + " -> OrderPrice: " + parseFloat(order.data.price))
    });

  }

}