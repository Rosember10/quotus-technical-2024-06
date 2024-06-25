import React from 'react'
import Image from 'next/image';
import style from './iconlink.module.css'
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';

interface IconlinkProps{
    text:string;
    Icon: IconType; 
    select?:boolean
}

const IconLink = ({text,Icon, select}:IconlinkProps) => {
  const router = useRouter()

  return (
    <div className={style.container} onClick={() => router.reload()}>
         <Icon className={select ? style.svgBlack : style.svg} />
         <span className={select ? style.boldBlack : style.text}>{text}</span>
    </div>
  )
}

export default IconLink