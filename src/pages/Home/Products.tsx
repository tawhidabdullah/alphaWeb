// @ts-nocheck

import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { useHandleFetch } from '../../hooks';
import { Spinner } from '../../components/Loading';
import { ProductCard } from '../../components/Product';
import { carouselResponsive } from '../../constants';

// import multi carousel
import 'react-multi-carousel/lib/styles.css';

interface Props {
  windowWidth: number;
  categoryId: string;
}

const Products = ({ windowWidth, categoryId }: Props) => {
  const [categoryProductsState, handleCategoryProductsFetch] = useHandleFetch(
    [],
    'categoryProducts'
  );
  useEffect(() => {
    const getCategoryProducts = async categoryId => {
      await handleCategoryProductsFetch({
        urlOptions: {
          placeHolders: {
            id: categoryId
          }
        }
      });
    };
    if (categoryId) {
      getCategoryProducts(categoryId);
    }
  }, [categoryId]);

  return (
    <>
      <div
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {categoryProductsState.isLoading &&
          !(categoryProductsState.data > 0) && <Spinner />}

        {!categoryProductsState.isLoading &&
          !(categoryProductsState.data.length > 0) && (
            <h2
              style={{
                lineHeight: '200px',
                textAlign: 'center'
              }}
            >
              No Product Has Been Found On This Category
            </h2>
          )}
      </div>

      {windowWidth < 700 ? (
        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap'
            }}
          >
            {categoryProductsState.data.length > 0 &&
              categoryProductsState.data.slice(0, 10).map((product: any) => {
                return (
                  <React.Fragment key={product._id}>
                    {<ProductCard product={product} />}
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      ) : (
        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px 10px'
          }}
        >
          <Carousel responsive={carouselResponsive}>
            {categoryProductsState.data.length > 0 &&
              categoryProductsState.data.slice(0, 10).map(product => {
                return (
                  <React.Fragment key={product._id}>
                    <ProductCard product={product} />
                  </React.Fragment>
                );
              })}
          </Carousel>
        </div>
      )}
    </>
  );
};

export default Products;
