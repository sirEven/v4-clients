'''Example for trading with human readable numbers

Usage: python -m examples.composite_example
'''
import asyncio
import logging
from random import randrange
from v4_client_py.chain.aerial.wallet import LocalWallet
from v4_client_py.clients import CompositeClient, Subaccount
from v4_client_py.clients.constants import BECH32_PREFIX, Network

from v4_client_py.clients.helpers.chain_helpers import (
    ORDER_FLAGS_LONG_TERM,
    OrderType, 
    OrderSide, 
    OrderTimeInForce, 
    OrderExecution,
)

from tests.constants import DYDX_TEST_MNEMONIC, MAX_CLIENT_ID


async def main() -> None:
    wallet = LocalWallet.from_mnemonic(DYDX_TEST_MNEMONIC, BECH32_PREFIX)
    network = Network.staging()
    client = CompositeClient(
        network,
    )
    subaccount = Subaccount(wallet, 0)

    # place a long term order.
    long_term_order_client_id = randrange(0, MAX_CLIENT_ID)
    try:
        tx = client.place_order(
            subaccount,
            market='ETH-USD',
            type=OrderType.LIMIT,
            side=OrderSide.SELL,
            price=40000,
            size=0.01,
            client_id=long_term_order_client_id,
            time_in_force=OrderTimeInForce.GTT,
            good_til_block=0, # long term orders use GTBT
            good_til_time_in_seconds=60,
            execution=OrderExecution.DEFAULT,
            post_only=False,
            reduce_only=False
        )
        print('** Long Term Order Tx**')
        print(tx.tx_hash)
    except Exception as error:
        print('**Long Term Order Failed**')
        print(str(error))

    # cancel a long term order.
    try:
        tx = client.cancel_order(
            subaccount,
            long_term_order_client_id,
            'ETH-USD',
            ORDER_FLAGS_LONG_TERM,
            good_til_time_in_seconds=120,
            good_til_block=0, # long term orders use GTBT
        )
        print('**Cancel Long Term Order Tx**')
        print(tx.tx_hash)
    except Exception as error:
        print('**Cancel Long Term Order Failed**')
        print(str(error))

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    asyncio.get_event_loop().run_until_complete(main())