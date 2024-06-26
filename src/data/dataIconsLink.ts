import { TbSmartHome } from "react-icons/tb";
import { LuSettings } from "react-icons/lu";
import { LuDownloadCloud } from "react-icons/lu";
import { MdOutlineAnalytics } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { IconType } from 'react-icons';


// Interface defining the structure for icon link data
interface DataIconsLinkProps{
    text:string;
    icon: IconType;
    select?:boolean;
    route?:string;
}

// Array containing the data for each icon link
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
  ]