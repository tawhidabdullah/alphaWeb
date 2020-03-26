import React from 'react';

interface Props {}

const Hotline = ({}: Props) => {
  return (
    <div className='navbar-center-phoneNumberbox'>
      <span className='phone'>
        <i className='fa fa-phone' />
        <span className='phoneText'>hotline</span>
        <span className='phoneNumber'>01793706417</span>
      </span>
    </div>
  );
};

export default Hotline;
