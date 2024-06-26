import { TbSmartHome } from "react-icons/tb";
import { LuSettings } from "react-icons/lu";
import { LuDownloadCloud } from "react-icons/lu";
import { MdOutlineAnalytics } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { IconType } from 'react-icons';
import { IoExitOutline } from "react-icons/io5";

interface DataIconsLinkProps{
    text:string;
    icon: IconType;
    select?:boolean;
    route?:string;
}

export const dataIconsLink:DataIconsLinkProps[] = [
    {
      text: 'General',
      icon: TbSmartHome
    },
    {
      text: 'Settings',
      icon: LuSettings
    },
    {
      text: 'Import / Exports ',
      icon: LuDownloadCloud,
    },
    {
      text: 'Analytics',
      icon: MdOutlineAnalytics,
      select:true,
      route:'/dashboard'
    },
    {
      text: 'Profile',
      icon: CiUser
    },
    // {
    //   text: 'Logout',
    //   icon: IoExitOutline,
    //   select:true,
    //   route:'/'
    // }
  ]