import React, { useState, useLayoutEffect, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useHandleFetch } from '../../hooks';

// import productlisting components
import SideFilterBar from './SideFilterBar';
import Products from './Products';

interface Props {
  match: any;
  location: any;
}

const ProductList = (props: Props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const [productListState, handleProductListFetch] = useHandleFetch(
    [],
    'productList'
  );

  const [categoryListState, handleCategoryListFetch] = useHandleFetch(
    [],
    'categoryList'
  );

  const [categoryProductsState, handleCategoryProductsFetch] = useHandleFetch(
    [],
    'categoryProducts'
  );

  const id = props.match.params.id;

  const getWindowWidth = () => {
    return Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
  };

  useLayoutEffect(() => {
    setWindowWidth(getWindowWidth());
  }, []);

  const onResize = () => {
    window.requestAnimationFrame(() => {
      setWindowWidth(getWindowWidth());
    });
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const getProducts = async () => {
    const products = await handleProductListFetch({});
    // @ts-ignore
    setProducts(products);
  };

  const getCategoryProducts = async categoryId => {
    const products = await handleCategoryProductsFetch({
      urlOptions: {
        placeHolders: {
          id: categoryId
        }
      }
    });
    // @ts-ignore
    setProducts(products);
  };

  const getCategories = async () => {
    // @ts-ignore
    const categories: any[] = await handleCategoryListFetch({});

    const category = {
      name: 'All Categories',
      id: 'all',
      [`isAll Categories}`]: id ? false : true
    };

    const tempCategories = categories.map((cat, index) => {
      return {
        ...cat,
        name: cat.name,
        id: cat._id,
        [`is${cat.name}`]: false
      };
    });

    return [category, ...tempCategories];
  };

  React.useEffect(() => {
    const doMagic = async () => {
      let cat = [];
      if (!(categories && categories.length > 0)) {
        // @ts-ignore
        cat = await getCategories();
        setCategories(cat);
      }

      if (id === 'all') {
        getProducts();
      } else {
        if (props.location.state && props.location.state.tagId) {
        } else {
          if (id) {
            let categoryId = id;
            getCategoryProducts(categoryId);
          }
        }
      }
    };

    doMagic();
  }, [id]);

  const handleSelectCategory = () => {};

  return (
    <>
      <div className='Bcak-bg'>
        <div
          className={`${windowWidth < 1000 ? 'container-fluid' : 'container'}`}
          style={{
            paddingTop: `${windowWidth < 1000 ? '15px' : '0'}`
          }}
        >
          <div className='row'>
            <SideFilterBar
              handleSelectCategory={handleSelectCategory}
              categories={categories}
            />
            <div className='col-sm-8 col-md-9'>
              <Products products={products} isLoading={isLoading} />

              <div className='notFoundProduct'>
                <h3
                  className='notFoundProductText'
                  onClick={() => getCategories()}
                >
                  No Product Has Been Found!!
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ProductList);
