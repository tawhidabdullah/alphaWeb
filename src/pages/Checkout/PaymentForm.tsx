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
            name='paymentAccountNumber'
            label='Payment Mobile Number'
            placeholder='017xxx'
            type='text'
            value={values.paymentAccountNumber}
            onChange={handleChange('paymentAccountNumber')}
            errors={
              errors.paymentAccountNumber ||
              (!isSubmitting && serverErrors.paymentAccountNumber)
            }
          />

          <TextFeildGroup
            label='Transaction Id'
            name='transactionId'
            placeholder='Enter Trans Id...'
            type='text'
            value={values.transactionId}
            onChange={handleChange('transactionId')}
            errors={
              errors.transactionId ||
              (!isSubmitting && serverErrors.transactionId)
            }
          />
        </>
      )}
    </>
  );
};

export default CheckoutForm;
