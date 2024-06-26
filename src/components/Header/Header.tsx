import React from 'react'
import style from './header.module.css'

const Header = () => {
    return (
        <div className={style.container}>
            <h1> Input financial. <br /> Output intelligence. </h1>
            <p>QUOTUS® transforms your monthly OEM financial statements 
            into actionable business insights for dealerships and groups. </p>
        </div>
    )
}

export default Header