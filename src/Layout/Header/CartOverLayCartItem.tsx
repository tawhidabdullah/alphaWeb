import React from 'react';
import { numberWithCommas } from '../../utils';

interface Props {
  cartItem: any;
  handleToggleCartBar: () => void;
  history: any;
  removeFromCart: (object) => void;
  changeQuantity: (object, number) => void;
}

const CartOverLayCartItem = ({
  cartItem,
  handleToggleCartBar,
  history,
  removeFromCart,
  changeQuantity
}: Props) => {
  let { product, quantity } = cartItem;
  const { url, cover, name, price, id } = product;
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

  return (
    <div className='cart-item' key={id}>
      <img
        onClick={() => {
          handleToggleCartBar();
          history.push(url);
        }}
        src={cover}
        alt='productImg'
        style={{
          cursor: 'pointer'
        }}
      />
      <div>
        <h4
          style={{
            lineHeight: 1.5
          }}
          onClick={() => {
            handleToggleCartBar();
            history.push(url);
          }}
        >
          {name}
        </h4>
        <h5>৳{numberWithCommas(price)}</h5>
        <span className='remove-item' onClick={() => removeFromCart(product)}>
          <i
            className='fa fa-trash'
            style={{
              marginRight: '5px',
              color: '#6b21ac'
            }}
          ></i>
          remove
        </span>
      </div>
      <div>
        <i
          className='fa fa-chevron-up'
          onClick={() => {
            handleChangeQuantity('plus');
          }}
        ></i>
        <p className='item-amount'>{quantity}</p>
        <i
          className='fa fa-chevron-down'
          onClick={() => {
            handleChangeQuantity('minus');
          }}
        ></i>
      </div>
    </div>
  );
};

// @ts-ignore
export default CartOverLayCartItem;
