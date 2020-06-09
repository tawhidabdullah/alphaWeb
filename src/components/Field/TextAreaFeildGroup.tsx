import React, { useState } from 'react';
import classnames from 'classnames';

interface Props {
    name: string;
    placeholder?: string;
    info?: string;
    type?: string;
    onChange?: (e: any) => void;
    value: string;
    disabled?: boolean;
    errors?: any;
    label?: string;
    onInput?: (e: any) => void;
}

const TextAreaFeildGroup = ({
    name,
    placeholder,
    info,
    type,
    onChange,
    value,
    disabled,
    errors,
    label,
    onInput,
}: Props) => {
    const [fieldType, setfieldType] = useState(type);

    return (
        <div className='frm'>
            {label ? <label className='label' style={{
                marginBottom: '10px',
                color: '#555'
            }}>{label}</label> : ''}

            <textarea
                style={{
                    fontSize: '15px',
                }}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': errors,
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                id='inputFeild'
                onInput={onInput}
            />

            {type === 'password' && (
                <span
                    className='password-eye'
                    onClick={() =>
                        setfieldType((fieldType) =>
                            fieldType === 'text' ? 'password' : 'text'
                        )
                    }
                >
                    <i
                        className={fieldType === 'text' ? 'fa fa-eye-slash' : 'fa fa-eye'}
                    ></i>
                </span>
            )}
            {info && (
                <small
                    className='form-text text-muted'
                    style={{
                        marginTop: '10px',
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

export default TextAreaFeildGroup;
