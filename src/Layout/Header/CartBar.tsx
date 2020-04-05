import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { cartOperations, cartSelectors } from '../../state/ducks/cart';
import { numberWithCommas } from '../../utils';
import CartOverLayCartItem from './CartOverLayCartItem';
import { useHandleFetch } from '../../hooks';

interface Props {
  handleToggleCartBar: () => void;
  isShowCartBar: boolean;
  cartItems?: any[];
  isAuthenticated: boolean;
  history: any;
  handleModalShow?: () => void;
  removeFromCart?: (object) => void;
  totalPrice?: number;
  changeQuantity?: (object, number) => void;
  addProductsToCart?: (any) => void;
}

const CartBar = ({
  handleToggleCartBar,
  isShowCartBar,
  cartItems,
  totalPrice,
  history,
  isAuthenticated,
  handleModalShow,
  removeFromCart,
  changeQuantity,
  addProductsToCart,
}: Props) => {
  const [getCart, handlegetCartFetch] = useHandleFetch([], 'getCart');

  useEffect(() => {
    const getAndSetToCart = async () => {
      const getCartRes = await handlegetCartFetch({});
      // @ts-ignore
      if (getCartRes && getCartRes.length > 0) {
        // @ts-ignore
        const cartItems = getCartRes.map((cartItem) => {
          return {
            product: {
              name: cartItem['name'],
              cover: cartItem['cover'],
              price:
                cartItem['offerPrice'] && parseInt(cartItem['offerPrice'])
                  ? parseInt(cartItem['offerPrice'])
                  : parseInt(cartItem['regularPrice']),
              id: cartItem['id'],
              url: cartItem['url'],
            },
            quantity: cartItem.quantity,
          };
        });

        addProductsToCart && addProductsToCart(cartItems);
      }
    };
    getAndSetToCart();
  }, []);
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
            cartItems.map((cartItem) => {
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
              onClick={(e) => {
                e.preventDefault();

                if (isAuthenticated) {
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

const mapStateToProps = (state) => ({
  cartItems: state.cart,
  totalPrice: cartSelectors.getTotalPriceOfCartItems(state.cart),
});

const mapDispatchToProps = {
  removeFromCart: cartOperations.removeFromCart,
  changeQuantity: cartOperations.changeQuantity,
  addProductsToCart: cartOperations.addProductsToCart,
};

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(CartBar));
