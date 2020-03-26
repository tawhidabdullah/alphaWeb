import React from 'react';
import { useFetch } from '../../hooks';
import Products from './Products';

interface Props {
  history: any;
  windowWidth: number;
}

const CategoryProducts = ({ history, windowWidth }: Props) => {
  const categoryState = useFetch([], [], 'categoryList');

  return (
    <>
      {categoryState.data.length &&
        categoryState.data.map(({ name, id }) => {
          return (
            <section className='product-slider-section' key={id}>
              <div className='row product-slider-section-heading'>
                <div className='col-md-12'>
                  <div className='block-title'>
                    <span>{name}</span>
                    <div
                      className='seeMore-title-box'
                      onClick={() => history.push(`/productsListing/${id}`)}
                    >
                      <h5 className='seeMore-title'>
                        {`See All "${name}" Products`}
                      </h5>
                      <i className='fa fa-chevron-right'></i>
                    </div>
                  </div>
                </div>
              </div>
              <Products windowWidth={windowWidth} categoryId={id} />
            </section>
          );
        })}
    </>
  );
};

export default CategoryProducts;
