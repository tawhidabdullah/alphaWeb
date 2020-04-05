import React, { useState, useLayoutEffect, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useHandleFetch } from '../../hooks';
import { SubCategoryCard } from '../../components/Category';
import { cacheOperations } from '../../state/ducks/cache';
import { brandOperations } from '../../state/ducks/brand';
import { checkIfItemExistsInCache } from '../../utils';

// import productlisting components
import SideFilterBar from './SideFilterBar';
import Products from './Products';

interface Props {
  match: any;
  location: any;
  history: any;
  category: any;
  cache: any;
  addItemToCache: (any) => void;
  tag: any;
  addBrand: (any) => void;
  brand: any;
}

const ProductList = ({
  match,
  location,
  history,
  category,
  cache,
  addItemToCache,
  tag,
  addBrand,
  brand,
}: Props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [brands, setBrands] = useState([]);
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

  const [tagListState, handleTagListFetch] = useHandleFetch([], 'tagList');

  const [brandListState, handleBrandListFetch] = useHandleFetch(
    [],
    'brandList'
  );

  const [categoryProductsState, handleCategoryProductsFetch] = useHandleFetch(
    [],
    'categoryProducts'
  );

  const [tagProductsState, handleTagProductsFetch] = useHandleFetch(
    [],
    'tagProducts'
  );

  const [brandProductsState, handleBrandProductsFetch] = useHandleFetch(
    [],
    'brandProducts'
  );

  const id = match.params.id;

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
    setIsLoading(true);

    if (checkIfItemExistsInCache(`product`, cache)) {
      const products = cache[`product`];
      // @ts-ignore
      setProducts(products);
      setIsLoading(false);
    } else {
      const products = await handleProductListFetch({});

      addItemToCache({
        [`product`]: products,
      });
      // @ts-ignore
      setProducts(products);
      setIsLoading(false);
    }
  };

  const setCategoryProducts = async (categoryId) => {
    setIsLoading(true);

    if (checkIfItemExistsInCache(`categoryProducts/${categoryId}`, cache)) {
      const products = cache[`categoryProducts/${categoryId}`];
      // @ts-ignore
      setProducts(products);
      setIsLoading(false);
    } else {
      const products = await handleCategoryProductsFetch({
        urlOptions: {
          placeHolders: {
            id: categoryId,
          },
        },
      });

      addItemToCache({
        [`categoryProducts/${categoryId}`]: products,
      });
      // @ts-ignore
      setProducts(products);
      setIsLoading(false);
    }
  };

  const setTagProducts = async (tagId) => {
    setIsLoading(true);

    if (checkIfItemExistsInCache(`tagProducts/${tagId}`, cache)) {
      const products = cache[`tagProducts/${tagId}`];
      // @ts-ignore
      setProducts(products);
      setIsLoading(false);
    } else {
      const products = await handleTagProductsFetch({
        urlOptions: {
          placeHolders: {
            id: tagId,
          },
        },
      });

      addItemToCache({
        [`tagProducts/${tagId}`]: products,
      });
      // @ts-ignore
      setProducts(products);
      setIsLoading(false);
    }
  };

  const setBrandProducts = async (brandId) => {
    setIsLoading(true);

    if (checkIfItemExistsInCache(`brandProducts/${brandId}`, cache)) {
      const products = cache[`brandProducts/${brandId}`];
      // @ts-ignore
      setProducts(products);
      setIsLoading(false);
    } else {
      const products = await handleTagProductsFetch({
        urlOptions: {
          placeHolders: {
            id: brandId,
          },
        },
      });

      addItemToCache({
        [`brandProducts/${brandId}`]: products,
      });
      // @ts-ignore
      setProducts(products);
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    let categories = [];

    if (category.length > 0) {
      categories = category;
    } else {
      // @ts-ignore
      categories = await handleCategoryListFetch({
        urlOptions: {
          params: {
            isSubCategory: true,
          },
        },
      });
    }

    const categoryItem = {
      name: 'All Categories',
      id: 'all',
      [`isall`]: id ? false : true,
    };

    const tempCategories =
      (categories.length > 0 &&
        categories.map((cat: object) => {
          return {
            ...cat,
            [`is${cat['id']}`]: false,
          };
        })) ||
      [];

    return [categoryItem, ...tempCategories];
  };

  const getTags = async () => {
    let tags = [];
    if (tag.length > 0) {
      tags = tag;
    } else {
      // @ts-ignore
      tags = await handleTagListFetch({});
    }

    const tagItem = {
      name: 'All Tags',
      id: 'all',
      [`isall`]: id ? false : true,
    };

    const tempTags =
      (tags.length > 0 &&
        tags.map((tagItem: object) => {
          return {
            ...tagItem,
            [`is${tagItem['id']}`]: false,
          };
        })) ||
      [];

    return [tagItem, ...tempTags];
  };

  const getBrands = async () => {
    let brands = [];

    if (brand.length > 0) {
      brands = brand;
    } else {
      // @ts-ignore
      brands = await handleBrandListFetch({});
      if (brands) {
        addBrand(brands);
      }
    }

    const brandItem = {
      name: 'All Brands',
      id: 'all',
      [`isall`]: id ? false : true,
    };

    const tempBrands =
      (brands.length > 0 &&
        brands.map((brandItem: object) => {
          return {
            ...brandItem,
            [`is${brandItem['id']}`]: false,
          };
        })) ||
      [];

    return [brandItem, ...tempBrands];
  };

  React.useEffect(() => {
    const doMagic = async () => {
      setIsLoading(true);
      let cat = [];

      if (!(categories && categories.length > 0)) {
        // fetch and set the categories is they haven't been seted yet
        // @ts-ignore
        cat = await getCategories();
        setCategories(cat);
      }

      let t = [];
      if (!(tags && tags.length > 0)) {
        // fetch and set the tags is they haven't been seted yet

        // @ts-ignore
        t = await getTags();
        setTags(t);
      }

      let b = [];
      if (!(brands && brands.length > 0)) {
        // fetch and set the brands is they haven't been seted yet

        // @ts-ignore
        b = await getBrands();
        setBrands(b);
      }
      if (id === 'all') {
        // if the id is all get all the products
        getProducts();
      } else if (location.state && location.state.isCategory) {
        // find the products by a category
        if (id) {
          let categoryId = id;

          // if the user is selecting the category for the first time
          // then set the select category to active category
          if (cat && cat.length > 0) {
            const newCategories = [...cat];
            let subCategories = [];
            newCategories.forEach((cat) => {
              if (cat['id'] === categoryId) {
                // @ts-ignore
                cat[`is${cat['id']}`] = true;
                // @ts-ignore

                if (cat['subCategory'] && cat['subCategory'].length > 0) {
                  subCategories = cat['subCategory'];
                }
                // @ts-ignore
              } else cat[`is${cat['id']}`] = false;
            });

            setCategories(newCategories);
            setSubcategories(subCategories);
          }

          setCategoryProducts(categoryId);
        }
      } else if (location.state && location.state.isTag) {
        // find the products by tag
        if (id) {
          let tagId = id;

          // if the user is selecting the category for the first time
          // then set the select category to active category
          if (t && t.length > 0) {
            const newTags = [...t];

            newTags.forEach((tag) => {
              if (tag['id'] === tagId) {
                // @ts-ignore
                tag[`is${tag['id']}`] = true;
                // @ts-ignore
              } else tag[`is${tag['id']}`] = false;
            });

            setTags(newTags);
          }

          setTagProducts(tagId);
        }
      } else if (location.state && location.state.isBrand) {
        // find the products by a brand
        if (id) {
          let brandId = id;

          // if the user is selecting the brand for the first time
          // then set the select brand to active brand
          if (b && b.length > 0) {
            const newBrands = [...b];

            newBrands.forEach((brand) => {
              if (brand['id'] === brandId) {
                // @ts-ignore
                brand[`is${brand['id']}`] = true;
                // @ts-ignore
              } else brand[`is${brand['id']}`] = false;
            });

            setBrands(newBrands);
          }

          setBrandProducts(brandId);
        }
      } else {
        setIsLoading(false);

        return 'The magic ends here';
      }
    };

    doMagic();
  }, [id]);

  const setUiSelectItemDeactive = (type: string) => {
    if (type === 'category') {
      if (categories.length > 0) {
        const newCategories = categories.map((cat: object) => {
          return {
            ...cat,
            [`is${cat['id']}`]: false,
          };
        });

        // @ts-ignore
        setCategories(newCategories);
      }
    } else if (type === 'tag') {
      if (tags.length > 0) {
        const newTags = tags.map((tag: object) => {
          return {
            ...tag,
            [`is${tag['id']}`]: false,
          };
        });

        // @ts-ignore
        setTags(newTags);
      }
    } else if (type === 'brand') {
      if (brands.length > 0) {
        const newBrands = brands.map((brand: object) => {
          return {
            ...brand,
            [`is${brand['id']}`]: false,
          };
        });

        // @ts-ignore
        setBrands(newBrands);
      }
    }
  };

  const handleUiSelectSubCategory = (subCatId: string) => {
    const newSubCategories = [...subcategories];
    newSubCategories &&
      newSubCategories.forEach((subCat) => {
        if (subCat['id'] === subCatId) {
          // @ts-ignore
          subCat[`is${subCat['id']}`] = true;
        } else {
          // @ts-ignore
          subCat[`is${subCat['id']}`] = false;
        }
      });

    setSubcategories(newSubCategories);
  };

  const setUiSelectItemActive = (type: string, id: string) => {
    if (type === 'category') {
      if (categories.length > 0) {
        const categoryId = id;
        const newCategories = [...categories];
        let subCategories = [];

        newCategories.forEach((cat) => {
          if (cat['id'] === categoryId) {
            // @ts-ignore
            cat[`is${cat['id']}`] = true;
            // @ts-ignore
            if (cat['subCategory'] && cat['subCategory'].length > 0) {
              subCategories = cat['subCategory'];
            }
            // @ts-ignore
          } else cat[`is${cat['id']}`] = false;
        });
        setCategories(newCategories);
        setSubcategories(subCategories);
      }
      setUiSelectItemDeactive('tag');
      setUiSelectItemDeactive('brand');
    } else if (type === 'tag') {
      if (tags.length > 0) {
        const tagId = id;
        const tempTags = [...tags];
        tempTags &&
          tempTags.forEach((tag) => {
            if (tag['id'] === tagId) {
              // @ts-ignore
              tag[`is${tag['id']}`] = true;
              // @ts-ignore
            } else tag[`is${tag['id']}`] = false;
          });
        setTags(tempTags);
      }
      setSubcategories([]);
      setUiSelectItemDeactive('category');
      setUiSelectItemDeactive('brand');
    } else if (type === 'brand') {
      if (brands.length > 0) {
        const brandId = id;
        const tempBrands = [...brands];
        tempBrands &&
          tempBrands.forEach((brand) => {
            if (brand['id'] === brandId) {
              // @ts-ignore
              brand[`is${brand['id']}`] = true;
              // @ts-ignore
            } else brand[`is${brand['id']}`] = false;
          });

        setBrands(tempBrands);
      }
      setSubcategories([]);
      setUiSelectItemDeactive('category');
      setUiSelectItemDeactive('tag');
    }
  };

  const handleSelectCategory = (categoryId) => {
    history.push({
      pathname: `/productList/${categoryId}`,
      state: { isCategory: true },
    });
    setUiSelectItemActive('category', categoryId);
  };

  const handleSelectTag = (tagId) => {
    history.push({
      pathname: `/productList/${tagId}`,
      state: { isTag: true },
    });
    setUiSelectItemActive('tag', tagId);
  };

  const handleSelectBrand = (brandId) => {
    history.push({
      pathname: `/productList/${brandId}`,
      state: { isBrand: true },
    });

    setUiSelectItemActive('brand', brandId);
  };

  return (
    <>
      <div className='Bcak-bg'>
        <div
          className={`${windowWidth < 1000 ? 'container-fluid' : 'container'}`}
          style={{
            paddingTop: `${windowWidth < 1000 ? '15px' : '0'}`,
          }}
        >
          <div className='row'>
            <SideFilterBar
              handleSelectCategory={handleSelectCategory}
              categories={categories}
              handleSelectTag={handleSelectTag}
              tags={tags}
              handleSelectBrand={handleSelectBrand}
              brands={brands}
              windowWidth={windowWidth}
              history={history}
            />
            <div className='col-sm-8 col-md-9'>
              <div className='row productListingSubCategooryContainer'>
                {!isLoading &&
                  subcategories.length > 0 &&
                  subcategories.map((subCat) => {
                    return (
                      <SubCategoryCard
                        subCat={subCat}
                        history={history}
                        handleUiSelectSubCategory={handleUiSelectSubCategory}
                      />
                    );
                  })}
              </div>
              <Products products={products} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  addItemToCache: cacheOperations.addItemToCache,
  addBrand: brandOperations.addBrand,
};

const mapStateToProps = (state) => ({
  category: state.category,
  cache: state.cache,
  tag: state.tag,
  brand: state.brand,
});

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(ProductList));
