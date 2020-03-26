import React from 'react';

interface Props {
  isShowMenuBar: boolean;
  handleToggleMenuBar: () => void;
}

const MenuBar = ({ isShowMenuBar, handleToggleMenuBar }: Props) => {
  return (
    <div className={isShowMenuBar ? 'show-menu-bar' : ''}>
      <div
        onClick={handleToggleMenuBar}
        className={isShowMenuBar ? 'menu-overlay ' : ''}
      ></div>
      <div className={isShowMenuBar ? 'menu showMenu' : 'menu'}>
        <span className='close-menu' onClick={handleToggleMenuBar}>
          <i className='fa fa-window-close'></i>
        </span>
        <ul className='menuItems'>
          {['Home', 'Products', 'Wishlist', 'Offer'].map(item => {
            return (
              <li key={item}>
                <a key={item} href={item}>
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
