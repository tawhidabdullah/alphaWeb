import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { connect } from 'react-redux';
import { AuthButton } from '../../../components/Button';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHandleFetch } from '../../../hooks';
import { checkIfItemExistsInCache } from '../../../utils';
import { cacheOperations } from '../../../state/ducks/cache';

// import input fields
import { TextFeildGroup } from '../../../components/Field';

const initialValues = {
  phone: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
};

const validationSchema = Yup.object().shape({
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
  email: Yup.string().label('Email').email('Enter a valid email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
  address1: Yup.string()
    .label('Address line 1')
    .required()
    .min(3, 'Address line 1 must have at least 3 characters '),
  address2: Yup.string()
    .label('Address line 2')
    .required()
    .min(3, 'Address line 2 must have at least 3 characters '),
});

interface Props {
  history: any;
  addItemToCache: (any) => void;
  cache: any;
}

const Signup = ({ addItemToCache, cache, history }: Props) => {
  const [signupState, handlePost] = useHandleFetch({}, 'signup');

  const [selectedCountryValue, setSelectedCountryValue] = useState({
    value: 'Bangladesh',
    label: 'Bangladesh',
  });

  const [selectedCityValue, setSelectedCityValue] = useState({
    value: 'city',
    label: 'City',
  });

  const [countryListState, handleCountryListFetch] = useHandleFetch(
    [],
    'countryList'
  );

  const [cityListState, handleCityListFetch] = useHandleFetch([], 'cityList');

  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const handleSubmit = async (values, actions) => {
    const signupRes = await handlePost({
      body: {
        phone: values.phone,
        email: values.email,
        password: values.password,
        password2: values.passwordConfirmation,
        address1: values.address1,
        address2: values.address2,
        firstName: values.firstName,
        lastName: values.lastName,
        country: selectedCountryValue.value,
        city: selectedCityValue.value,
      },
    });

    // @ts-ignore
    if (signupRes && signupRes['status'] === 'ok') {
      history.push('/signin');
    }

    actions.setSubmitting(false);
  };

  console.log(
    'errors',
    signupState.error['error'] && signupState.error['error']
  );

  useEffect(() => {
    if (checkIfItemExistsInCache(`countryList`, cache)) {
      const countryList = cache['countryList'];
      setCountryList(countryList);
    } else {
      const getAndSetCountryList = async () => {
        const countryList = await handleCountryListFetch({});
        // @ts-ignore
        if (countryList) {
          // @ts-ignore
          setCountryList(countryList);
          addItemToCache({
            countryList: countryList,
          });
        }
      };

      getAndSetCountryList();
    }
  }, []);

  useEffect(() => {
    if (
      checkIfItemExistsInCache(`cityList/${selectedCountryValue.value}`, cache)
    ) {
      const cityList = cache[`cityList/${selectedCountryValue.value}`];
      setCityList(cityList);
      // @ts-ignore
      const cityValue = cityList.length > 0 && cityList[0];
      setSelectedCityValue({
        value: cityValue['name'],
        label: cityValue['name'],
      });
    } else {
      const getAndSetCityList = async () => {
        const cityList = await handleCityListFetch({
          urlOptions: {
            placeHolders: {
              country: selectedCountryValue.value,
            },
          },
        });
        // @ts-ignore
        if (cityList) {
          // @ts-ignore
          setCityList(cityList);
          // @ts-ignore
          const cityValue = cityList.length > 0 && cityList[0];
          setSelectedCityValue({
            value: cityValue['name'],
            label: cityValue['name'],
          });
          addItemToCache({
            [`cityList/${selectedCountryValue.value}`]: cityList,
          });
        }
      };

      getAndSetCityList();
    }
  }, [selectedCountryValue]);

  const handleSelectCountryChange = (value) => {
    setSelectedCountryValue(value);
  };

  const handleSelectCityChange = (value) => {
    setSelectedCityValue(value);
  };

  return (
    <div className='auth'>
      <h1
        className='display-4 text-center'
        style={{
          fontSize: '30px',
          color: '#17252a',
          fontWeight: 400,
        }}
      >
        Register
      </h1>
      <p
        className='lead text-center'
        style={{
          marginTop: '10px',
          fontSize: '17px',
          color: '#17252a',
          fontWeight: 400,
        }}
      >
        Register to MyStyle
      </p>
      <div className='formContainer'>
        <Formik
          initialValues={{ ...initialValues }}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
          validationSchema={validationSchema}
          validateOnChange={true}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            isSubmitting,
            touched,
            handleBlur,
          }) => (
            <>
              <div
                className='block-title authTitle'
                style={{
                  margin: '20px 0',
                }}
              >
                <span>Personal Information</span>
              </div>
              <TextFeildGroup
                label='FirstName'
                name='firstName'
                placeholder='Enter your firstName'
                type='text'
                value={values.firstName}
                onChange={handleChange('firstName')}
                errors={
                  errors.firstName ||
                  (!isSubmitting && signupState.error['error']['firstName'])
                }
              />

              <TextFeildGroup
                label='Lastname'
                name='lastName'
                placeholder='Enter your lastName'
                type='text'
                value={values.lastName}
                onChange={handleChange('lastName')}
                errors={
                  errors.lastName ||
                  (!isSubmitting && signupState.error['error']['lastName'])
                }
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
                    {!isSubmitting && signupState.error['error']['country']}
                  </div>
                </div>
              )}

              {cityList && (
                <div
                  style={{
                    margin: '20px 0',
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
                    {!isSubmitting && signupState.error['error']['city']}
                  </div>
                </div>
              )}

              <TextFeildGroup
                label='Address line 1'
                name='address1'
                placeholder='Enter your address line 1'
                type='text'
                value={values.address1}
                onChange={handleChange('address1')}
                errors={
                  errors.address1 ||
                  (!isSubmitting && signupState.error['error']['address1'])
                }
              />

              <TextFeildGroup
                label='Address line 2'
                name='address2'
                placeholder='Enter your address line 2'
                type='text'
                value={values.address2}
                onChange={handleChange('address2')}
                errors={
                  errors.address2 ||
                  (!isSubmitting && signupState.error['error']['address2'])
                }
              />

              <div
                className='block-title authTitle'
                style={{
                  margin: '20px 0',
                }}
              >
                <span>Contact Information</span>
              </div>

              <TextFeildGroup
                label='Phone'
                name='phone'
                placeholder='Enter your phone'
                type='text'
                value={values.phone}
                onChange={handleChange('phone')}
                errors={
                  errors.phone ||
                  (!isSubmitting && signupState.error['error']['phone'])
                }
              />

              <TextFeildGroup
                label='Email'
                name='email'
                placeholder='Enter your email'
                type='text'
                value={values.email}
                onChange={handleChange('email')}
                errors={
                  errors.email ||
                  (!isSubmitting && signupState.error['error']['email'])
                }
              />

              <TextFeildGroup
                label='Password'
                name='password'
                placeholder='Enter your password'
                type='password'
                value={values.password}
                onChange={handleChange('password')}
                errors={
                  errors.password ||
                  (!isSubmitting && signupState.error['error']['password'])
                }
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
                  (!isSubmitting && signupState.error['error']['password2'])
                }
              />

              <AuthButton
                onclick={handleSubmit}
                disabled={
                  !isValid ||
                  !values.firstName ||
                  !values.lastName ||
                  !values.password ||
                  !values.phone ||
                  !values.email ||
                  !values.passwordConfirmation ||
                  !values.address1
                }
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </AuthButton>
            </>
          )}
        </Formik>
      </div>
      <p
        className='lead text-center'
        style={{
          marginTop: '20px',
          fontSize: '15px',
          color: '#17252a',
          fontWeight: 400,
        }}
      >
        Have an account?{' '}
        <span
          onClick={() => history.push('/signin')}
          style={{
            color: '#6b21ac',
            cursor: 'pointer',
          }}
        >
          Signin{' '}
        </span>
      </p>
    </div>
  );
};

const mapDispatchToProps = {
  addItemToCache: cacheOperations.addItemToCache,
};

const mapStateToProps = (state) => ({
  cache: state.cache,
});

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(Signup));
