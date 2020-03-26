import React from 'react';
import { useFetch } from '../../hooks';
interface Props {}

const Footer = (props: Props) => {
  const addressState = useFetch([], {}, 'address');
  const accountState = useFetch([], [], 'Account');
  const servicesState = useFetch([], [], 'Services');
  const aboutUsState = useFetch([], [], 'About Us');

  return (
    <footer className='footer'>
      <div className='row'>
        {Object.keys(addressState.data).length > 0 && (
          <div className='col-md-3'>
            <div className='our__categories'>
              <span className='widget-title'>Address</span>
              <ul className='footerMenu'>
                <li
                  key={addressState.data.name}
                  className='menu-item menu-item-type-custom menu-item-object-custom menu-item-244'
                >
                  <a href={'##'}>{addressState.data.text}</a>
                </li>
              </ul>
            </div>
          </div>
        )}

        {accountState.data.length > 0 && (
          <div className='col-md-3'>
            <div className='our__categories'>
              <span className='widget-title'>Accounts</span>
              <ul className='footerMenu'>
                {accountState.data.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className='menu-item menu-item-type-custom menu-item-object-custom menu-item-244'
                    >
                      <a href={item.target}>{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {aboutUsState.data.length > 0 && (
          <div className='col-md-3'>
            <div className='our__categories'>
              <span className='widget-title'>About Us</span>
              <ul className='footerMenu'>
                {aboutUsState.data.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className='menu-item menu-item-type-custom menu-item-object-custom menu-item-244'
                    >
                      <a href={item.target}>{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {servicesState.data.length > 0 && (
          <div className='col-md-3'>
            <div className='our__categories'>
              <span className='widget-title'>Services</span>
              <ul className='footerMenu'>
                {servicesState.data.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className='menu-item menu-item-type-custom menu-item-object-custom menu-item-244'
                    >
                      <a href={item.target}>{item.name}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
