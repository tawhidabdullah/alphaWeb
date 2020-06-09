import React from 'react';
import { TextFeildGroup, TextAreaFeildGroup } from '../../components/Field';


interface Props {
  values: any;
  handleChange: any;
  touched: any;
  setFieldTouched: (e: any) => void;
  errors: any;
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
  touched,
  setFieldTouched,
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
            label='First name'
            name='shippingFirstName'
            placeholder='first name'
            type='text'
            value={values.shippingFirstName}
            onChange={(e) => {
              handleChange(e);
              setFieldTouched('shippingFirstName');
            }}
            errors={
              (touched.shippingFirstName && errors.shippingFirstName) ||
              (!isSubmitting && serverErrors.shippingFirstName)
            }
          />
        </div>
        <div className='formContainerOfTwoItem'>
          <TextFeildGroup
            label='Last Name'
            name='shippingLastName'
            placeholder='last name'
            type='text'
            value={values.shippingLastName}
            onChange={(e) => {
              handleChange(e);
              setFieldTouched('shippingLastName');
            }}
            errors={
              (touched.shippingLastName && errors.shippingLastName) ||
              (!isSubmitting && serverErrors.shippingLastName)
            }
          />
        </div>
      </div>



      <TextAreaFeildGroup
        label='Address'
        name='shippingAddress1'
        placeholder='your address..'
        type='text'
        value={values.shippingAddress1}
        onChange={(e) => {
          handleChange(e);
          setFieldTouched('shippingAddress1');
        }}
        errors={
          (touched.shippingAddress1 && errors.shippingAddress1) ||
          (!isSubmitting && serverErrors.shippingAddress1)
        }
      />

      {/* <TextFeildGroup
        name='shippingAddress2'
        placeholder='Address line 2'
        type='text'
        value={values.shippingAddress2}
        onChange={(e) => {
          handleChange(e);
          setFieldTouched('shippingAddress2');
        }}
        errors={
          (touched.shippingAddress2 && errors.shippingAddress2) ||
          (!isSubmitting && serverErrors.shippingAddress2)
        }
      /> */}

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
        onChange={(e) => {
          handleChange(e);
          setFieldTouched('shippingPhone');
        }}
        errors={
          (touched.shippingPhone && errors.shippingPhone) ||
          (!isSubmitting && serverErrors.shippingPhone)
        }
      />
      <TextFeildGroup
        label='Email'
        name='shippingEmail'
        placeholder='Email address'
        type='text'
        value={values.shippingEmail}
        onChange={(e) => {
          handleChange(e);
          setFieldTouched('shippingEmail');
        }}
        errors={
          (touched.shippingEmail && errors.shippingEmail) ||
          (!isSubmitting && serverErrors.shippingEmail)
        }
      />
    </>
  );
};

export default CheckoutForm;
