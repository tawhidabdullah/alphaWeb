import React from 'react';
import Select from 'react-select';
import { TextFeildGroup } from '../../components/Field';

interface Props {
  values: any;
  handleChange: any;
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
  paymentMethod,
}: Props) => {
  return (
    <>
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
