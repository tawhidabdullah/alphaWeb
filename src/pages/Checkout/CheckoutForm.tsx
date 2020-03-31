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
}

const CheckoutForm = ({
  values,
  handleChange,
  errors,
  isSubmitting,
  serverErrors,
  paymentMethod
}: Props) => {
  return (
    <>
      <TextFeildGroup
        name='address'
        placeholder='Enter shipping address...'
        type='text'
        value={values.address}
        onChange={handleChange('address')}
        label='Shipping Address (Only if different from profile)'
        errors={errors.address || (!isSubmitting && serverErrors.address)}
      />

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
