import React, { useState, useEffect, useLayoutEffect } from 'react';
import { withRouter } from 'react-router-dom';

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
}

const Header = ({ history }: Props) => {
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
    handleToggleCartBar();
    history.push('/login');
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
      <TopHead history={history} />

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
            <CartIcon handleToggleCartBar={handleToggleCartBar} />
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
        handleToggleCartBar={handleToggleCartBar}
        isShowCartBar={isShowCartBar}
        history={history}
        handleModalShow={handleModalShow}
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

export default withRouter(Header);
