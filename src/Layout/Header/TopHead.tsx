import React from 'react';

interface Props {
  history: any;
  isAuthenticate?: boolean;
  user?: any;
  logoutUser?: () => void;
}

const TopHead = ({ isAuthenticate, user, history, logoutUser }: Props) => {
  return (
    <div className='top-head-1'>
      <div className='top-left-content'>
        <span>Welcome to Alphaweb</span>
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
