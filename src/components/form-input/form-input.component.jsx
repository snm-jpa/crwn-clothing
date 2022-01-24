import React from 'react';

import './form-input.styles.scss'


const FormInput = ({ handleChange, label, ...otherProps }) => (
    <div className='group'>
        {/* {...otherProps} ---> will lay all props key-value pairs */}
        <input className='form-input' onChange={handleChange} {...otherProps} />
        {
            label ?
                (<label className={`${otherProps.value.length ? 'shrink' : ''} 
                    form-input-label`}>
                    {label}
                </label>)
                : null
        }
    </div>
)

export default FormInput;