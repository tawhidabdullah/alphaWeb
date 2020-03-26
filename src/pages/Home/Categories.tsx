import React from 'react';
import { useFetch } from '../../hooks';
import { CategoryCard } from '../../components/Category';

interface Props {}

const Categories = (props: Props) => {
  const categoryState = useFetch([], [], 'categoryList');
  return (
    <div className='categoryContainer'>
      {categoryState.data.length > 0 &&
        categoryState.data.map(category => {
          return (
            <React.Fragment key={category.id}>
              <CategoryCard category={category} />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default Categories;
