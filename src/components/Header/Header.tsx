import React from 'react'
import style from './header.module.css'
import ActionButton from '../utils/ActionButton/ActionButton';
import { IoIosArrowRoundForward } from "react-icons/io";


const Header = () => {
    return (
        <div className={style.container}>
            <h1> Input financial. <br /> Output intelligence. </h1>
            <p>QUOTUS® transforms your monthly OEM financial statements 
            into actionable business insights for dealerships and groups. </p>
            <ActionButton text="Try our demo" Icon={IoIosArrowRoundForward} route='/dashboard' />
        </div>
    )
}

export default Header