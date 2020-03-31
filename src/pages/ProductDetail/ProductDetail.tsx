import React, { useEffect } from 'react';
import { ProductPlaceholder } from '../../components/Placeholders';
import { useFetch, useHandleFetch } from '../../hooks';
import { Spinner } from '../../components/Loading';
import ProductDetailContent from './ProductDetailContent';

interface Props {
  match: any;
}

const ProductDetail = (props: Props) => {
  const categoryName = props.match.params && props.match.params['categoryName'];
  const productName = props.match.params && props.match.params['productName'];
  const productState = useFetch(
    [categoryName, productName],
    {},
    'productDetail',
    {
      urlOptions: {
        placeHolders: {
          categoryName,
          productName
        }
      }
    }
  );
  const [relatedProductsState, handleRelatedProductsFetch] = useHandleFetch(
    [],
    'categoryProducts'
  );

  useEffect(() => {
    if (productState.data.length > 0) {
      const product = productState.data;
      const categoryId = product.category && product.category[0]._id;
      const setRelatedProducts = async () => {
        await handleRelatedProductsFetch({
          urlOptions: {
            placeHolders: {
              id: categoryId
            }
          }
        });
      };
      setRelatedProducts();
    }
  }, [productState.data]);

  console.log('productState', productState);
  return (
    <>
      {!productState.isLoading && Object.keys(productState.data).length > 0 ? (
        <div className='singleProduct'>
          <div className='container-fluid singleProduct__container'>
            <div className='row'>
              <div className='col-md-9'>
                {
                  // @ts-ignore
                  <>{<ProductDetailContent product={productState.data} />}</>
                }
              </div>
              <div className='col-md-3 '>
                {(!relatedProductsState.isLoading &&
                  relatedProductsState.data && (
                    <div className='relativeProductsContainer'>
                      <div className='small__filterProducts'>
                        <div className='small-products-items'>
                          {(!relatedProductsState.isLoading &&
                            relatedProductsState.data.length > 0 &&
                            relatedProductsState.data.map(item => {
                              // return <SmallItem item={item} />;
                              return <h2>{item.name}</h2>;
                            })) ||
                            (relatedProductsState.isLoading && <Spinner />)}

                          {!relatedProductsState.isLoading &&
                            relatedProductsState.data &&
                            !(relatedProductsState.data.length > 0) && (
                              <div
                                style={{
                                  // marginTop: '200px'
                                  padding: '50px 0 60px 0',
                                  textAlign: 'center'
                                }}
                              >
                                <h2
                                  style={{
                                    lineHeight: 1.6
                                  }}
                                >
                                  No Related Product Found
                                </h2>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  )) ||
                  ''}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Product Not Found</h1>
      )}
      {productState.isLoading && <ProductPlaceholder />}
    </>
  );
};

export default ProductDetail;
