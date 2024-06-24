import React from 'react'
import Image from 'next/image';
import style from './iconlink.module.css'
import { IconType } from 'react-icons';

interface IconlinkProps{
    text:string;
    Icon: IconType; 
}

const IconLink = ({text,Icon}:IconlinkProps) => {
  return (
    <div className={style.container}>
         <Icon className={text === 'Analytics' ? style.svgBlack : style.svg} />
         <span className={text === 'Analytics' ? style.boldBlack : style.text}>{text}</span>
    </div>
  )
}

export default IconLink