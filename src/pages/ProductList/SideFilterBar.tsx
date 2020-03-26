import React from 'react';

interface Props {
  handleSelectCategory: (catgoryId: string, categoryName: string) => void;
  categories: any[];
}

const SideFilterBar = ({ handleSelectCategory, categories }: Props) => {
  return (
    <div className='col-sm-4 col-md-3 filterbar'>
      <div className='category-block'>
        <div className='product-detail'>
          <h2
            className='category-title'
            style={{
              marginBottom: '10px'
            }}
          >
            Categories
          </h2>
          <ul>
            {categories &&
              categories.map((cat, i) => {
                return (
                  <li key={i}>
                    <span
                      className={
                        cat.name !== 'All Categories'
                          ? `${
                              cat[`is${cat.name}`]
                                ? 'category-text active'
                                : 'category-text'
                            }`
                          : `${
                              cat[`is${cat.name}`]
                                ? 'category-header-all active'
                                : 'category-header-all'
                            }`
                      }
                      onClick={() => {
                        handleSelectCategory(cat.id, cat.name);
                      }}
                    >
                      {cat.name}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideFilterBar;
