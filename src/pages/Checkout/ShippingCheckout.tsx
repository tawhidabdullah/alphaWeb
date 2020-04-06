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
      <TextFeildGroup
        label='Shipping FirstName'
        name='shippingFirstName'
        placeholder='Enter your Shipping FirstName'
        type='text'
        value={values.shippingFirstName}
        onChange={handleChange('shippingFirstName')}
        errors={
          errors.shippingFirstName ||
          (!isSubmitting && serverErrors.shippingFirstName)
        }
      />
      <TextFeildGroup
        label='Shipping LastName'
        name='shippingLastName'
        placeholder='Enter your Shipping LastName'
        type='text'
        value={values.shippingLastName}
        onChange={handleChange('shippingLastName')}
        errors={
          errors.shippingLastName ||
          (!isSubmitting && serverErrors.shippingLastName)
        }
      />
      <TextFeildGroup
        label='Shipping Phone'
        name='shippingPhone'
        placeholder='Enter your Shipping Phone'
        type='number'
        value={values.shippingPhone}
        onChange={handleChange('shippingPhone')}
        errors={
          errors.shippingPhone || (!isSubmitting && serverErrors.shippingPhone)
        }
      />
      <TextFeildGroup
        label='Shipping Email'
        name='shippingEmail'
        placeholder='Enter your Shipping Email'
        type='text'
        value={values.shippingEmail}
        onChange={handleChange('shippingEmail')}
        errors={
          errors.shippingEmail || (!isSubmitting && serverErrors.shippingEmail)
        }
      />

      {countryList.length > 0 && (
        <div>
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

      {shippingCityList && (
        <div
          style={{
            margin: '20px 0',
          }}
        >
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

      <TextFeildGroup
        label='Shipping Address line 1'
        name='shippingAddress1'
        placeholder='Enter your Shipping Address line 1'
        type='text'
        value={values.shippingAddress1}
        onChange={handleChange('shippingAddress1')}
        errors={
          errors.shippingAddress1 ||
          (!isSubmitting && serverErrors.shippingAddress1)
        }
      />

      <TextFeildGroup
        label='Shipping Address line 2'
        name='shippingAddress2'
        placeholder='Enter your Shipping Address line 2'
        type='text'
        value={values.shippingAddress2}
        onChange={handleChange('shippingAddress2')}
        errors={
          errors.shippingAddress2 ||
          (!isSubmitting && serverErrors.shippingAddress2)
        }
      />
    </>
  );
};

export default CheckoutForm;
