import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RadioGroup, ReversedRadioButton } from 'react-radio-buttons';
import { Button } from 'react-bootstrap';

// import checkout component
import CheckoutSuccessModal from './CheckoutSuccessModal';
import CheckoutForm from './CheckoutForm';

// validation schemeas

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchemaForCod = Yup.object().shape({
  address: Yup.string()
    .label('Address')
    .min(10, 'Address must have at least 10 characters ')
});

const validationSchemaForOtherPaymentMethods = Yup.object().shape({
  address: Yup.string()
    .label('Address')
    .min(10, 'Address must have at least 10 characters '),
  paymentNumber: Yup.string()
    .required('Please tell us your mobile number.')
    .matches(phoneRegExp, 'Please enter a valid mobile number.'),
  paymentId: Yup.string()
    .label('Payment Id')
    .required('Payment is Required')
});

// initial values
const otherPaymentMethodIntialValues = {
  address: '',
  paymentNumber: '',
  paymentId: ''
};
const codInitialValues = { address: '' };

interface Props {
  history: any;
}

const Checkout = ({ history }: Props) => {
  const [paymentMethod, setPaymentMethod] = React.useState('cod');
  const [isModalShown, setIsModalShown] = useState(false);

  const handleCloseModal = () => {
    setIsModalShown(false);
    history.push('/');
  };

  const onRadioGroupChange = value => {
    setPaymentMethod(value);
  };

  const handleOrder = (values, actions) => {};

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={
          paymentMethod === 'cod'
            ? codInitialValues
            : otherPaymentMethodIntialValues
        }
        // @ts-ignore
        onSubmit={(values, actions) => handleOrder(values, actions)}
        validationSchema={
          paymentMethod === 'cod'
            ? validationSchemaForCod
            : validationSchemaForOtherPaymentMethods
        }
      >
        {({
          handleChange,
          values,
          errors,
          isValid,
          isSubmitting,
          handleSubmit,
          touched,
          handleBlur
        }) => (
          <>
            <div className='checkout'>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-7 createOrderContainer'>
                    <div>
                      <h2 className='shipping-heading'>Payment Method</h2>
                      <div className='paymentMethods'>
                        <RadioGroup
                          onChange={onRadioGroupChange}
                          value={paymentMethod}
                        >
                          <ReversedRadioButton value='cod' padding={12}>
                            Cash on Delivery
                          </ReversedRadioButton>
                          <ReversedRadioButton value='nagad' padding={12}>
                            <div
                              style={{
                                width: '100px',
                                height: '20px'
                              }}
                            >
                              <img
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'contain'
                                }}
                                src={require('../../assets/paymentMethodImages/nagadIcon.png')}
                              />
                            </div>
                          </ReversedRadioButton>
                          <ReversedRadioButton value='rocket' padding={12}>
                            <div
                              style={{
                                width: '100px',
                                height: '20px'
                              }}
                            >
                              <img
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'contain'
                                }}
                                src={require('../../assets/paymentMethodImages/rocketIcon.jpg')}
                              />
                            </div>
                          </ReversedRadioButton>
                          <ReversedRadioButton value='bkash' padding={12}>
                            <div
                              style={{
                                width: '100px',
                                height: '20px'
                              }}
                            >
                              <img
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'contain'
                                }}
                                src={require('../../assets/paymentMethodImages/bkashIcon.png')}
                              />
                            </div>
                          </ReversedRadioButton>
                        </RadioGroup>
                      </div>
                      <div
                        style={{
                          marginTop: '30px'
                        }}
                      >
                        <CheckoutForm
                          isSubmitting={isSubmitting}
                          paymentMethod={paymentMethod}
                          values={values}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          touched={touched}
                          errors={errors}
                          serverErrors={{}}
                        />

                        <Button
                          style={{
                            margin: 0
                          }}
                          variant='primary'
                          type='submit'
                          className='fixedBoostrapButtonTobePrimaryColor'
                          // @ts-ignore
                          onClick={handleSubmit}
                        >
                          {isSubmitting ? 'Order...' : 'Order'}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-5'>
                    <div className='row'>
                      <div className='col-md-12 '>
                        <div className='order-summary'>
                          <h2
                            style={{
                              marginBottom: '20px',
                              padding: '15px 10px',
                              borderBottom: '2px solid #ccc'
                            }}
                          >
                            Order Summary
                          </h2>

                          {/* {cartItems.length > 0 ? (
                            <>
                              <div>
                                {props.cartItems &&
                                  props.cartItems.length > 0 &&
                                  props.cartItems.map(item => {
                                    return (
                                      <SmallItem item={item} isOrder={true} />
                                    );
                                  })}
                              </div>
                              <div className='order-summary-price'>
                                <h3>{props.cartItems.length} items in Cart</h3>
                                <span>৳{props.totalPrice}</span>
                              </div>
                            </>
                          ) : (
                            <button
                              className='clear-cart banner-btn'
                              onClick={e => {
                                e.preventDefault();
                                props.history.push('/');
                              }}
                              // onClick={this.handleToggleCartBar}
                            >
                              Add Products
                            </button>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Formik>

      <CheckoutSuccessModal
        isModalShown={isModalShown}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default withRouter(Checkout);
