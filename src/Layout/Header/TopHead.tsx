import React from 'react';
import { useFetch } from '../../hooks';

interface Props {
  history: any;
  isAuthenticate?: boolean;
  user?: any;
  logoutUser?: () => void;
}

const TopHead = ({ isAuthenticate, user, history, logoutUser }: Props) => {
  const welcomeState = useFetch([], {}, 'welcome');

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
        {(isAuthenticate && user && (
          <>
            <p>
              <i className='fa fa-dashboard'></i>
              <span onClick={() => history.push('/dashboard')}>
                Dashboard
              </span>{' '}
            </p>
            <p>
              <i className='fa fa-user'></i>
              <span onClick={() => logoutUser && logoutUser()}>
                Logout
              </span>{' '}
            </p>
          </>
        )) || (
          <p>
            <i className='fa fa-user'></i>
            <span onClick={() => history.push('/login')}>Login</span> or{' '}
            <span onClick={() => history.push('/register')}>Register</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default TopHead;
