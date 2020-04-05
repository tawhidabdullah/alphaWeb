import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ShippingCheckout from './ShippingCheckout';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RadioGroup, ReversedRadioButton } from 'react-radio-buttons';
import { Button } from 'react-bootstrap';
import { cartSelectors } from '../../state/ducks/cart';
import { sessionOperations } from '../../state/ducks/session';
import SmallItem from '../../components/SmallItem';
import { useHandleFetch } from '../../hooks';
import { Spinner } from '../../components/Loading';
import { AuthButton } from '../../components/Button';
import Checkbox from '../../components/Checkbox';

// import checkout component
import CheckoutSuccessModal from './CheckoutSuccessModal';
import CheckoutForm from './CheckoutForm';

// validation schemeas

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchemaForNotSigninCod = Yup.object().shape({
  firstName: Yup.string()
    .label('Name')
    .required()
    .min(2, 'First name must have at least 2 characters '),
  lastName: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Last name must have at least 2 characters '),
  phone: Yup.string()
    .required('Please tell us your mobile number.')
    .max(13, 'Please enter a valid mobile number.'),
  email: Yup.string()
    .label('Email')
    .required('Email is required')
    .email('Enter a valid email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
  address1: Yup.string()
    .label('Address')
    .required()
    .min(3, 'Address must have at least 3 characters '),
  city: Yup.string()
    .label('City')
    .required()
    .min(3, 'City must have at least 3 characters '),
  country: Yup.string()
    .label('Country')
    .required()
    .min(3, 'Country must have at least 3 characters '),
});

const validationSchemaForCod = Yup.object().shape({
  firstName: Yup.string()
    .label('Name')
    .required()
    .min(2, 'First name must have at least 2 characters '),
  lastName: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Last name must have at least 2 characters '),
  phone: Yup.string()
    .required('Please tell us your mobile number.')
    .max(13, 'Please enter a valid mobile number.'),
  email: Yup.string()
    .label('Email')
    .required('Email is required')
    .email('Enter a valid email'),
  address1: Yup.string()
    .label('Address')
    .required()
    .min(3, 'Address must have at least 3 characters '),
  city: Yup.string()
    .label('City')
    .required()
    .min(3, 'City must have at least 3 characters '),
  country: Yup.string()
    .label('Country')
    .required()
    .min(3, 'Country must have at least 3 characters '),
});

const validationSchemaForNotSigninOtherPaymentMethods = Yup.object().shape({
  firstName: Yup.string()
    .label('Name')
    .required()
    .min(2, 'First name must have at least 2 characters '),
  lastName: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Last name must have at least 2 characters '),
  phone: Yup.string()
    .required('Please tell us your mobile number.')
    .max(13, 'Please enter a valid mobile number.'),
  email: Yup.string()
    .label('Email')
    .required('Email is required')
    .email('Enter a valid email'),
  address1: Yup.string()
    .label('Address')
    .required()
    .min(3, 'Address must have at least 3 characters '),
  city: Yup.string()
    .label('City')
    .required()
    .min(3, 'City must have at least 3 characters '),
  country: Yup.string()
    .label('Country')
    .required()
    .min(3, 'Country must have at least 3 characters '),
  paymentNumber: Yup.string()
    .required('Please tell us your mobile number.')
    .matches(phoneRegExp, 'Please enter a valid mobile number.'),
  paymentId: Yup.string().label('Payment Id').required('Payment is Required'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

const validationSchemaForOtherPaymentMethods = Yup.object().shape({
  firstName: Yup.string()
    .label('Name')
    .required()
    .min(2, 'First name must have at least 2 characters '),
  lastName: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Last name must have at least 2 characters '),
  phone: Yup.string()
    .required('Please tell us your mobile number.')
    .max(13, 'Please enter a valid mobile number.'),
  email: Yup.string()
    .label('Email')
    .required('Email is required')
    .email('Enter a valid email'),
  address1: Yup.string()
    .label('Address')
    .required()
    .min(3, 'Address must have at least 3 characters '),
  city: Yup.string()
    .label('City')
    .required()
    .min(3, 'City must have at least 3 characters '),
  country: Yup.string()
    .label('Country')
    .required()
    .min(3, 'Country must have at least 3 characters '),
  paymentNumber: Yup.string()
    .required('Please tell us your mobile number.')
    .matches(phoneRegExp, 'Please enter a valid mobile number.'),
  paymentId: Yup.string().label('Payment Id').required('Payment is Required'),
});

const shippingAddressValidationSchema = Yup.object().shape({
  shippingFirstName: Yup.string()
    .label('Shipping FirstName')
    .required()
    .min(2, 'Shipping FirstName name must have at least 2 characters '),
  shippingLastName: Yup.string()
    .label('Shipping LastName')
    .required()
    .min(2, 'Shipping LastName must have at least 2 characters '),
  shippingPhone: Yup.string()
    .required('Please tell us your mobile number.')
    .max(13, 'Please enter a valid mobile number.'),
  shippingEmail: Yup.string()
    .label('Email')
    .required('Email is required')
    .email('Enter a valid email'),
  shippingAddress1: Yup.string()
    .label('shipping Address')
    .required()
    .min(3, 'Shipping Address must have at least 3 characters '),
  shippingCity: Yup.string()
    .label('Shipping City')
    .required()
    .min(3, 'Shipping City must have at least 3 characters '),
  shippingCountry: Yup.string()
    .label('Shipping Country')
    .required()
    .min(3, 'Shipping Country must have at least 3 characters '),
});

const shippingAddressInitialValues = {
  shippingFirstName: '',
  shippingLastName: '',
  shippingCountry: '',
  shippingCity: '',
  shippingAddress1: '',
  shippingPhone: '',
  shippingEmail: '',
};

const otherPaymentMethodIntialValues = {
  phone: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  address1: '',
  paymentNumber: '',
  paymentId: '',
};

const otherPaymentMethodNotSigninIntialValues = {
  phone: '',
  email: '',
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  address1: '',
  paymentNumber: '',
  paymentId: '',
};

const codInitialValues = {
  phone: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  address1: '',
};

const codInitialNotSigninValues = {
  phone: '',
  email: '',
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  address1: '',
};

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
  logout,
}: Props) => {
  const [paymentMethod, setPaymentMethod] = React.useState('cod');
  const [isModalShown, setIsModalShown] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [
    isUseAccountBillingAddresss,
    setIsUseAccountBillingAddresss,
  ] = useState(false);

  const [isShipToDifferentAddress, setIsShipToDifferentAddress] = useState(
    false
  );
  const [fruits, setFruits] = useState<string[]>(['apple', 'watermelon']);

  const [customerDetailState, handleCustomerDetailFetch] = useHandleFetch(
    {},
    'getCurrentCustomerData'
  );

  const [createStateState, handleCreateOrderFetch] = useHandleFetch(
    {},
    'createOrder'
  );

  useEffect(() => {
    const getCheckAndSetCustomerData = async () => {
      setIsAuthLoading(true);
      const customerData = await handleCustomerDetailFetch({});
      // @ts-ignore
      if (!customerData) {
        // history.push('/signin');
        logout();
      }
      setIsAuthLoading(false);
    };
    if (!session['isAuthenticated']) {
      getCheckAndSetCustomerData();
    }
  }, [session['isAuthenticated']]);

  const handleCloseModal = () => {
    setIsModalShown(false);
    history.push('/');
  };

  const onRadioGroupChange = (value) => {
    setPaymentMethod(value);
  };

  const handleOrder = (values, actions) => {
    if (values) {
      if (paymentMethod !== 'cod') {
        const createOrderData = {
          phone: values.phone,
          email: values.email,
          ...(session['isAuthenticated'] && {
            password: values.password,
            password2: values.passwordConfirmation,
          }),
          address1: values.address1,
          firstName: values.firstName,
          lastName: values.lastName,
          country: values.country,
          city: values.city,
          paymentMethod: paymentMethod,
          paymentAccountNumber: values.paymentNumber,
          transactionId: values.paymentId,
          useAccountBillingAddress: isUseAccountBillingAddresss,
          shipToDifferentAddress: isShipToDifferentAddress,

          ...(isShipToDifferentAddress && {
            shippingFirstName: values.shippingFirstName,
            shippingLastName: values.shippingLastName,
            shippingCountry: values.shippingCountry,
            shippingCity: values.shippingCity,
            shippingAddress1: values.shippingAddress1,
            shippingPhone: values.shippingPhone,
            shippingEmail: values.shippingEmail,
          }),
        };

        handleCreateOrderFetch({
          body: createOrderData,
        });
      } else {
        const createOrderData = {
          phone: values.phone,
          email: values.email,
          ...(session['isAuthenticated'] && {
            password: values.password,
            password2: values.passwordConfirmation,
          }),
          address1: values.address1,
          firstName: values.firstName,
          lastName: values.lastName,
          country: values.country,
          city: values.city,
          paymentMethod: 'cod',
          useAccountBillingAddress: isUseAccountBillingAddresss,
          shipToDifferentAddress: isShipToDifferentAddress,

          ...(isShipToDifferentAddress && {
            shippingFirstName: values.shippingFirstName,
            shippingLastName: values.shippingLastName,
            shippingCountry: values.shippingCountry,
            shippingCity: values.shippingCity,
            shippingAddress1: values.shippingAddress1,
            shippingPhone: values.shippingPhone,
            shippingEmail: values.shippingEmail,
          }),
        };

        handleCreateOrderFetch({
          body: createOrderData,
        });
      }
    }
    actions.setSubmitting(false);
  };

  const getInitialValues = () => {
    if (session.isAuthenticated) {
      if (paymentMethod === 'cod') {
        return codInitialValues;
      } else {
        return otherPaymentMethodIntialValues;
      }
    } else {
      if (paymentMethod === 'cod') {
        return codInitialNotSigninValues;
      } else {
        return otherPaymentMethodNotSigninIntialValues;
      }
    }
  };

  const getUltimateInitialValue = () => {
    let initialValue = getInitialValues();
    if (isShipToDifferentAddress) {
      initialValue = { ...initialValue, ...shippingAddressInitialValues };
    }

    return initialValue;
  };

  const getValidationSchema = () => {
    if (session.isAuthenticated) {
      if (paymentMethod === 'cod') {
        return validationSchemaForCod;
      } else {
        return validationSchemaForOtherPaymentMethods;
      }
    } else {
      if (paymentMethod === 'cod') {
        return validationSchemaForNotSigninCod;
      } else {
        return validationSchemaForNotSigninOtherPaymentMethods;
      }
    }
  };

  const getUltimateValidationSchema = () => {
    let validationSchema = getValidationSchema();
    if (isShipToDifferentAddress) {
      validationSchema = validationSchema.concat(
        shippingAddressValidationSchema
      );
    }

    return validationSchema;
  };

  return (
    <>
      {!isAuthLoading && (
        <Formik
          enableReinitialize={isShipToDifferentAddress ? false : true}
          initialValues={getUltimateInitialValue()}
          // @ts-ignore
          onSubmit={(values, actions) => handleOrder(values, actions)}
          validationSchema={getUltimateValidationSchema()}
        >
          {({
            handleChange,
            values,
            errors,
            isValid,
            isSubmitting,
            handleSubmit,
            touched,
            handleBlur,
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
                                  height: '20px',
                                }}
                              >
                                <img
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                  }}
                                  src={require('../../assets/paymentMethodImages/nagadIcon.png')}
                                />
                              </div>
                            </ReversedRadioButton>
                            <ReversedRadioButton value='rocket' padding={12}>
                              <div
                                style={{
                                  width: '100px',
                                  height: '20px',
                                }}
                              >
                                <img
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                  }}
                                  src={require('../../assets/paymentMethodImages/rocketIcon.jpg')}
                                />
                              </div>
                            </ReversedRadioButton>
                            <ReversedRadioButton value='bkash' padding={12}>
                              <div
                                style={{
                                  width: '100px',
                                  height: '20px',
                                }}
                              >
                                <img
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                  }}
                                  src={require('../../assets/paymentMethodImages/bkashIcon.png')}
                                />
                              </div>
                            </ReversedRadioButton>
                          </RadioGroup>
                        </div>
                        <div
                          style={{
                            marginTop: '30px',
                          }}
                        >
                          {session.isAuthenticated ? (
                            <Checkbox
                              name={'useAccountBillingAddresss'}
                              label={'Use Account Billing Addresss'}
                              inputType={'checkbox'}
                              value={'useAccountBillingAddresss'}
                              onChange={(e) =>
                                setIsUseAccountBillingAddresss(e.target.checked)
                              }
                            />
                          ) : (
                            ''
                          )}

                          {!isUseAccountBillingAddresss ? (
                            <>
                              <h2
                                style={{
                                  fontSize: '20px',
                                  color: '#444',
                                  marginTop: '20px',
                                  fontWeight: 400,
                                }}
                              >
                                Billing Address
                              </h2>
                              <CheckoutForm
                                isSubmitting={isSubmitting}
                                paymentMethod={paymentMethod}
                                values={values}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                touched={touched}
                                errors={errors}
                                serverErrors={{}}
                                isAuthenticated={session.isAuthenticated}
                              />
                            </>
                          ) : (
                            ''
                          )}

                          <Checkbox
                            name={'shipToDifferentAddress'}
                            label={'Ship To Different Address'}
                            inputType={'checkbox'}
                            value={'shipToDifferentAddress'}
                            onChange={(e) =>
                              setIsShipToDifferentAddress(e.target.checked)
                            }
                          />

                          {isShipToDifferentAddress ? (
                            <>
                              <h2
                                style={{
                                  fontSize: '20px',
                                  color: '#444',
                                  fontWeight: 400,
                                  margin: '30px 0',
                                }}
                              >
                                Shipping Address
                              </h2>
                              <ShippingCheckout
                                isSubmitting={isSubmitting}
                                paymentMethod={paymentMethod}
                                values={values}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                touched={touched}
                                errors={errors}
                                serverErrors={{}}
                                isAuthenticated={session.isAuthenticated}
                              />
                            </>
                          ) : (
                            ''
                          )}

                          <div
                            style={{
                              width: '100px',
                            }}
                          >
                            <AuthButton
                              onclick={handleSubmit}
                              disabled={!isValid}
                            >
                              {isSubmitting ? 'Ordering...' : 'Order'}
                            </AuthButton>
                          </div>
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
                                borderBottom: '2px solid #ccc',
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
                                      fontWeight: 700,
                                    }}
                                  >
                                    ৳{totalPrice}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <button
                                className='clear-cart banner-btn'
                                onClick={(e) => {
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
  logout: sessionOperations.logout,
};

const mapStateToProps = (state) => ({
  cartItems: state.cart,
  totalPrice: cartSelectors.getTotalPriceOfCartItems(state.cart),
  session: state.session,
});

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(Checkout));

/* 
Form kinds: 

1. if useAccountBillingAddresss,true,then from frontend following fields will be sent => 
 paymentMethod, transactionId, paymentAccountNumber
	// note about use billing address:
		useAccountBillingAddresss checkboxbox, will not be shown, if user is not signin. 
		if useAccountBillingAddresss checkbox is true, then billing billing address related/fields
		will be hidden. 
		

2. if shipToDifferentAddress,true,then from frontend following fields will be sent => 
shippingFirstName, shippingLastName, shippingCountry, shippingCity,  shippingAddress1,shippingAddress2, 
shippingZipCode, shippingPhone, shippingEmail, shippingAdditionalInfo
	// note about use shipToDifferentAddress:
	if shipToDifferentAddress is true, then fields related to shipToDifferentAddress will be shown 
	otherwise they will be hidden. 


3. if the user is not signed in then, fields related to billing address will be shown,with 2 additional fields: 
password, password2	


// shipToDifferentAddress and useAccountBillingAddresss they both can be true together. 


*/
