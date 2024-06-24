import React from 'react'
import {
  Chart,LineElement,Title,Tooltip,Legend,LinearScale,CategoryScale,PointElement, BarElement,Filler,
} from "chart.js";
import style from '../styles/dashboard.module.css';
import Image from 'next/image';
import IconLink from '@/components/utils/IconLink/IconLink';
import { TbSmartHome } from "react-icons/tb";
import { LuSettings } from "react-icons/lu";
import { LuDownloadCloud } from "react-icons/lu";
import { MdOutlineAnalytics } from "react-icons/md";
import { CiUser } from "react-icons/ci";


Chart.register(
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Filler,
);

const dashboard = () => {





  const dataIconsLink = [
    {
      text:'General' , 
      icon:TbSmartHome
    },
    {
      text:'Settings' , 
      icon:LuSettings
    },
    {
      text:'Import / Exports ' , 
      icon:LuDownloadCloud
    },
    {
      text:'Analytics' , 
      icon:MdOutlineAnalytics
    },
    {
      text:'Profile' , 
      icon:CiUser
    },
  ]

  return (
    <section className={style.container}>
      <div className={style.sidebar}>
        <Image src="/images/quotus-logo.png" alt='logo quotus' width={200} height={200} loading="lazy" />
        <div className={style.sidebarIcons}>
          {dataIconsLink.map((item,key)=>(
            <IconLink text={item.text} Icon={item.icon} key={key}/>
          ))}
        </div>
      </div>
      <div className={style.mainContent}>
          <h2>Analytics</h2>
      </div>
    </section>
  )
}

export default dashboard