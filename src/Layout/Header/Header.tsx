import React, { useState, useEffect, useLayoutEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { sessionOperations } from '../../state/ducks/session';

// import header components
import TopHead from './TopHead';
import Logo from './Logo';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import MobileNav from './MobileNav';
import Menu from './Menu';
import NavItems from './NavItems';
import Hotline from './Hotline';
import CartBar from './CartBar';
import MenuBar from './MenuBar';
import AuthenticationModal from './AuthenticationModal';

interface Props {
  history: any;
  cartItems: any;
  session: any;
  logout: () => void;
}

const Header = ({ history, cartItems, session, logout }: Props) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isShowCartBar, setIsShowCartBar] = useState(false);
  const [isShowMenuBar, setIsShowMenuBar] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);

  const handleToggleCartBar = () => {
    setIsShowCartBar(isShowCartBar => !isShowCartBar);
  };

  const handleToggleMenuBar = () => {
    setIsShowMenuBar(isShowMenuBar => !isShowMenuBar);
  };
  const handleModalClose = () => {
    setIsModalShown(false);
  };

  const handleModalShow = () => {
    setIsModalShown(true);
  };

  const handleGoToLogin = () => {
    setIsModalShown(false);
    history.push('/signin');
  };

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

  return (
    <>
      <TopHead
        history={history}
        isAuthenticated={session['isAuthenticated']}
        logout={logout}
      />

      <div
        className='navbar'
        style={{
          position: 'relative'
        }}
      >
        <div className='navbar-center'>
          <Logo />
          {windowWidth < 600 ? '' : <SearchBar history={history} />}

          {windowWidth < 600 ? (
            ''
          ) : (
            <CartIcon
              handleToggleCartBar={handleToggleCartBar}
              cartLength={cartItems.length}
            />
          )}
        </div>
      </div>
      {windowWidth < 600 ? (
        <MobileNav
          handleToggleCartBar={handleToggleCartBar}
          handleToggleMenuBar={handleToggleMenuBar}
          history={history}
        />
      ) : (
        ''
      )}
      {windowWidth < 600 ? (
        ''
      ) : (
        <div className='navbar'>
          <div className='navbar-center'>
            <Menu history={history} />

            <div className='navbar-center-navItems'>
              <NavItems />
            </div>
            <Hotline />
          </div>
        </div>
      )}

      <CartBar
        // @ts-ignore
        handleToggleCartBar={handleToggleCartBar}
        isShowCartBar={isShowCartBar}
        history={history}
        handleModalShow={handleModalShow}
        isAuthenticated={session['isAuthenticated']}
      />

      <MenuBar
        isShowMenuBar={isShowMenuBar}
        handleToggleMenuBar={handleToggleMenuBar}
      />

      <AuthenticationModal
        isModalShown={isModalShown}
        handleModalClose={handleModalClose}
        handleGoToLogin={handleGoToLogin}
      />
    </>
  );
};

const mapDispatchToProps = {
  logout: sessionOperations.logout
};

const mapStateToProps = state => ({
  cartItems: state.cart,
  session: state.session
});

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(Header));
