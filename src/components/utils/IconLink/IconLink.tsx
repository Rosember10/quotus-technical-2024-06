import React from 'react'
import Image from 'next/image';
import style from './iconlink.module.css'
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';

// Define props for IconLink component
interface IconlinkProps {
  text: string;
  Icon: IconType;
  select?: boolean;
  route?: string;
}

const IconLink = ({ text, Icon, select, route }: IconlinkProps) => {
  const router = useRouter();
  
   // Handle click event to navigate to the route if provided
  const handleClick = () => {
    if (route) {
      router.push(`${route}`)
    }
  }

  return (
    <div className={style.container} onClick={handleClick}>
      <Icon className={select ? style.svgBlack : style.svg} />
      <span className={select ? style.boldBlack : style.text}>{text}</span>
    </div>
  )
}

export default IconLink