import React from 'react';
import './Input.css';

const Input = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    unit,
    className = '',
    ...props
}) => {
    return (
        <div className={`input-wrapper ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <div className="input-field">
                <input
                    type={type}
                    className="custom-input"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    {...props}
                />
                {unit && <span className="input-unit">{unit}</span>}
            </div>
        </div>
    );
};

export default Input;
