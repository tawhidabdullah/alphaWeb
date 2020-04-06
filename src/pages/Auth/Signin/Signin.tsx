import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { AuthButton } from '../../../components/Button';
import * as Yup from 'yup';
import { useHandleFetch } from '../../../hooks';
import { sessionOperations } from '../../../state/ducks/session';

// import input fields
import { TextFeildGroup } from '../../../components/Field';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .label('Username')
    .required('Username must have at least 3 characters'),
  password: Yup.string().label('Password').required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

interface Props {
  history: any;
  login: () => void;
}

const Signin = (props: Props) => {
  const [signinState, handlePost] = useHandleFetch({}, 'signin');

  const handleSubmit = async (values, actions) => {
    const signinRes = await handlePost({
      body: {
        username: values.username,
        password: values.password,
      },
    });

    // @ts-ignore
    if (signinRes && signinRes['status'] === 'ok') {
      props.login();
      props.history.push('/dashboard');
    }

    actions.setSubmitting(false);
  };

  console.log(
    'errors',
    signinState.error['error'] && signinState.error['error']
  );

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
        Signin
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
        Signin to MyStyle
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
              <TextFeildGroup
                label='Username'
                name='username'
                placeholder='Enter your username'
                type='text'
                value={values.username}
                onChange={handleChange('username')}
                errors={
                  errors.username ||
                  (!isSubmitting && signinState.error['error']['username'])
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
                  (!isSubmitting && signinState.error['error']['password'])
                }
              />

              <AuthButton
                onclick={handleSubmit}
                disabled={!isValid || !values.username || !values.password}
              >
                {isSubmitting ? 'Signin...' : 'Signin'}
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
        Don't have an account?{' '}
        <span
          onClick={() => props.history.push('/signup')}
          style={{
            color: '#6b21ac',
            cursor: 'pointer',
          }}
        >
          Signup{' '}
        </span>
      </p>
    </div>
  );
};

const mapDispatchToProps = {
  login: sessionOperations.login,
};

// @ts-ignore
export default connect(
  null,
  mapDispatchToProps
  // @ts-ignore
)(withRouter(Signin));
