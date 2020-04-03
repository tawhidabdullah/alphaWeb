import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthButton } from '../../../components/Button';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHandleFetch } from '../../../hooks';

// import input fields
import { TextFeildGroup } from '../../../components/Field';

const initialValues = {
  phone: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  address1: ''
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .label('Name')
    .required()
    .min(2, 'First name must have at least 2 characters '),
  lastName: Yup.string()
    .label('Name')
    .required()
    .min(2, 'First name must have at least 2 characters '),
  phone: Yup.string()
    .required('Please tell us your mobile number.')
    .max(13, 'Please enter a valid mobile number.'),
  email: Yup.string()
    .label('Email')
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
    .min(3, 'Country must have at least 3 characters ')
});

interface Props {
  history: any;
}

const Signup = (props: Props) => {
  const [signupState, handlePost] = useHandleFetch({}, 'signup');

  const handleSubmit = async (values, actions) => {
    const signupRes = await handlePost({
      body: {
        phone: values.phone,
        email: values.email,
        password: values.password,
        password2: values.passwordConfirmation,
        address1: values.address1,
        firstName: values.firstName,
        lastName: values.lastName,
        country: values.country,
        city: values.city
      }
    });

    // @ts-ignore
    if (signupRes && signupRes['status'] === 'ok') {
      props.history.push('/signin');
    }
    console.log('signupRes', signupRes);

    actions.setSubmitting(false);
  };

  console.log(
    'errors',
    signupState.error['error'] && signupState.error['error']
  );

  return (
    <div className='auth'>
      <h1
        className='display-4 text-center'
        style={{
          fontSize: '30px',
          color: '#17252a',
          fontWeight: 400
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
          fontWeight: 400
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
            handleBlur
          }) => (
            <>
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

              <TextFeildGroup
                label='Phone'
                name='phone'
                placeholder='Enter your phone'
                type='number'
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
                label='Address'
                name='address1'
                placeholder='Enter your address'
                type='text'
                value={values.address1}
                onChange={handleChange('address1')}
                errors={
                  errors.address1 ||
                  (!isSubmitting && signupState.error['error']['address1'])
                }
              />

              <TextFeildGroup
                label='City'
                name='city'
                placeholder='Enter your city'
                type='text'
                value={values.city}
                onChange={handleChange('city')}
                errors={
                  errors.city ||
                  (!isSubmitting && signupState.error['error']['city'])
                }
              />

              <TextFeildGroup
                label='Country'
                name='country'
                placeholder='Enter your country'
                type='text'
                value={values.country}
                onChange={handleChange('country')}
                errors={
                  errors.country ||
                  (!isSubmitting && signupState.error['error']['country'])
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
                  !values.address1 ||
                  !values.city ||
                  !values.country
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
          fontWeight: 400
        }}
      >
        Have an account?{' '}
        <span
          onClick={() => props.history.push('/signin')}
          style={{
            color: '#6b21ac',
            cursor: 'pointer'
          }}
        >
          Signin{' '}
        </span>
      </p>
    </div>
  );
};

export default withRouter(Signup);
