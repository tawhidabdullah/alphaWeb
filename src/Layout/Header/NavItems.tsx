import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const NavItems = ({}: Props) => {
  return (
    <>
      {['Home', 'Products', 'Wishlist', 'Offer'].map(item => {
        return (
          <Link key={item} to={'/'}>
            {item}
          </Link>
        );
      })}
    </>
  );
};

export default NavItems;
