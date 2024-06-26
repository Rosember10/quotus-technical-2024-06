import React from 'react';
import style from './actionButton.module.css'
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';

// Define props for Action button component
interface ActionButtonProps {
    text: string;
    Icon?: IconType;
    route?: string;
}

const ActionButton = ({ text, Icon, route }: ActionButtonProps) => {

    const router = useRouter();
    // Handle click event to navigate to the route if provided
    const handleButton = () => {
        if (route) {
            router.push(`${route}`)
        }
    }

    return (
        <button className={style.buttonContainer} onClick={handleButton}>
            <span>{text}</span>
            {Icon && <Icon />}
        </button>
    )
}

export default ActionButton