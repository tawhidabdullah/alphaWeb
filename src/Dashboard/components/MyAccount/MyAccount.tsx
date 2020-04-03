import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { TextFeildGroup } from '../../../components/Field';
import { useHandleFetch } from '../../../hooks';
import { AuthButton } from '../../../components/Button';

interface Props {
  customerDetail: any;
}

const personalInfoInitialValues = {
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  address1: ''
};

const mobilePhoneInitialValues = {
  phone: ''
};

const emailAddressInitialValues = {
  email: ''
};

const personalInfoValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .label('Name')
    .required()
    .min(2, 'First name must have at least 2 characters '),
  lastName: Yup.string()
    .label('Name')
    .required()
    .min(2, 'First name must have at least 2 characters '),
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

const mobilePhoneValidationSchema = Yup.object().shape({
  phone: Yup.string().required()
});

const emailAddressValidationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
});

const MyAccount = ({ customerDetail }: Props) => {
  const [isPersonalInfoEdit, setIsPersonalInfoEdit] = useState(false);
  const [isMobilePhoneEdit, setIsMobilePhoneEdit] = useState(false);
  const [isEmailAddressEdit, setIsEmailAddressEdit] = useState(false);
  const [customerData, setCustomerData] = useState(customerDetail);
  const [
    updateCurrentCustomerData,
    handleUpdateCurrentUserData
  ] = useHandleFetch({}, 'updateCurrentCustomerData');

  const handleUpdateProfileData = async (updatedValues, actions, type) => {
    const updatedCustomerRes = await handleUpdateCurrentUserData({
      body: {
        ...updatedValues
      }
    });

    if (updatedCustomerRes['status'] === 'ok') {
      actions.setSubmitting(false);
      setCustomerData(updatedValues);
      if (type === 'personalinfo') {
        setIsPersonalInfoEdit(false);
      } else if (type === 'mobile') {
        setIsMobilePhoneEdit(false);
      } else if (type === 'address') {
        setIsEmailAddressEdit(false);
      }
    }
  };

  return (
    <div className='myAccount'>
      <div className='myAccountSectionHeader'>
        <h2 className='myAccountSectionHeader-main'>Personal Information</h2>
        <h2
          className='myAccountSectionHeader-button'
          onClick={() => setIsPersonalInfoEdit(value => !value)}
        >
          {isPersonalInfoEdit ? 'Remove Edit' : 'Change Information'}
        </h2>
      </div>
      <div className='myAccountSectionForm'>
        {isPersonalInfoEdit && (
          <Formik
            initialValues={
              isPersonalInfoEdit && Object.keys(customerData).length > 0
                ? customerData
                : personalInfoInitialValues
            }
            onSubmit={(values, actions) =>
              handleUpdateProfileData(values, actions, 'personalinfo')
            }
            validationSchema={personalInfoValidationSchema}
            validateOnChange={true}
            enableReinitialize={true}
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
                    (!isSubmitting &&
                      updateCurrentCustomerData.error['error']['firstName'])
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
                    (!isSubmitting &&
                      updateCurrentCustomerData.error['error']['lastName'])
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
                    (!isSubmitting &&
                      updateCurrentCustomerData.error['error']['address1'])
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
                    (!isSubmitting &&
                      updateCurrentCustomerData.error['error']['city'])
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
                    (!isSubmitting &&
                      updateCurrentCustomerData.error['error']['country'])
                  }
                />

                <div
                  style={{
                    width: '100px'
                  }}
                >
                  <AuthButton
                    onclick={handleSubmit}
                    disabled={
                      !isValid ||
                      !values.firstName ||
                      !values.lastName ||
                      !values.address1 ||
                      !values.city ||
                      !values.country
                    }
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </AuthButton>
                </div>
              </>
            )}
          </Formik>
        )}

        {!isPersonalInfoEdit && Object.keys(customerData).length > 0 && (
          <>
            {customerData['firstName'] && (
              <TextFeildGroup
                label='Firstname'
                name='firstName'
                value={customerData['firstName']}
                disabled={true}
              />
            )}

            {customerData['lastName'] && (
              <TextFeildGroup
                label='Firstname'
                name='firstName'
                value={customerData['lastName']}
                disabled={true}
              />
            )}

            {customerData['country'] && (
              <TextFeildGroup
                label='Country'
                name='country'
                value={customerData['country']}
                disabled={true}
              />
            )}

            {customerData['city'] && (
              <TextFeildGroup
                label='City'
                name='city'
                value={customerData['city']}
                disabled={true}
              />
            )}

            {customerData['address1'] && (
              <TextFeildGroup
                label='Address'
                name='address1'
                value={customerData['address1']}
                disabled={true}
              />
            )}
          </>
        )}
      </div>
      <div className='myAccountSectionHeader'>
        <h2 className='myAccountSectionHeader-main'>Mobile number</h2>
        <h2
          className='myAccountSectionHeader-button'
          onClick={() => setIsMobilePhoneEdit(value => !value)}
        >
          {isMobilePhoneEdit ? 'Remove Edit' : 'Change Mobile Phone'}
        </h2>
      </div>
      <div className='myAccountSectionForm'>
        {isMobilePhoneEdit && (
          <Formik
            initialValues={
              isMobilePhoneEdit && Object.keys(customerData).length > 0
                ? customerData
                : mobilePhoneInitialValues
            }
            onSubmit={(values, actions) =>
              handleUpdateProfileData(values, actions, 'mobile')
            }
            validationSchema={mobilePhoneValidationSchema}
            validateOnChange={true}
            enableReinitialize={true}
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
                  label='Phone'
                  name='phone'
                  placeholder='Enter your phone'
                  type='number'
                  value={values.phone}
                  onChange={handleChange('phone')}
                  errors={
                    errors.phone ||
                    (!isSubmitting &&
                      updateCurrentCustomerData.error['error']['phone'])
                  }
                />

                <div
                  style={{
                    width: '100px'
                  }}
                >
                  <AuthButton
                    onclick={handleSubmit}
                    disabled={!isValid || !values.phone}
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </AuthButton>
                </div>
              </>
            )}
          </Formik>
        )}

        {!isMobilePhoneEdit && Object.keys(customerData).length > 0 && (
          <>
            {customerData['phone'] && (
              <TextFeildGroup
                label='Phone'
                name='phone'
                value={customerData['phone']}
                disabled={true}
              />
            )}
          </>
        )}
      </div>
      <div className='myAccountSectionHeader'>
        <h2 className='myAccountSectionHeader-main'>Email Address</h2>
        <h2
          className='myAccountSectionHeader-button'
          onClick={() => setIsEmailAddressEdit(value => !value)}
        >
          {isEmailAddressEdit ? 'Remove Edit' : 'Change Email Address'}
        </h2>
      </div>
      <div className='myAccountSectionForm'>
        {isEmailAddressEdit && (
          <Formik
            initialValues={
              isEmailAddressEdit && Object.keys(customerData).length > 0
                ? customerData
                : emailAddressInitialValues
            }
            onSubmit={(values, actions) =>
              handleUpdateProfileData(values, actions, 'address')
            }
            validationSchema={emailAddressValidationSchema}
            validateOnChange={true}
            enableReinitialize={true}
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
                  label='Email'
                  name='email'
                  placeholder='Enter your email'
                  type='text'
                  value={values.email}
                  onChange={handleChange('email')}
                  errors={
                    errors.email ||
                    (!isSubmitting &&
                      updateCurrentCustomerData.error['error']['email'])
                  }
                />
                <div
                  style={{
                    width: '100px'
                  }}
                >
                  <AuthButton
                    onclick={handleSubmit}
                    disabled={!isValid || !values.email}
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </AuthButton>
                </div>
              </>
            )}
          </Formik>
        )}

        {!isEmailAddressEdit && Object.keys(customerData).length > 0 && (
          <>
            {customerData['email'] && (
              <TextFeildGroup
                label='Email'
                name='email'
                value={customerData['email']}
                disabled={true}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
