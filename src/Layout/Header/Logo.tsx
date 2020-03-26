import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks';

interface Props {}

const Logo = (props: Props) => {
  const logoState = useFetch([], {}, 'logo');

  return (
    <div className='navbar-center-logoBox'>
      {Object.keys(logoState.data).length > 0 ? (
        <Link to={logoState.data.target}>
          <img
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
            src={logoState.data.src}
            alt='Mystyle'
          />
        </Link>
      ) : (
        ''
      )}
    </div>
  );
};

export default Logo;
