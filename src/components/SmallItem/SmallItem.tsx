import React, { useState, useEffect } from 'react';
import { numberWithCommas } from '../../utils';
import { withRouter } from 'react-router';
import ContentLoader from 'react-content-loader';
import { useHandleFetch } from '../../hooks';

interface Props {
  isOrderDetails?: boolean;
  productId?: string;
  history?: any;
  productItem?: any;
  quantity?: number;
  isOrder?: boolean;
}

const SmallItem = ({
  isOrderDetails,
  productItem,
  productId,
  history,
  quantity,
  isOrder,
}: Props) => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [productDetailState, handleProductFetch] = useHandleFetch(
    {},
    'productDetailById'
  );

  useEffect(() => {
    if (isOrderDetails) {
      setIsLoading(true);
      const getAndSetProduct = async () => {
        const product = await handleProductFetch({
          urlOptions: {
            placeHolders: {
              id: productId,
            },
          },
        });

        // @ts-ignore
        setProduct(product);
        setIsLoading(false);
      };
      getAndSetProduct();
    }
  }, [isOrderDetails]);

  return isOrderDetails ? (
    (product && Object.keys(product).length > 0 && (
      <div key={product['id']} className='small-product-item'>
        <div
          className='small-product-item-box-img'
          onClick={() => {
            history.push(product['url']);
          }}
        >
          <img
            src={product['cover']}
            className='product photo product-item-photo'
            alt=''
          />
        </div>
        <div className='small-product-info'>
          <h2
            className='small-product-title'
            style={{
              color: '#17252a',
              fontWeight: 700,
            }}
          >
            {product['name']}
          </h2>

          {parseInt(product['offerPrice']) ? (
            <h2
              style={{
                color: '#17252a',
                fontWeight: 500,
              }}
              className='small-product-offerPrice'
            >
              ৳{numberWithCommas(product['offerPrice'])}
            </h2>
          ) : (
            <h2
              style={{
                color: '#17252a',
                fontWeight: 500,
              }}
              className='small-product-offerPrice'
            >
              ৳{numberWithCommas(product['regularPrice'])}
            </h2>
          )}

          <h2
            style={{
              fontWeight: 500,
              color: '#17252a',
            }}
            className='small-product-offerPrice'
          >
            Quantity : {quantity}
          </h2>
        </div>
      </div>
    )) ||
      (isLoading && <ContentLoader />)
  ) : (
    <div key={productItem.id} className='small-product-item'>
      <div
        className='small-product-item-box-img'
        onClick={() => {
          history.push(productItem.url);
        }}
      >
        <img
          src={productItem.cover}
          className='product photo product-item-photo'
          alt=''
        />
      </div>
      <div className='small-product-info'>
        <h2
          className='small-product-title'
          onClick={() => {
            history.push(productItem.url);
          }}
        >
          {productItem.name}
        </h2>
        {!isOrder && parseInt(productItem.offerPrice) ? (
          <h2
            style={{
              color: '#17252a',
              fontWeight: 500,
            }}
            className='small-product-offerPrice'
          >
            ৳{numberWithCommas(productItem.offerPrice)}
          </h2>
        ) : (
          <h2
            style={{
              color: '#17252a',
              fontWeight: 500,
            }}
            className='small-product-offerPrice'
          >
            ৳{numberWithCommas(productItem.price)}
          </h2>
        )}
      </div>
    </div>
  );
};

// @ts-ignore
export default withRouter(SmallItem);
