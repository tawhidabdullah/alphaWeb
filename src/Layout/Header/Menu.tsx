import React from 'react';
import { Spinner } from '../../components/Loading';
import { useGetData } from '../../hooks';

interface Props {
  history: any;
}

const Menu = ({ history }: Props) => {
  const categoryState = useGetData([], [], 'categoryList');

  return (
    <div className='all-department'>
      <span className='nav-menu'>
        <i className='fa fa-bars'></i>
        <span className='nav-menu-title'>All Departments</span>
      </span>
      <div className='all-department-sideMenu'>
        <ul>
          {(categoryState.data &&
            categoryState.data.length > 0 &&
            categoryState.data.map(item => {
              return (
                <li
                  key={item._id}
                  onClick={() => history.push(`/productList/${item._id}`)}
                >
                  {' '}
                  {item.name}
                </li>
              );
            })) ||
            (categoryState.isLoading && <Spinner />)}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
