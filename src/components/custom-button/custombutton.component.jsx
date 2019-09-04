import React from 'react'

export const CustomButton = ({ children, handleClick, idtoUpdate }) => (
    <button onClick={() => handleClick(idtoUpdate)}>
        {children}
    </button>
);