interface NavItemProps {
    path: string;
    label: string;
}

/**
 * Array of navigation items used in the Navbar component.
 */
export const navItems: NavItemProps[] = [
    { path: '/', label: 'Features' },
    { path: '/', label: 'Demo' },
    { path: '/', label: 'About' }
]