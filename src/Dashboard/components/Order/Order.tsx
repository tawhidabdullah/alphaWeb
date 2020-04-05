import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import SmallItem from '../../../components/SmallItem';
import { numberWithCommas } from '../../../utils';
import Moment from 'react-moment';
import { Table } from 'react-bootstrap';
import { useFetch } from '../../../hooks';

const Order = (props) => {
  const orderListState = useFetch([], [], 'getCurrentUserOrders');

  console.log('orderListState', orderListState);
  return (
    <div className='order'>
      <div
        className='block-title ordertitle'
        style={{
          marginBottom: '20px',
        }}
      >
        <span>Orders</span>
      </div>

      {!orderListState.isLoading && orderListState.data.length > 0
        ? orderListState.data.map((order) => {
            return (
              <div className='orderDetailsContainer'>
                <div className='orderDetailItem'>
                  <div className='orderDetailHeader'>
                    <div className='orderDetailHeader_Item'>
                      <h2>Created At</h2>
                      <h3>
                        <Moment format='YYYY/MM/DD'>{order.date}</Moment>
                      </h3>
                    </div>
                    <div className='orderDetailHeader_Item'>
                      <h2>Payment Method</h2>
                      <h3>
                        {order.paymentMethod === 'cod'
                          ? 'Cash On Delivery'
                          : order.paymentMethod}
                      </h3>
                    </div>

                    <div className='orderDetailHeader_Item'>
                      <h2>Status</h2>
                      <h3>{order.status}</h3>
                    </div>

                    {order.total && (
                      <div className='orderDetailHeader_Item'>
                        <h2>Total</h2>
                        <h3>৳{numberWithCommas(order.total)}</h3>
                      </div>
                    )}
                  </div>
                  <div className='orderDetailProducts'>
                    {order.products.length > 0 &&
                      order.products.map((product) => {
                        return (
                          <div className='orderDetailProduct'>
                            <SmallItem
                              productId={product._id}
                              quantity={product.quantity}
                              isOrderDetails={true}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })
        : !orderListState.isLoading && <h2>No Order has been created yet!</h2>}
      {orderListState.isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default Order;
