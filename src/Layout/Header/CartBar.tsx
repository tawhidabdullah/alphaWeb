import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { cartOperations, cartSelectors } from '../../state/ducks/cart';
import { numberWithCommas } from '../../utils';
import CartOverLayCartItem from './CartOverLayCartItem';

interface Props {
  handleToggleCartBar: () => void;
  isShowCartBar: boolean;
  cartItems?: any[];
  isAuthenticate?: boolean;
  history: any;
  handleModalShow?: () => void;
  removeFromCart?: (object) => void;
  totalPrice?: number;
  changeQuantity?: (object, number) => void;
}

const CartBar = ({
  handleToggleCartBar,
  isShowCartBar,
  cartItems,
  totalPrice,
  history,
  isAuthenticate,
  handleModalShow,
  removeFromCart,
  changeQuantity
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
                  <CartOverLayCartItem
                    cartItem={cartItem}
                    handleToggleCartBar={handleToggleCartBar}
                    history={history}
                    // @ts-ignore
                    removeFromCart={removeFromCart}
                    // @ts-ignore
                    changeQuantity={changeQuantity}
                  />
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
              <span>৳{numberWithCommas(totalPrice)}</span>
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
                  handleModalShow && handleModalShow();
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

const mapStateToProps = state => ({
  cartItems: state.cart,
  totalPrice: cartSelectors.getTotalPriceOfCartItems(state.cart)
});

const mapDispatchToProps = {
  removeFromCart: cartOperations.removeFromCart,
  changeQuantity: cartOperations.changeQuantity
};

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(CartBar));
