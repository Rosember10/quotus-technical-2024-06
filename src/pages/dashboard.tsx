import React from 'react'
import style from '../styles/dashboard.module.css';
import Image from 'next/image';
import IconLink from '@/components/utils/IconLink/IconLink';


const dashboard = () => {

  const dataIconsLink = [
    {
      text:'General' , 
      icon:'/images/icons/general.png'
    },
    {
      text:'Settings' , 
      icon:'/images/icons/settings.png'
    },
    {
      text:'Import / Exports ' , 
      icon:'/images/icons/import.png'
    },
    {
      text:'Analytics' , 
      icon:'/images/icons/analytics.png'
    },
    {
      text:'Profile' , 
      icon:'/images/icons/user.png'
    },
  ]

  return (
    <section className={style.container}>
      <div className={style.sidebar}>
        <Image src="/images/quotus-logo.png" alt='logo quotus' width={200} height={200} loading="lazy" />
        <div className={style.sidebarIcons}>
          {dataIconsLink.map((item,key)=>(
            <IconLink text={item.text} icon={item.icon} key={key}/>
          ))}
        </div>
      </div>
      <div className={style.mainContent}>

      </div>
    </section>
  )
}

export default dashboard