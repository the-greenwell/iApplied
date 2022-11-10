import React from 'react';

export const ValidatorError = ({message}) => {
    return (
        <div className="form-text text-danger alert-danger alert">
            {message}
        </div>
    )
}
