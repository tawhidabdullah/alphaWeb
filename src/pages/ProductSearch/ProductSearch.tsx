// @ts-nocheck

import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { useHandleFetch } from '../../hooks';
import Footer from '../../layout/Footer';
import { Spinner } from '../../components/Loading';
import Select from 'react-select';
import { ProductCard } from '../../components/Product';

interface Props {
  location: any;
  history: any;
}

const ProductSearch = ({ location, history }: Props) => {
  let searchCategoryValue = queryString.parse(location.search).searchCategory;
  let queryValue = queryString.parse(location.search).query;

  const [categoryListState, handleCategoryListFetch] = useHandleFetch(
    [],
    'categoryList'
  );

  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [activeCategoryName, setActiveCategoryName] = React.useState('');
  const [selectedValueForSort, setSelectedValueForSort] = React.useState({
    value: 'Relevance',
    label: 'Relevance'
  });

  const [
    selectedCategoryValueForSort,
    setSelectedCategoryValueForSort
  ] = React.useState({
    value: 'all',
    label: 'All Categories'
  });

  const handleSelectCategoryChange = value => {
    setSelectedCategoryValueForSort(value);

    history.push({
      pathname: '/productSearch',
      search: `?searchCategory=${value.value}&query=${queryValue}`
    });
  };

  const handleSelectCategory = id => {
    history.push({
      pathname: '/productSearch',
      search: `?searchCategory=${id}&query=${queryValue}`
    });
  };

  const setSortBySelect = value => {
    setSelectedValueForSort(value);
  };

  const options = [
    { value: 'Relevance', label: 'Relevance' },
    { value: 'priceLowToHigh', label: 'Price -- Low to High' },
    { value: 'priceHighToLow', label: 'Price -- High to Low' },
    { value: 'newestFirst', label: 'Newest First' }
  ];

  const [windowWidth, setWindowWidth] = React.useState(0);

  const getWindowWidth = () => {
    return Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
  };

  React.useLayoutEffect(() => {
    setWindowWidth(getWindowWidth());
  }, []);

  const onResize = () => {
    window.requestAnimationFrame(() => {
      setWindowWidth(getWindowWidth());
    });
  };

  React.useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const [productSearchState, handleProductSearchFetch] = useHandleFetch(
    [],
    'productSearch'
  );

  console.log('productSearchState', productSearchState);

  const getCategories = async () => {
    // @ts-ignore
    const categories: any[] = await handleCategoryListFetch({
      urlOptions: {
        params: {
          isSubCategory: true
        }
      }
    });

    const category = {
      name: 'All Categories',
      id: 'all',
      [`isall`]: searchCategoryValue ? false : true
    };

    const tempCategories =
      (categories.length > 0 &&
        categories.map((cat: object) => {
          return {
            ...cat,
            [`is${cat['id']}`]: false
          };
        })) ||
      [];

    return [category, ...tempCategories];
  };

  React.useEffect(() => {
    const getProducts = async () => {
      let cat = [];
      if (!(categories.length > 0)) {
        // @ts-ignore
        cat = await getCategories();
        setCategories(cat);
      }

      try {
        setIsLoading(true);

        if (cat && cat.length > 0) {
          const categoryId = searchCategoryValue;
          const newCategories = [...cat];
          newCategories.forEach(cat => {
            if (cat['id'] === categoryId) {
              console.log('fuckyou');

              // @ts-ignore
              cat[`is${cat['id']}`] = true;
              // @ts-ignore
              setSelectedCategoryValueForSort({
                value: cat['id'],
                label: cat['name']
              });
              setActiveCategoryName(cat['name']);
              // @ts-ignore
            } else cat[`is${cat['id']}`] = false;
          });

          setCategories(newCategories);
        } else {
          const categoryId = searchCategoryValue;
          const newCategories = [...categories];
          newCategories.forEach(cat => {
            if (cat['id'] === categoryId) {
              // @ts-ignore
              cat[`is${cat['id']}`] = true;
              // @ts-ignore
              setSelectedCategoryValueForSort({
                value: cat['id'],
                label: cat['name']
              });
              setActiveCategoryName(cat['name']);
              // @ts-ignore
            } else cat[`is${cat['id']}`] = false;
          });

          setCategories(newCategories);
        }

        if (selectedValueForSort.value === 'Relevance') {
          const products = await handleProductSearchFetch({
            urlOptions: {
              params: {
                searchCategoryValue,
                queryValue
              }
            }
          });
          // @ts-ignore
          setProducts(products);
          setIsLoading(false);
        } else if (selectedValueForSort.value === 'priceHighToLow') {
          const products = await handleProductSearchFetch({
            urlOptions: {
              params: {
                searchCategoryValue,
                queryValue
              }
            }
          });
          // @ts-ignore
          setProducts(products);
          setIsLoading(false);
        } else if (selectedValueForSort.value === 'priceLowToHigh') {
          const products = await handleProductSearchFetch({
            urlOptions: {
              params: {
                searchCategoryValue,
                queryValue
              }
            }
          });
          // @ts-ignore
          setProducts(products);
          setIsLoading(false);
        } else if (selectedValueForSort.value === 'newestFirst') {
          const products = await handleProductSearchFetch({
            urlOptions: {
              params: {
                searchCategoryValue,
                queryValue
              }
            }
          });
          // @ts-ignore
          setProducts(products);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    queryValue && getProducts();
  }, [queryValue, searchCategoryValue, selectedValueForSort]);

  return (
    <>
      <div
        className={windowWidth < 770 ? 'container-fluid' : 'container'}
        style={{
          padding: windowWidth < 770 ? '15px' : '0 0 20px 0'
        }}
      >
        <div className='row'>
          {windowWidth > 575 ? (
            <div
              className='col-sm-4 col-md-3 productSearchFilterSideBar'
              style={{
                background: '#fff',
                borderRight: '1px solid #eee'
              }}
            >
              <div
                style={{
                  lineHeight: 2.5,
                  paddingLeft: '20px',
                  borderBottom: '1px solid #eee'
                }}
              >
                <h3
                  style={{
                    fontSize: '19px',
                    fontWeight: 500,
                    color: '#17252a'
                  }}
                >
                  Filters
                </h3>
              </div>

              <div className='category-filter'>
                <h2 className='category-filter-title'>Categories</h2>
                <ul>
                  {categories &&
                    categories.length > 0 &&
                    categories.map(cat => {
                      return (
                        <li onClick={() => handleSelectCategory(cat['id'])}>
                          <span
                            className={
                              cat[`is${cat['id']}`]
                                ? 'category-filterText active'
                                : 'category-filterText'
                            }
                          >
                            {cat['name']}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          ) : (
            ''
          )}
          <div className='col-sm-8 col-md-9'>
            {!isLoading && products ? (
              <>
                <div className='showResultHeader'>
                  <h2 className='showResultText'>
                    Showing 1 – {products.length} of {products.length} results
                    for {`"${queryValue || ''}"`}{' '}
                    {activeCategoryName ? `in ${activeCategoryName}` : ''}
                  </h2>

                  <div className='sortBySelectorsContainer'>
                    {windowWidth < 575 ? (
                      <>
                        {categories && categories.length > 0 && (
                          <>
                            <h2 className='sortBySelectorsContainer-title'>
                              Categories
                            </h2>
                            <div className='sortBySelectorsSelects'>
                              <Select
                                value={selectedCategoryValueForSort}
                                onChange={value =>
                                  handleSelectCategoryChange(value)
                                }
                                options={categories.map(cat => ({
                                  value: cat['id'],
                                  label: cat['name']
                                }))}
                              />
                            </div>
                          </>
                        )}{' '}
                      </>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className='sortBySelectorsContainer'>
                    <h2 className='sortBySelectorsContainer-title'>Sort by</h2>
                    <div className='sortBySelectorsSelects'>
                      <Select
                        value={selectedValueForSort}
                        onChange={value => setSortBySelect(value)}
                        defaultValue={{
                          label: 'Relevance',
                          value: 'Relevance'
                        }}
                        options={options}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ''
            )}

            <div
              style={{
                paddingTop: '10px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                alignItems: 'center'
              }}
            >
              {(!isLoading &&
                products &&
                products.length > 0 &&
                products.map(product => {
                  return (
                    <ProductCard product={product} productListing={true} />
                  );
                })) ||
                (isLoading && <Spinner />)}

              {!isLoading && products && !(products.length > 0) ? (
                <div
                  style={{
                    width: '100%',
                    height: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <h2
                    style={{
                      marginBottom: '15px'
                    }}
                  >
                    No Product Has Been Found
                  </h2>
                  <a
                    className='btn btn-outline-secondary'
                    onClick={e => {
                      e.preventDefault();
                      history.push('/');
                    }}
                    href='##'
                  >
                    Go Back To Home Page
                  </a>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withRouter(ProductSearch);
