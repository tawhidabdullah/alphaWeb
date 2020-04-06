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
      <div
        className='block-title authTitle sm'
        style={{
          margin: '20px 0',
        }}
      >
        <span>Personal Information</span>
      </div>

      <div className='formContainerOfTwo'>
        <div className='formContainerOfTwoItem'>
          <TextFeildGroup
            label='FirstName'
            name='firstName'
            placeholder='FirstName'
            type='text'
            value={values.firstName}
            onChange={handleChange('firstName')}
            errors={
              errors.firstName ||
              (!isSubmitting &&
                serverErrors.firstName &&
                serverErrors.firstName)
            }
          />
        </div>
        <div className='formContainerOfTwoItem'>
          <TextFeildGroup
            label='Lastname'
            name='lastName'
            placeholder='LastName'
            type='text'
            value={values.lastName}
            onChange={handleChange('lastName')}
            errors={errors.lastName || (!isSubmitting && serverErrors.lastName)}
          />
        </div>
      </div>

      <div className='formContainerOfTwo'>
        <div className='formContainerOfTwoItem'>
          {countryList.length > 0 && (
            <div>
              <label className='formLabel'>Country</label>
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
        </div>
        <div className='formContainerOfTwoItem'>
          {cityList && (
            <div>
              <label className='formLabel'>City</label>
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
        </div>
      </div>

      <div className='formContainerOfTwo'>
        <div className='formContainerOfTwoItem'>
          <TextFeildGroup
            label='Address'
            name='address1'
            placeholder='Address line 1'
            type='text'
            value={values.address1}
            onChange={handleChange('address1')}
            errors={errors.address1 || (!isSubmitting && serverErrors.address1)}
          />
        </div>
        <div className='formContainerOfTwoItem'>
          <TextFeildGroup
            label='Address'
            name='address2'
            placeholder='Address line 2'
            type='text'
            value={values.address2}
            onChange={handleChange('address2')}
            errors={errors.address2 || (!isSubmitting && serverErrors.address2)}
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
        name='phone'
        placeholder='Mobile phone no'
        type='text'
        value={values.phone}
        onChange={handleChange('phone')}
        errors={errors.phone || (!isSubmitting && serverErrors.phone)}
      />

      <TextFeildGroup
        label='Email'
        name='email'
        placeholder='Email address'
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
            placeholder='******'
            type='password'
            value={values.password}
            onChange={handleChange('password')}
            errors={errors.password || (!isSubmitting && serverErrors.password)}
          />

          <TextFeildGroup
            label='Confirm Password'
            name='passwordConfirmation'
            placeholder='******'
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
    </>
  );
};

export default CheckoutForm;
