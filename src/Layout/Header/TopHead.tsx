import React from 'react';
import { useFetch, useHandleFetch } from '../../hooks';

interface Props {
  history: any;
  isAuthenticated?: boolean;
  logout: () => void;
}

const TopHead = ({ isAuthenticated, history, logout }: Props) => {
  const welcomeState = useFetch([], {}, 'welcome');
  const [logoutState, handleLogoutFetch] = useHandleFetch({}, 'logout');

  const handleLogout = async () => {
    await handleLogoutFetch({});

    logout();
  };
  return (
    <div className='top-head-1'>
      <div className='top-left-content'>
        <span>
          {Object.keys(welcomeState.data).length > 0
            ? welcomeState.data['text']
            : ''}
          {!(Object.keys(welcomeState.data).length > 0) &&
          !welcomeState.isLoading
            ? welcomeState.data['text']
            : ''}
        </span>
      </div>
      <div className='trackorderandauthlinks'>
        {(isAuthenticated && (
          <>
            <p>
              <i className='fa fa-dashboard'></i>
              <span onClick={() => history.push('/dashboard')}>
                Dashboard
              </span>{' '}
            </p>
            <p>
              <i className='fa fa-user'></i>
              <span onClick={handleLogout}>Logout</span>{' '}
            </p>
          </>
        )) || (
          <p>
            <i className='fa fa-user'></i>
            <span onClick={() => history.push('/signin')}>Signin</span> or{' '}
            <span onClick={() => history.push('/signup')}>Signup</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default TopHead;
