// @ts-nocheck

import React from 'react';
import { Spinner } from '../../components/Loading';
import { ProductCard } from '../../components/Product';

interface Props {
  products: any[];
  isLoading: boolean;
}

const Products = ({ products, isLoading }: Props) => {
  return (
    <div className='row productListingProductsContainer'>
      {(products &&
        products.length > 0 &&
        !isLoading &&
        products.map(product => {
          return (
            <React.Fragment key={product._id}>
              <ProductCard product={product} />
            </React.Fragment>
          );
        })) ||
        (isLoading && <Spinner />)}

      {!isLoading && !(products.length > 0) && (
        <div className='notFoundProduct'>
          <h3 className='notFoundProductText'>No Product Has Been Found!!</h3>
        </div>
      )}
    </div>
  );
};

export default Products;
