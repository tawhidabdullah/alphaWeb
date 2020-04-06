import React from 'react';
import Select from 'react-select';

import { TextFeildGroup } from '../../components/Field';

interface Props {
  values: any;
  handleBlur: (e: any) => void;
  handleChange: any;
  touched: any;
  errors: any;
  paymentMethod: string;
  serverErrors: any;
  isSubmitting: boolean;
  isAuthenticated: boolean;
  countryList: any;
  selectedShippingCountryValue: any;
  handleSelectShippingCountryChange: (any) => void;
  shippingCityList: any;
  selectedShippingCityValue: any;
  handleSelectShippingCityChange: (any) => void;
}

const CheckoutForm = ({
  values,
  handleChange,
  errors,
  isSubmitting,
  serverErrors,
  countryList,
  shippingCityList,
  handleSelectShippingCityChange,
  handleSelectShippingCountryChange,
  selectedShippingCityValue,
  selectedShippingCountryValue,
}: Props) => {
  return (
    <>
      <div
        className='block-title authTitle sm'
        style={{
          margin: '20px 0',
        }}
      >
        <span>personal Information</span>
      </div>

      <div className='formContainerOfTwo'>
        <div className='formContainerOfTwoItem'>
          <TextFeildGroup
            label='FirstName'
            name='shippingFirstName'
            placeholder='FirstName'
            type='text'
            value={values.shippingFirstName}
            onChange={handleChange('shippingFirstName')}
            errors={
              errors.shippingFirstName ||
              (!isSubmitting && serverErrors.shippingFirstName)
            }
          />
        </div>
        <div className='formContainerOfTwoItem'>
          <TextFeildGroup
            label='LastName'
            name='shippingLastName'
            placeholder='LastName'
            type='text'
            value={values.shippingLastName}
            onChange={handleChange('shippingLastName')}
            errors={
              errors.shippingLastName ||
              (!isSubmitting && serverErrors.shippingLastName)
            }
          />
        </div>
      </div>

      <div className='formContainerOfTwo'>
        <div className='formContainerOfTwoItem'>
          {countryList.length > 0 && (
            <div>
              <label className='formLabel'>Country</label>

              <Select
                value={selectedShippingCountryValue}
                onChange={(value) => handleSelectShippingCountryChange(value)}
                options={countryList.map((country) => ({
                  value: country['name'],
                  label: country['name'],
                }))}
              />
              <div className='select-invalid-feedback'>
                {errors.shippingCountry ||
                  (!isSubmitting && serverErrors.shippingCountry)}
              </div>
            </div>
          )}
        </div>
        <div className='formContainerOfTwoItem'>
          {shippingCityList && (
            <div>
              <label className='formLabel'>City</label>
              <Select
                value={selectedShippingCityValue}
                onChange={(value) => handleSelectShippingCityChange(value)}
                options={shippingCityList.map((city) => ({
                  value: city['name'],
                  label: city['name'],
                }))}
              />

              <div className='select-invalid-feedback'>
                {errors.shippingCity ||
                  (!isSubmitting && serverErrors.shippingCity)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='formContainerOfTwo'>
        <div className='formContainerOfTwoItem'>
          <TextFeildGroup
            label='Address'
            name='shippingAddress1'
            placeholder='Address line 1'
            type='text'
            value={values.shippingAddress1}
            onChange={handleChange('shippingAddress1')}
            errors={
              errors.shippingAddress1 ||
              (!isSubmitting && serverErrors.shippingAddress1)
            }
          />
        </div>
        <div className='formContainerOfTwoItem'>
          <TextFeildGroup
            label='Address'
            name='shippingAddress2'
            placeholder='Address line 2'
            type='text'
            value={values.shippingAddress2}
            onChange={handleChange('shippingAddress2')}
            errors={
              errors.shippingAddress2 ||
              (!isSubmitting && serverErrors.shippingAddress2)
            }
          />
        </div>
      </div>
      <div
        className='block-title authTitle sm'
        style={{
          margin: '20px 0',
        }}
      >
        <span>Contact Information</span>
      </div>
      <TextFeildGroup
        label='Phone'
        name='shippingPhone'
        placeholder='Mobile phone no'
        type='text'
        value={values.shippingPhone}
        onChange={handleChange('shippingPhone')}
        errors={
          errors.shippingPhone || (!isSubmitting && serverErrors.shippingPhone)
        }
      />
      <TextFeildGroup
        label='Email'
        name='shippingEmail'
        placeholder='Email address'
        type='text'
        value={values.shippingEmail}
        onChange={handleChange('shippingEmail')}
        errors={
          errors.shippingEmail || (!isSubmitting && serverErrors.shippingEmail)
        }
      />
    </>
  );
};

export default CheckoutForm;
