import React from 'react'

import './custombutton.styles.css'

export const CustomButton = ({ children, handleClick, ...otherProps }) => (
    <button className='custom-button' onClick={handleClick}  {...otherProps}>
        {children}
    </button>
);