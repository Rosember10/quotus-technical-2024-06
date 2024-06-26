import { IconType } from "react-icons";
import { SiBmw, SiJeep, SiFord, SiAudi, SiJaguar, SiMazda } from "react-icons/si";

// Define a type alias for the car brand icon, based on the type of a specific icon (SiBmw)
type CarBrandIconType = typeof SiBmw;

// Export an array containing the icons for different car brands
export const carBrandIcons: CarBrandIconType[] = [SiBmw, SiJeep, SiFord, SiAudi, SiJaguar, SiMazda];