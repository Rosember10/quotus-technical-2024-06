
import Logo from '../../assets/Svg/navbar/main-logo.svg';
import { CiMenuBurger } from "react-icons/ci";
import { VscChromeClose } from "react-icons/vsc";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import style from './navbar.module.css'
import { navItems } from '@/data/dataNav';

/**
 * Interface defining the structure for navigation items.
 * @param path - The URL path that the navigation item points to.
 * @param label - The display text for the navigation item.
 */
interface NavItem {
    path: string;
    label: string;
}

export default function Navbar() {
    const router = useRouter();

    // State to track if the menu is open or closed
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    // useEffect to add/remove 'menu-open' class on body based on menu state
    useEffect(() => {
        isMenuOpen ? document.body.classList.add('menu-open') : document.body.classList.remove('menu-open');
    }, [isMenuOpen])

    // useEffect to handle window resize events
    useEffect(() => {
        // Callback function to handle resize events
        const handleResize = () => {
            // Close the menu if the window is resized to be larger than 1024px
            if (window.innerWidth > 1024) {
                setIsMenuOpen(false);
            }
        };
        // Add the resize event listener
        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Function to toggle the menu open/close state
    const handleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const MenuIcon = isMenuOpen ? VscChromeClose : CiMenuBurger;

    return (
        <section className={style.navbarSection} >
            <MenuIcon className={style.menuBurgerIcon} onClick={handleMenu} />
            <div className={style.logoContainer} onClick={() => router.push('/')}>
                <Image src="/images/quotus-logo.webp" alt='logo quotus' width={200} height={200} priority={true} />
            </div>
            <nav className={` ${style.navbarContainer} ${isMenuOpen ? style.active : ''}`}>
                {navItems.map((item, index) => (
                    <Link key={index} href={item.path}>{item.label}</Link>
                ))}
            </nav>
        </section>
    )
}
