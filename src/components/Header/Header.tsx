import React from 'react'
import style from './header.module.css'
import ActionButton from '../utils/ActionButton/ActionButton';
import { IoIosArrowRoundForward } from "react-icons/io";
import Image from 'next/image';


const Header = () => {
    return (
        <div className={style.container}>
            <h1> Input financial. <br /> Output intelligence. </h1>
            <p>QUOTUS® transforms your monthly OEM financial statements
                into actionable business insights for dealerships and groups. </p>
            <ActionButton text="Try our demo" Icon={IoIosArrowRoundForward} route='/dashboard' />
            <div className={style.imageContainer}>
                <Image src="/images/demo-software.webp" alt='logo quotus' width={900} height={700} priority={true} />
            </div>
        </div>
    )
}

export default Header