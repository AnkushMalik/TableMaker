import React from 'react'
import TableMaker from '../components/table-maker/table-maker.component'

import './home.styles.css'


export const HomePage = () => {
    let refreshPage = () => {
        window.location.reload();
    }
    return (
        <div className="homepage">
            <h1 onClick={refreshPage}> TableMaker </h1>
            <TableMaker />
        </div >
    )
}
