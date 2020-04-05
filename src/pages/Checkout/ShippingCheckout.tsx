import React from 'react';
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
}

const CheckoutForm = ({
  values,
  handleChange,
  errors,
  isSubmitting,
  serverErrors,
  paymentMethod,
  isAuthenticated,
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
      <TextFeildGroup
        label='Address'
        name='Shipping Address'
        placeholder='Enter your Shipping Address'
        type='text'
        value={values.shippingAddress1}
        onChange={handleChange('shippingAddress1')}
        errors={
          errors.shippingAddress1 ||
          (!isSubmitting && serverErrors.shippingAddress1)
        }
      />
      <TextFeildGroup
        label='Shipping City'
        name='shippingCity'
        placeholder='Enter your Shipping City'
        type='text'
        value={values.shippingCity}
        onChange={handleChange('shippingCity')}
        errors={
          errors.shippingCity || (!isSubmitting && serverErrors.shippingCity)
        }
      />
      <TextFeildGroup
        label='Shipping Country'
        name='shippingCountry'
        placeholder='Enter your Shipping Country'
        type='text'
        value={values.shippingCountry}
        onChange={handleChange('shippingCountry')}
        errors={
          errors.shippingCountry ||
          (!isSubmitting && serverErrors.shippingCountry)
        }
      />
    </>
  );
};

export default CheckoutForm;
