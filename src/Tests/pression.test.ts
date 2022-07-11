import test from 'ava'
import { Engine } from '../engine'

test.beforeEach(() => {})

test.serial('engine creation', async (t) => {

    const engine = new Engine({
      symbols: {
        first: 'BTC',
        second: 'ETH',
      },
      pressions: {
        quantity: 5,
        price: 10,
      },
    })


  t.pass()
})
