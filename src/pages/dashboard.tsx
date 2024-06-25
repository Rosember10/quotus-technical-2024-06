import React from 'react'
import {
  Chart, LineElement, Title, Tooltip, Legend, LinearScale, CategoryScale, PointElement, BarElement, Filler,
} from "chart.js";
import style from '../styles/dashboard.module.css';
import Image from 'next/image';
import IconLink from '@/components/utils/IconLink/IconLink';
import { dataIconsLink } from '@/data/dataIconsLink';
import { MdOutlineAnalytics } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";


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







  return (
    <section className={style.container}>
      <div className={style.sidebar}>
        <Image src="/images/quotus-logo.png" alt='logo quotus' width={200} height={200} loading="lazy" />
        <div className={style.sidebarIcons}>
          {dataIconsLink.map((item, key) => (
            <IconLink text={item.text} Icon={item.icon} key={key} />
          ))}

        </div>
      </div>
      <div className={style.mainContent}>
        <div className={style.titleContainer}>
          <MdOutlineAnalytics />
          <h2 >Analytics</h2>
        </div>
        <div>

        </div>
      </div>
    </section>
  )
}

export default dashboard