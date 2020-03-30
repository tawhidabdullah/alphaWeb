import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { numberWithCommas } from '../../utils';

interface Props {
  product: any;
  handleCartAction?: () => void;
  AddCartContent?: () => void;
  history: any;
}

const ProductCard = ({
  product,
  handleCartAction,
  AddCartContent,
  history
}: Props) => {
  const { name, regularPrice, cover, url, offerPrice } = product;

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
            onClick={handleCartAction}
          >
            <i className='fa fa-shopping-cart'></i>
          </button>
        </div>
      </div>

      <div className='product-bottom text-center'>
        <div className='cart-btn' onClick={handleCartAction}>
          <button className='primary-btn'>
            {/* {AddCartContent()}
             */}
            Add to Cart
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

// @ts-ignore
export default withRouter(ProductCard);
