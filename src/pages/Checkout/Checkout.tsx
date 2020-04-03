import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RadioGroup, ReversedRadioButton } from 'react-radio-buttons';
import { Button } from 'react-bootstrap';
import { cartSelectors } from '../../state/ducks/cart';
import { sessionOperations } from '../../state/ducks/session';
import SmallItem from '../../components/SmallItem';
import { useHandleFetch } from '../../hooks';
import { Spinner } from '../../components/Loading';

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
  cartItems: any;
  totalPrice: number;
  session: any;
  logout: () => void;
}

const Checkout = ({
  history,
  cartItems,
  totalPrice,
  session,
  logout
}: Props) => {
  const [paymentMethod, setPaymentMethod] = React.useState('cod');
  const [isModalShown, setIsModalShown] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const [customerDetailState, handleCustomerDetailFetch] = useHandleFetch(
    {},
    'getCurrentCustomerData'
  );

  useEffect(() => {
    const getCheckAndSetCustomerData = async () => {
      setIsAuthLoading(true);
      const customerData = await handleCustomerDetailFetch({});
      // @ts-ignore
      if (!customerData) {
        history.push('/signin');
        logout();
      }
      setIsAuthLoading(false);
    };
    if (!session['isAuthenticated']) {
      getCheckAndSetCustomerData();
    }
  }, [customerDetailState, session['isAuthenticated']]);

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
      {!isAuthLoading && (
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

                            {cartItems.length > 0 ? (
                              <>
                                <div>
                                  {cartItems &&
                                    cartItems.length > 0 &&
                                    cartItems.map(({ product }) => {
                                      return (
                                        <SmallItem
                                          productItem={product}
                                          isOrder={true}
                                        />
                                      );
                                    })}
                                </div>
                                <div className='order-summary-price'>
                                  <h3>{cartItems.length} items in Cart</h3>
                                  <span
                                    style={{
                                      fontWeight: 700
                                    }}
                                  >
                                    ৳{totalPrice}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <button
                                className='clear-cart banner-btn'
                                onClick={e => {
                                  e.preventDefault();
                                  history.push('/');
                                }}
                                // onClick={this.handleToggleCartBar}
                              >
                                Add Products
                              </button>
                            )}
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
      )}

      {isAuthLoading && <Spinner />}
      <CheckoutSuccessModal
        isModalShown={isModalShown}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

const mapDispatchToProps = {
  logout: sessionOperations.logout
};

const mapStateToProps = state => ({
  cartItems: state.cart,
  totalPrice: cartSelectors.getTotalPriceOfCartItems(state.cart),
  session: state.session
});

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(Checkout));
