import config from '../config.json';
import dataMap from '../dataMap.json';

class Converter {
  /**
   * @public
   * @method categoryList convert api data from API to general format based on config server
   * @param {Object} data response objectc from alpha
   * @returns {Object}  converted data
   */
  async categoryList(resData) {
    const data = resData.data || [];

    const formatedData =
      data.length > 0 &&
      data.map(category => {
        return {
          id: category._id || '',
          name: category.name && category.name,
          description: category.description && category.description,
          cover: `${config['baseURL']}${category.cover.medium}`,
          ...(category.subCategory &&
            category.subCategory.length > 0 && {
              subCategory: category.subCategory.map(subCat => {
                return {
                  id: subCat._id || '',
                  name: subCat.name && subCat.name,
                  description: subCat.description && subCat.description,
                  cover: subCat.cover
                    ? `${config['baseURL']}${subCat.cover.medium}`
                    : ''
                };
              })
            })
        };
      });

    return formatedData;
  }

  /**
   * @public
   * @method categoryProducts convert api data from API to general format based on config server
   * @param {Object} data response objectc from alpha
   * @returns {Object}  converted data
   */
  async categoryProducts(resData) {
    const data = resData.data || [];

    const convertedData =
      data.length > 0 &&
      data.map(product => {
        return {
          id: product._id || '',
          name: product.name && product.name,
          description: product.description && product.description,
          cover: `${config['baseURL']}${product.cover.medium}`,
          regularPrice: product.price && product.price['regular'],
          offerPrice: product.price && product.price['offer'],
          url: product.url
        };
      });

    return convertedData;
  }

  /**
   * @public
   * @method tagProducts convert api data from API to general format based on config server
   * @param {Object} data response objectc from alpha
   * @returns {Object}  converted data
   */
  async tagProducts(resData) {
    const data = resData.data || [];

    const convertedData =
      data.length > 0 &&
      data.map(product => {
        return {
          id: product._id || '',
          name: product.name && product.name,
          description: product.description && product.description,
          cover: `${config['baseURL']}${product.cover.medium}`,
          regularPrice: product.price && product.price['regular'],
          offerPrice: product.price && product.price['offer'],
          url: product.url
        };
      });

    return convertedData;
  }

  /**
   * @public
   * @method brandProducts convert api data from API to general format based on config server
   * @param {Object} data response objectc from alpha
   * @returns {Object}  converted data
   */
  async brandProducts(resData) {
    const data = resData.data || [];

    const convertedData =
      data.length > 0 &&
      data.map(product => {
        return {
          id: product._id || '',
          name: product.name && product.name,
          description: product.description && product.description,
          cover: `${config['baseURL']}${product.cover.medium}`,
          regularPrice: product.price && product.price['regular'],
          offerPrice: product.price && product.price['offer'],
          url: product.url
        };
      });

    return convertedData;
  }

  /**
   * @public
   * @method productSearch convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async productSearch(resData) {
    const data = resData.data || [];

    const convertedData =
      (data.length > 0 &&
        data.map(product => {
          return {
            id: product._id || '',
            name: product.name && product.name,
            description: product.description && product.description,
            cover: `${config['baseURL']}${product.cover.medium}`,
            regularPrice: product.price && product.price['regular'],
            offerPrice: product.price && product.price['offer'],
            url: product.url
          };
        })) ||
      [];

    return convertedData;
  }

  /**
   * @public
   * @method productList convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async productList(resData) {
    const data = resData.data || [];

    const convertedData =
      data.length > 0 &&
      data.map(product => {
        return {
          id: product._id || '',
          name: product.name && product.name,
          description: product.description && product.description,
          cover: `${config['baseURL']}${product.cover.medium}`,
          regularPrice: product.price && product.price['regular'],
          offerPrice: product.price && product.price['offer'],
          url: product.url
        };
      });

    return convertedData;
  }

  /**
   * @public
   * @method tagList convert api data from API to general format based on config server
   * @param {Object} data response objectc from alpha
   * @returns {Object}  converted data
   */
  async tagList(resData) {
    const data = resData.data || [];

    const convertedData =
      data.length > 0 &&
      data.map(tag => {
        return {
          id: tag._id || '',
          name: tag.name && tag.name,
          description: tag.description && tag.description
        };
      });

    return convertedData;
  }

  /**
   * @public
   * @method brandList convert api data from API to general format based on config server
   * @param {Object} data response objectc from alpha
   * @returns {Object}  converted data
   */
  async brandList(resData) {
    const data = resData.data || [];

    const convertedData =
      data.length > 0 &&
      data.map(brand => {
        return {
          id: brand._id || '',
          name: brand.name && brand.name,
          description: brand.description && brand.description
        };
      });

    return convertedData;
  }

  /**
   * @public
   * @method productSearch convert api data from API to general format based on config server
   * @param {Object} data response objectc from alpha
   * @returns {Object}  converted data
   */
  async productDetail(data) {
    const convertedData =
      (Object.keys(data).length > 0 && {
        id: data._id || data.id || '',
        name: data.name || '',
        description: data.description.replace(/<[^>]+>/g, '') || '',
        regularPrice: data.price && data.price['regular'],
        offerPrice: data.price && data.price['offer'],
        url: data.url,
        category:
          (data.category &&
            data.category.length > 0 &&
            data.category.map(cat => {
              return {
                id: cat._id,
                name: cat.name
              };
            })) ||
          data.category,
        brand:
          (data.brand &&
            data.brand.length > 0 &&
            data.brand.map(b => {
              return {
                id: b._id,
                name: b.name
              };
            })) ||
          data.brand,
        tags:
          (data.tags &&
            data.tags.length > 0 &&
            data.tags.map(tag => {
              return {
                id: tag._id,
                name: tag.name
              };
            })) ||
          data.tags,
        availableStock: data.availableStock,
        image:
          (data.image &&
            data.image.length > 0 &&
            data.image.map(img => `${config.baseURL}${img.medium}`)) ||
          []
      }) ||
      {};

    return convertedData;
  }

  /**
   * @public
   * @method categoryList convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async categoryDetail(data) {
    //map props
    let generalFormat = dataMap[config['server']]['categoryDetail']; //get genereal format from dataMap

    const formatedData = {
      ...generalFormat,
      id: data.id || data._id || '',
      name: data.name && data.name,
      description: data.description && data.description,
      productCount: data.count || data.productCount,
      image:
        config['server'] !== 'wooCommerce'
          ? (data.image &&
              data.image.length > 0 &&
              data.image.map(img => `${config.baseURL}${img.medium}`)) ||
            []
          : (data.image && [data.image.src]) || []
    };

    return formatedData;
  }

  /**
   * @public
   * @method createOrder convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async createOrder(data) {
    //map props
    let generalFormat = dataMap[config['server']]['createOrder']; //get genereal format from dataMap

    const formatedData = {
      ...generalFormat,
      id: data.id || data._id || '',
      total: data.total || 0
    };

    return formatedData;
  }

  /**
   * @public
   * @method signup convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async signup(data) {
    //map props
    let generalFormat = dataMap[config['server']]['signup']; //get genereal format from dataMap

    return {
      status: 'ok'
    };
  }

  /**
   * @public
   * @method signin convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async signin(data) {
    //map props
    let generalFormat = dataMap[config['server']]['signin']; //get genereal format from dataMap

    const formatedData = {
      ...generalFormat,
      status: data.status || 'ok',
      cookie: data.cookie,
      user: data.user
    };

    return formatedData;
  }

  /**
   * @public
   * @method getCurrentUserData convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async getCurrentCustomerData(data) {
    //map props
    // let generalFormat = dataMap[config['server']]['getCurrentUserData']; //get genereal format from dataMap

    const formatedData = {
      id: data._id || data.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      created: data.created
    };

    return formatedData;
  }

  /**
   * @public
   * @method currentCustomerData convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async currentCustomerData(data) {
    //map props
    // let generalFormat = dataMap[config['server']]['currentCustomerData']; //get genereal format from dataMap

    const convertedData = {
      ...data
    };

    return convertedData;
  }

  /**
   * @public
   * @method updateCurrentCustomerData convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async updateCurrentCustomerData(data) {
    //map props
    // let generalFormat = dataMap[config['server']]['updateCurrentCustomerData']; //get genereal format from dataMap

    const convertedData = {
      id: data.user._id || data.user.id,
      name: data.user.name,
      phone: data.user.phone,
      email: data.user.email,
      address: data.user.address,
      created: data.user.created
    };

    return convertedData;
  }

  /**
   * @public
   * @method currentUserOrders convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async getCurrentUserOrders(data) {
    //map props
    // let generalFormat = dataMap[config['server']]['currentUserOrders']; //get genereal format from dataMap

    const convertedData =
      (data.length > 0 &&
        data.map(item => {
          return {
            id: item.id || item._id,
            billingAddress: item.billingAddress,
            status: item.status,
            total: item.total,
            products: item.products,
            date_created: item.date
          };
        })) ||
      [];

    return convertedData;
  }

  /**
   * @public
   * @method currentUserOrders convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async currentUserOrders(data) {
    //map props
    let generalFormat = dataMap[config['server']]['currentUserOrders']; //get genereal format from dataMap

    const convertedData =
      (data.length > 0 &&
        data.map(item => {
          return {
            ...generalFormat,
            id: item.id,
            status: item.status,
            total: item.total,
            line_items: item.line_items,
            date_created: item.date_created
          };
        })) ||
      [];

    return convertedData;
  }

  /**
   * @public
   * @method welcome convert api data from API to general format based on config server
   * @param {Object} data response objectc from alpha
   * @returns {Object}  converted data
   */
  async welcome(data) {
    return {
      text: data.text
    };
  }

  /**
   * @public
   * @method logo convert api data from API to general format based on config server
   * @param {Object} data response objectc from alpha
   * @returns {Object}  converted data
   */
  async logo(data) {
    const src =
      data.image && data.image.length > 0
        ? `${config['baseURL']}${data.image[0]['original']}`
        : '';
    return {
      src,
      target: data.target
    };
  }

  /**
   * @public
   * @method hotline convert api data from API to general format based on config server
   * @param {Object} data response objectc from alpha
   * @returns {Object}  converted data
   */
  async hotline(data) {
    return {
      text: data.text
    };
  }

  /**
   * @public
   * @method navLinks convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async navLinks(data) {
    const navLinkItems = data.items;
    if (!navLinkItems.length > 0) {
      return [];
    }

    const items = navLinkItems.map(item => {
      return {
        text: item.name || item.text,
        target: item.target
      };
    });

    return items;
  }

  /**
   * @public
   * @method slider convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async slider(data) {
    const sliderItems = data.items;
    if (!sliderItems.length > 0) {
      return sliderItems;
    }

    const images = sliderItems.map(item => {
      return {
        target: item.target,
        src: `${config['baseURL']}${item.image[0]['medium']}`
      };
    });
    return images;
  }

  /**
   * @public
   * @method sliderRight convert api data from API to general format based on config server
   * @param {Object} data response objectc from alpha
   * @returns {Object}  converted data
   */
  async sliderRight(data) {
    const sliderRightItems = data.items;
    if (!sliderRightItems.length > 0) {
      return sliderRightItems;
    }

    const images = sliderRightItems.map(item => {
      return {
        target: item.target,
        src: `${config['baseURL']}${item.image[0]['medium']}`
      };
    });
    return images;
  }

  /**
   * @public
   * @method address convert api data from API to general format based on config server
   * @param {Object} data response objectc from alpha
   * @returns {Object}  converted data
   */
  async address(data) {
    return {
      name: data.name,
      text: data.text
    };
  }

  /**
   * @public
   * @method Services convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async Services(data) {
    const servicesItems = data.items;
    if (!servicesItems.length > 0) {
      return servicesItems;
    }

    const items = servicesItems.map(item => {
      return {
        target: item.target,
        name: item.name || item.text
      };
    });
    return items;
  }

  /**
   * @public
   * @method Account convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async Account(data) {
    const accountItems = data.items;
    if (!accountItems.length > 0) {
      return accountItems;
    }

    const items = accountItems.map(item => {
      return {
        target: item.target,
        name: item.name || item.text
      };
    });
    return items;
  }

  /**
   * @public
   * @method 'About Us' convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async 'About Us'(data) {
    const aboutUsItems = data.items;
    if (!aboutUsItems.length > 0) {
      return aboutUsItems;
    }

    const items = aboutUsItems.map(item => {
      return {
        target: item.target,
        name: item.name || item.text
      };
    });
    return items;
  }
}

export default Converter;
