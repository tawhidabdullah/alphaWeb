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
          cover: `${config['baseURL']}${category.cover.medium}`
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
          price: product.price,
          offerPrice: product.offerPrice
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
  async productSearch(data) {
    //map props
    let generalFormat = dataMap[config['server']]['productSearch']; //get genereal format from dataMap

    const convertedData =
      (data.length > 0 &&
        data.map(item => {
          return {
            ...generalFormat,
            id: item._id || item.id || '',
            name: item.name || '',
            description: data.description || data.description,
            price: item.price || '',
            image:
              config['server'] !== 'wooCommerce'
                ? (item.cover.medium &&
                    `${config.baseURL}${item.cover.medium}`) ||
                  `${config.baseURL}${item.cover.orginal}`
                : (item.images &&
                    item.images.length > 0 &&
                    item.images.map(img => img.src)) ||
                  []
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
          price: product.price,
          offerPrice: product.offerPrice
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
        price: data.price || '',
        offerPrice: data.offerPrice,
        category: data.category,
        brand: data.brand,
        tags: data.tags,
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
   * @method slider convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async slider(data) {
    //map props
    // let generalFormat = dataMap[config['server']]['slider']; //get genereal format from dataMap

    const sliderItems = data.items;
    if (!sliderItems.length > 0) {
      return sliderItems;
    }

    const images = sliderItems
      .map(item => item.image[0])
      .map(img =>
        img.medium
          ? `${config.baseURL}${img.medium}`
          : `${config.baseURL}${img.orginal}`
      );

    return images;
  }

  /**
   * @public
   * @method hotline convert api data from API to general format based on config server
   * @param {Object} data response objectc from wc
   * @returns {Object}  converted data
   */
  async hotline(data) {
    //map props
    // let generalFormat = dataMap[config['server']]['hotline']; //get genereal format from dataMap

    const hotlineItems = data.items;
    if (!hotlineItems.length > 0) {
      return hotlineItems;
    }

    const convertedData = hotlineItems.map(hotlineItem => {
      return hotlineItem.elements[0].value;
    });

    return convertedData;
  }
}

export default Converter;
