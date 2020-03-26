import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Logo = (props: Props) => {
  return (
    <div className='navbar-center-logoBox'>
      <Link to={'/'}>
        <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
          src={
            'https://images.unsplash.com/photo-1522139137660-4248e04955b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80'
          }
          alt='Mystyle'
        />
      </Link>
    </div>
  );
};

export default Logo;
