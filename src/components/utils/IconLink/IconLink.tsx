import React from 'react'
import Image from 'next/image';
import style from './iconlink.module.css'

interface IconlinkProps{
    text:string;
    icon:string;
}

const IconLink = ({text,icon}:IconlinkProps) => {
  return (
    <div className={style.container}>
         <Image src={icon} alt='icon' width={22} height={22} />
         <span className={text === 'Analytics' ? style.boldBlack : style.text}>{text}</span>
    </div>
  )
}

export default IconLink