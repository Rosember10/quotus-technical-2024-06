import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import style from './checkList.module.css'

// Define the interface for the component's props
interface CheckListProps{
    text:string
}

const CheckList = ({text}:CheckListProps) => {
  return (
    <div className={style.container}>
        <FaCheckCircle />
        <span>{text}</span>
    </div>
  )
}

export default CheckList