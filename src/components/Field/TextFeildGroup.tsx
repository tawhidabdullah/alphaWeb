import React from 'react';
import classnames from 'classnames';

interface Props {
  name: string;
  placeholder: string;
  info: string;
  type: string;
  onChange: () => void;
  value: string;
  disabled: boolean;
  errors: any;
  label: string;
}

const TextFeildGroup = ({
  name,
  placeholder,
  info,
  type,
  onChange,
  value,
  disabled,
  errors,
  label
}: Props) => {
  return (
    <div className='form'>
      {label ? <label className='label'>{label}</label> : ''}

      <input
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': errors
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        id='inputFeild'
      />
      {info && (
        <small
          className='form-text text-muted'
          style={{
            marginTop: '10px'
          }}
        >
          {' '}
          {info}{' '}
        </small>
      )}
      {errors && <div className='invalid-feedback'> {errors} </div>}
    </div>
  );
};

export default TextFeildGroup;
