import TinyBot from './Bots/TinyBot';
import SplitterBot from './Bots/SplitterBot';

(async () => {
  
  const mybot = new TinyBot({
    symbols: {
      first: 'BTC',
      second: 'BUSD',
    },
    pressions: {
      quantity: 5,
      price: 2,
    }
  });


  const bal1 = await mybot.balance(mybot.symbols.first);
  const bal2 = await mybot.balance(mybot.symbols.second);
  const price = await mybot.getPrice();
  const ticker = await mybot.getTickers();

  console.table(bal1);
  console.table(bal2);
  console.log("price", price);
  console.log("tickers", ticker);

  mybot.start()

  // await mybot.place_splitted_orders(LimitOrderType.Sell,  ticker.askPrice + 0.002, 4)

  // while(true)
  //  {
  //     await mybot.printAllOrders()
  //     await sleep(2000)

  //     console.log(" ")
  //  }
  
 
})();


//const order = await mybot.place_limit_order(
//   Types.LimitOrder.Sell,
//   bal1.available,
//   ticker.bidPrice * 1.1
// );

// if (!order) return;

// console.log(order);


// while (true) {
//   await sleep(1500);

//   let status = await order.updateStatus();

//   if (!status) break;

//   console.table(order.data);

//   status = await order.cancel();

//   if (!status) break;
// }

// let status = await order.updateStatus();

// if (!status) return;

// console.table(order.data);

// status = await order.cancel();

// if (!status) return;

// console.table(order.data);