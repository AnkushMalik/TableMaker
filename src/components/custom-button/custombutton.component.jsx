import React from 'react'

export const CustomButton = ({ children, handleClick, ...otherProps }) => (
    <button onClick={handleClick}  {...otherProps}>
        {children}
    </button>
);