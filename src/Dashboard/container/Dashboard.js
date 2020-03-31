import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from '../../components/Loading';
import { useHandleFetch } from '../../hooks';

import Order from '../components/Order';

const Dashboard = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [customerDetailState, handleCustomerDetailFetch] = useHandleFetch(
    {},
    'getCurrentCustomerData'
  );
  const getCheckAndSetCustomerData = async () => {
    const customerData = await handleCustomerDetailFetch({});
    console.log('customerData', customerData);
  };

  useEffect(() => {
    // getCheckAndSetCustomerData();
  }, []);

  const [tabs, settabs] = React.useState({
    isOrders: true,
    isCart: false,
    isWishList: false,
    Settings: false
  });

  const toggleTabs = tabName => {
    const tempTabs = { ...tabs };
    const tbsMap = Object.keys(tempTabs);
    tbsMap.forEach(tb => {
      if (tb === tabName) {
        tempTabs[tb] = true;
      } else tempTabs[tb] = false;
    });
    settabs({ ...tabs, ...tempTabs });
  };

  return (
    <>
      <div className='container__of-dashboard'>
        <div className='content'>
          <nav className='sidebar' onClick={() => getCheckAndSetCustomerData()}>
            <ul className='side-nav'>
              <li
                className={
                  tabs.isOrders
                    ? 'side-nav__item side-nav__item--active'
                    : ' side-nav__item'
                }
                onClick={() => toggleTabs('isOrders')}
              >
                <a href='##' className='side-nav__link'>
                  <i className='fa fa-first-order'></i>
                  <span className='side-nav__text'>Orders</span>
                </a>
              </li>
            </ul>
          </nav>
          <main className='dashboard__main-content'>
            {tabs.isOrders ? <Order /> : ''}
          </main>
        </div>
      </div>
      {isLoading && <Spinner />}
    </>
  );
};

export default withRouter(Dashboard);
