import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from '../../components/Loading';
import { useHandleFetch } from '../../hooks';

import Order from '../components/Order';

const Dashboard = props => {
  const [isLoading, setIsLoading] = useState(false);

  const [customerDetailState, handleCustomerDetailFetch] = useHandleFetch(
    {},
    'getCurrentCustomerData'
  );

  useEffect(() => {
    const getCheckAndSetCustomerData = async () => {
      setIsLoading(true);
      const customerData = await handleCustomerDetailFetch({});
      if (!customerData) {
        props.history.push('/signin');
      }
      setIsLoading(false);
    };
    if (!props.session['isAuthenticated']) {
      getCheckAndSetCustomerData();
    }
  }, [props.session['isAuthenticated']]);

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
      {!isLoading && (
        <div className='container__of-dashboard'>
          <div className='content'>
            <nav className='sidebar'>
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
      )}
      {isLoading && <Spinner />}
    </>
  );
};

const mapStateToProps = state => ({
  session: state.session
});

// @ts-ignore
export default connect(
  mapStateToProps,
  {}
  // @ts-ignore
)(withRouter(Dashboard));