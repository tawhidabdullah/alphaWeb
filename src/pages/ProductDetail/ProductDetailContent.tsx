import React from 'react';
import { numberWithCommas } from '../../utils';
import { withRouter } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import { cartOperations } from '../../state/ducks/cart';
import { checkIfItemExistsInCartItemById } from '../../utils';

// import responsive carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-multi-carousel/lib/styles.css';

interface Props {
  product: any;
  history: any;
  addToCart?: (object, number) => void;
  cartItems: any;
  alert: any;
}

const ProductDetailContent = ({
  product,
  history,
  addToCart,
  cartItems,
  alert
}: Props) => {
  const {
    name,
    regularPrice,
    description,
    image,
    offerPrice,
    brand,
    category,
    tags,
    id,
    cover,
    url
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
    <div className='row productDetailInfo'>
      <div className='col-md-6'>
        <Carousel>
          {image &&
            image.length > 0 &&
            image.map(src => {
              return (
                <div
                  style={{
                    maxHeight: '500px'
                  }}
                  key={src}
                >
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                    src={src}
                    alt='Product Img'
                  />
                </div>
              );
            })}
        </Carousel>
      </div>
      <div className='col-md-6'>
        <div className='productInfo__container'>
          <h2 className='productInfo__title'>{name}</h2>

          <div className='productInfo__price'>
            <div className='product-reviews-summary'></div>

            <div className='product-price-box'>
              {offerPrice && parseInt(offerPrice) ? (
                <h2 className='special-price'>
                  ৳{numberWithCommas(offerPrice)}
                </h2>
              ) : (
                ''
              )}
              <h2
                className={
                  offerPrice && !parseInt(offerPrice)
                    ? 'special-price'
                    : 'old-price'
                }
              >
                ৳{numberWithCommas(regularPrice)}
              </h2>
            </div>

            {brand && brand.length > 0 && (
              <div className='attibutes'>
                {brand && brand.length > 0 && 'Brand :'}
                {brand.map(item => (
                  <span key={item.name} className='attibute'>
                    {item.name},
                  </span>
                ))}
              </div>
            )}

            {category && category.length > 0 && (
              <div className='attibutes'>
                {category && category.length > 0 && 'Category :'}
                {category.map(item => (
                  <span
                    key={item.name}
                    className='attibute'
                    onClick={() => {
                      history.push({
                        pathname: `/productList/${item.id}`,
                        state: { isCategory: true }
                      });
                    }}
                  >
                    {item.name},
                  </span>
                ))}
              </div>
            )}

            {tags && tags.length > 0 && (
              <div className='attibutes'>
                {tags && tags.length > 0 && 'Tags :'}
                {tags.map(item => (
                  <span
                    key={item.name}
                    className='attibute'
                    onClick={() => {
                      history.push({
                        pathname: `/productList/${item.id}`,
                        state: { isTag: true }
                      });
                    }}
                  >
                    {item.name},
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className='product-description'>
            <p>{description}</p>
          </div>
          <div className='product-options-bottom'>
            <div className='box-tocart'>
              <div className='actions'>
                <a
                  className='btn-add withbackground'
                  onClick={handleOnClickAddToCart}
                  href='##'
                >
                  {(checkIfItemExistsInCartItemById(cartItems, id) &&
                    'Added') ||
                    'Add to Cart'}
                </a>
              </div>
            </div>
          </div>
        </div>
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
)(withRouter(withAlert()(ProductDetailContent)));
