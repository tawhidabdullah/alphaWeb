import React from 'react';
import { useFetch } from '../../hooks';

interface Props {
  history: any;
}

const SliderLefMenu = ({ history }: Props) => {
  const categoryState = useFetch([], [], 'categoryList');
  return (
    <div className='col-md-2 col-sm-12 image-slider-section-carousel'>
      <ul className='sliderLeft'>
        {categoryState.data.length > 0
          ? categoryState.data.slice(0, 5).map(category => {
              return (
                <li
                  key={category._id}
                  onClick={() =>
                    history.push(`/productsListing/${category._id}`)
                  }
                >
                  <a href='##'>{category.name}</a>
                </li>
              );
            })
          : ''}
      </ul>
    </div>
  );
};

export default SliderLefMenu;
