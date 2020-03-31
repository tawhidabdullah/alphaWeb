import React from 'react';
import { numberWithCommas } from '../../utils';

interface Props {
  history: any;
  cartItem: any;
  removeFromCart: (object) => void;
  changeQuantity: (object, number) => void;
}

const CartItem = ({
  history,
  cartItem,
  removeFromCart,
  changeQuantity
}: Props) => {
  let { product, quantity } = cartItem;
  const { url, cover, name, price } = product;

  const handleChangeQuantity = value => {
    if (value === 'minus') {
      if (quantity === 1) {
        return;
      }
      return changeQuantity(product, --quantity);
    } else {
      return changeQuantity(product, ++quantity);
    }
  };

  const handleQuantityChange = e => {};

  return (
    <div className='row align-items-center mb-3'>
      <div
        className='col-12 col-sm-12 col-md-2 text-center'
        style={{
          cursor: 'pointer'
        }}
      >
        <img
          onClick={() => {
            history.push(url);
          }}
          className='img-responsive'
          src={cover}
          style={{ height: '60%', width: '60%' }}
          alt={"cart's product"}
        />
      </div>
      <div className='col-12 text-sm-center col-sm-12 text-md-left col-md-6'>
        <h4
          className='product-name'
          style={{
            color: '#333',
            fontWeight: 700
          }}
        >
          <strong>{name}</strong>
        </h4>
      </div>
      <div className='col-12 col-sm-12 text-sm-center col-md-4 text-md-right row product-quantity-container align-items-center'>
        <div
          className='col-6 col-sm-6 col-md-6 text-md-right'
          style={{ paddingTop: '5px' }}
        >
          <h6>
            <strong>
              {numberWithCommas(price)}৳ <span className='text-muted'>x</span>
            </strong>
          </h6>
        </div>
        <div className='col-4 col-sm-4 col-md-4'>
          <div className='quantity'>
            <input
              onClick={e => {
                handleChangeQuantity('plus');
              }}
              type='button'
              value='+'
              className='plus'
            />
            <input
              onChange={handleQuantityChange}
              type='number'
              step='1'
              max='10'
              min='1'
              value={quantity}
              title='Qty'
              className='qty'
              size={4}
            />
            <input
              onClick={() => {
                handleChangeQuantity('minus');
              }}
              type='button'
              value='-'
              className='minus'
            />
          </div>
        </div>
        <div className='col-2 col-sm-2 col-md-2 text-right'>
          <button
            onClick={() => removeFromCart(product)}
            type='button'
            className='btn btn-outline-danger btn-xs'
          >
            <i className='fa fa-trash' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
