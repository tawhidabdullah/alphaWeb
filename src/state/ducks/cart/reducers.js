import * as types from './types';
import * as utils from './utils';
import { createReducer } from '../../utils';

/* State shape
[
    {
        product,
        quantity,
    }
]
*/

const initialState = [];

const cartReducer = createReducer(initialState)({
  [types.TOGGLE]: (state, action) => {
    const { product, quantity, isSelectedForCheckout } = action.payload;
    const index = utils.productPositionInCart(state, product);
    if (index === -1) {
      return [utils.newCartItem(product, quantity, isSelectedForCheckout), ...state];
    }

    const tempArrayWithOutOldProduct = state.filter(item => item.product.id !== product.id);

    return tempArrayWithOutOldProduct;
  },

  [types.ADD_PRODUCTS_TO_CART]: (state, action) => {
    const { products } = action.payload;

    if (products.length > 0) {
      const uniqueProductsOfCart = products.filter(function(product) {
        return state.indexOf(product) == -1;
      });
      return uniqueProductsOfCart;
    } else {
      return [...state];
    }
  },

  [types.SELECT_PRODUCT_FOR_CHECKOUT]: (state, action) => {
    const { product } = action.payload;

    const index = utils.productPositionInCart(state, product.product);
    if (index === -1) {
      return [...state, { ...product, isSelectedForCheckout: true }];
    } else if (index !== -1 && !product.isSelectedForCheckout) {
      const tempArrayWithOutOldProduct = state.filter(
        item => item.product.id !== product.product.id
      );

      return [...tempArrayWithOutOldProduct, { ...product, isSelectedForCheckout: true }];
    }

    const tempArrayWithOutOldProduct = state.filter(item => item.product.id !== product.product.id);

    return [...tempArrayWithOutOldProduct, { ...product, isSelectedForCheckout: false }];
  },

  [types.CHANGE_QUANTITY]: (state, action) => {
    const { product, quantity } = action.payload;
    const index = utils.productPositionInCart(state, product);

    const updatedItem = Object.assign({}, state[index], { quantity });
    return [...state.slice(0, index), updatedItem, ...state.slice(index + 1)];
  },
  [types.REMOVE]: (state, action) => {
    const { product } = action.payload;
    const index = utils.productPositionInCart(state, product);
    return [...state.slice(0, index), ...state.slice(index + 1)];
  },
  [types.CLEAR]: () => [],
});

export default cartReducer;
