import React from 'react';

export default ({ input, label, meta: { touched, error } }) => {
    return (
        <div>
            <label>{label}</label>
            <input type="text" {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '25px' }}>
                {touched && error}
            </div>
        </div>
    );
};
