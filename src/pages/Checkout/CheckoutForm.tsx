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
  selectedCountryValue: any;
  handleSelectCountryChange: (any) => void;
  cityList: any;
  selectedCityValue: any;
  handleSelectCityChange: (any) => void;
}

const CheckoutForm = ({
  values,
  handleChange,
  errors,
  isSubmitting,
  serverErrors,
  paymentMethod,
  isAuthenticated,
  countryList,
  selectedCountryValue,
  handleSelectCountryChange,
  cityList,
  selectedCityValue,
  handleSelectCityChange,
}: Props) => {
  return (
    <>
      <TextFeildGroup
        label='FirstName'
        name='firstName'
        placeholder='Enter your firstName'
        type='text'
        value={values.firstName}
        onChange={handleChange('firstName')}
        errors={
          errors.firstName ||
          (!isSubmitting && serverErrors.firstName && serverErrors.firstName)
        }
      />

      <TextFeildGroup
        label='Lastname'
        name='lastName'
        placeholder='Enter your lastName'
        type='text'
        value={values.lastName}
        onChange={handleChange('lastName')}
        errors={errors.lastName || (!isSubmitting && serverErrors.lastName)}
      />

      <TextFeildGroup
        label='Phone'
        name='phone'
        placeholder='Enter your phone'
        type='number'
        value={values.phone}
        onChange={handleChange('phone')}
        errors={errors.phone || (!isSubmitting && serverErrors.phone)}
      />

      <TextFeildGroup
        label='Email'
        name='email'
        placeholder='Enter your email'
        type='text'
        value={values.email}
        onChange={handleChange('email')}
        errors={errors.email || (!isSubmitting && serverErrors.email)}
      />

      {!isAuthenticated && (
        <>
          <TextFeildGroup
            label='Password'
            name='password'
            placeholder='Enter your password'
            type='password'
            value={values.password}
            onChange={handleChange('password')}
            errors={errors.password || (!isSubmitting && serverErrors.password)}
          />

          <TextFeildGroup
            label='Confirm Password'
            name='passwordConfirmation'
            placeholder='Enter your confirm password'
            type='password'
            value={values.passwordConfirmation}
            onChange={handleChange('passwordConfirmation')}
            errors={
              errors.passwordConfirmation ||
              (!isSubmitting && serverErrors.password2)
            }
          />
        </>
      )}

      <TextFeildGroup
        label='Address'
        name='address1'
        placeholder='Enter your address'
        type='text'
        value={values.address1}
        onChange={handleChange('address1')}
        errors={errors.address1 || (!isSubmitting && serverErrors.address1)}
      />
      {countryList.length > 0 && (
        <div>
          <Select
            value={selectedCountryValue}
            onChange={(value) => handleSelectCountryChange(value)}
            options={countryList.map((country) => ({
              value: country['name'],
              label: country['name'],
            }))}
          />

          <div className='select-invalid-feedback'>
            {errors.country || (!isSubmitting && serverErrors.country)}
          </div>
        </div>
      )}

      {cityList && (
        <div
          style={{
            marginTop: '20px',
          }}
        >
          <Select
            value={selectedCityValue}
            onChange={(value) => handleSelectCityChange(value)}
            options={cityList.map((city) => ({
              value: city['name'],
              label: city['name'],
            }))}
          />

          <div className='select-invalid-feedback'>
            {errors.city || (!isSubmitting && serverErrors.city)}
          </div>
        </div>
      )}

      {paymentMethod !== 'cod' && (
        <>
          <TextFeildGroup
            name='paymentNumber'
            label='Payment Mobile Number'
            placeholder='017xxx'
            type='text'
            value={values.paymentNumber}
            onChange={handleChange('paymentNumber')}
            errors={
              errors.paymentNumber ||
              (!isSubmitting && serverErrors.paymentNumber)
            }
          />

          <TextFeildGroup
            label='Transaction Id'
            name='paymentId'
            placeholder='Enter Trans Id...'
            type='text'
            value={values.paymentId}
            onChange={handleChange('paymentId')}
            errors={
              errors.paymentId || (!isSubmitting && serverErrors.paymentId)
            }
          />
        </>
      )}
    </>
  );
};

export default CheckoutForm;
