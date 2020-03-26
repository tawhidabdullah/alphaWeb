import React from 'react';

interface Props {
  handleToggleCartBar: () => void;
}

const CartIcon = ({ handleToggleCartBar }: Props) => {
  return (
    <div
      className='navbar-center-cartBox'
      style={{
        marginRight: '10px'
      }}
    >
      <div className='cartt-btn' onClick={handleToggleCartBar}>
        <span className='nav-icon'>
          <i className='fa fa-shopping-cart'></i>
        </span>
        <div className='cartt-items'>
          {/* {this.props.cartLength ? ` ${this.props.cartLength}` : 0} */}0
        </div>
      </div>
    </div>
  );
};

export default CartIcon;
