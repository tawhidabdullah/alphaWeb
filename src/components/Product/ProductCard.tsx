import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { cartOperations } from '../../state/ducks/cart';
import { numberWithCommas, checkIfItemExistsInCartItemById } from '../../utils';

interface Props {
  product: any;
  AddCartContent?: () => void;
  history: any;
  addToCart?: (object, number) => void;
  cartItems?: any;
  alert?: any;
}

const ProductCard = ({
  product,
  history,
  alert,
  cartItems,
  addToCart
}: Props) => {
  const {
    name,
    regularPrice,
    cover,
    url,
    id,
    offerPrice,
    description
  } = product;

  const handleOnClickAddToCart = () => {
    const product = {
      name,
      description,
      cover,
      price: offerPrice && parseInt(offerPrice) ? offerPrice : regularPrice,
      id,
      url
    };

    addToCart && addToCart(product, 1);

    if (addToCart && checkIfItemExistsInCartItemById(cartItems, id)) {
      alert.success('Product Has Been Removed From the Cart');
    } else {
      alert.success('Product Added To The Cart');
    }
  };

  return (
    <div className='product-card'>
      <div className='product-top'>
        <img src={cover} alt='product img' />
        <div
          className='product-top-overlay'
          onClick={() => history.push(url)}
        ></div>

        <div className='overlay-right'>
          <Link to={url} className='product__link'>
            <button
              type='button'
              className='btn btn-secondary'
              title='Quick Shop'
            >
              <i className='fa fa-eye'></i>
            </button>
          </Link>
          <button
            type='button'
            className='btn btn-secondary'
            title='Add To Cart'
            onClick={handleOnClickAddToCart}
          >
            <i className='fa fa-shopping-cart'></i>
          </button>
        </div>
      </div>

      <div className='product-bottom text-center'>
        <div className='cart-btn' onClick={handleOnClickAddToCart}>
          <button className='primary-btn'>
            {(checkIfItemExistsInCartItemById(cartItems, id) && 'Added') ||
              'Add to Cart'}
          </button>
        </div>

        <div className='ratingsandtitle'>
          <h3 className='product-bottom-title'>{name}</h3>
        </div>
        <h5 className='product-bottom-price'>
          ৳{numberWithCommas(offerPrice ? offerPrice : regularPrice)}
        </h5>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cartItems: state.cart
});

const mapDispatchToProps = {
  addToCart: cartOperations.addToCart
};

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(withAlert()(ProductCard)));
