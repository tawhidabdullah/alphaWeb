import React from 'react';
import CartOverLayCartItem from './CartOverLayCartItem';

interface Props {
  handleToggleCartBar: () => void;
  isShowCartBar: boolean;
  cartItems?: any[];
  totalPrice?: number;
  isAuthenticate?: boolean;
  history: any;
  handleModalShow: () => void;
}

const CartBar = ({
  handleToggleCartBar,
  isShowCartBar,
  cartItems,
  totalPrice,
  history,
  isAuthenticate,
  handleModalShow
}: Props) => {
  return (
    <div className={isShowCartBar ? 'show-cart-bar' : ''}>
      <div
        onClick={handleToggleCartBar}
        className={isShowCartBar ? 'cart-overlay ' : ''}
      ></div>
      <div className={isShowCartBar ? 'cart showCart' : 'cart'}>
        <span className='close-cart' onClick={handleToggleCartBar}>
          <i className='fa fa-window-close'></i>
        </span>

        <div className='cart-content'>
          {(cartItems &&
            cartItems.length &&
            cartItems.map(cartItem => {
              return (
                <React.Fragment key={cartItem._id}>
                  <CartOverLayCartItem />
                </React.Fragment>
              );
            })) || (
            <div className='cart-footer'>
              <button
                className='clear-cart banner-btn'
                onClick={handleToggleCartBar}
              >
                Add Products
              </button>
            </div>
          )}
        </div>
        {cartItems && cartItems.length > 0 && (
          <div className='cart-footer'>
            <div className='cart-total'>
              <h3>Your total :</h3>
              <span>৳{totalPrice}</span>
            </div>
            <button
              className='clear-cart banner-btn'
              onClick={() => {
                handleToggleCartBar();
                history.push('/cart');
              }}
            >
              View Cart
            </button>
            <button
              className='clear-cart banner-btn'
              onClick={e => {
                e.preventDefault();

                if (isAuthenticate) {
                  handleToggleCartBar();
                  history.push('/checkout');
                } else {
                  handleToggleCartBar();
                  handleModalShow();
                }
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartBar;
