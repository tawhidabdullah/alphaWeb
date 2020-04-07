import React from 'react';

interface Props {
  isShowCartBar: boolean;
  isCartIconVisiable: boolean;
  handleToggleCartBar: () => void;
  cartLength: number;
  windowWidth: number;
}

const FloatingCartIcon = ({
  isShowCartBar,
  isCartIconVisiable,
  handleToggleCartBar,
  cartLength,
  windowWidth,
}: Props) => {
  return (
    <>
      {windowWidth > 600 && !isShowCartBar && isCartIconVisiable ? (
        <div
          style={{
            position: 'sticky',
            top: '80px',
            right: '50px',
            zIndex: 100000000,
            width: '100%',
            height: '50px',
          }}
        >
          <div
            onClick={handleToggleCartBar}
            style={{
              position: 'absolute',
              cursor: 'pointer',
              height: '50px',
              width: '85px',
              background: '#fff',
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomLeftRadius: '5px',
              borderTopLeftRadius: '5px',
              boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.05)',
            }}
          >
            <span
              style={{
                padding: '0 1vh',
                borderRadius: '30%',
                background: '#6b21ac',
                fontSize: '15px',
                color: '#fff',
                position: 'absolute',
                top: '5px',
                right: '15px',
              }}
            >
              {cartLength ? ` ${cartLength}` : 0}
            </span>
            <span
              style={{
                position: 'absolute',
                top: '13px',
                right: '25px',
                fontSize: '22px',
              }}
            >
              <i className='fa fa-shopping-cart'></i>
            </span>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default FloatingCartIcon;
