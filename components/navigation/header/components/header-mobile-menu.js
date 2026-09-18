"use client";

// React
import { useEffect, useState } from "react";

// Next
import Link from "next/link";
import { usePathname } from "next/navigation";

// Styles
import styles from "../styles/header-mobile-menu.module.scss";

// Data
import { menuItemsData as data } from "@/data/menu-items-data";

// Icons
import { logo, xClose, chevronDown } from "@/utils/icons";

export default function HeaderMobileMenu({ isOpen = false, onClose }) {

    // Handle Menu & Submenu Logic
    const pathname = usePathname();
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const isActive = (item) => {
        if (item.submenu?.some((submenuItem) => pathname === submenuItem.href || pathname.startsWith(`${submenuItem.href}/`))) {
            return true;
        }

        if (!item.href || item.href === "#") {
            return false;
        }

        return pathname === item.href || pathname.startsWith(`${item.href}/`);
    };

    const isLinkActive = (href) => {
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const isSubmenuOpen = (label) => {
        return openSubmenu === label;
    };

    const handleSubmenuToggle = (label) => {
        setOpenSubmenu((current) => (current === label ? null : label));
    };

    const handleLinkClick = () => {
        onClose();
        setOpenSubmenu(null);
    };

    useEffect(() => {
        if (!isOpen) {
            setOpenSubmenu(null);
        }
    }, [isOpen]);

    return (

        <>

            <div className={`hidden-xxl ${styles.mobileMenu}`} data-toggled={isOpen} role="navigation" data-name="mobileMenu">

                <div className={styles.mobileMenuHeader}>

                    <Link href="/" className={styles.mobileMenuLogo} aria-label="Home" onClick={handleLinkClick} dangerouslySetInnerHTML={{ __html: logo }} />

                    <span className={`${styles.mobileMenuToggle} ${styles.mobileMenuClose}`} onClick={onClose} dangerouslySetInnerHTML={{ __html: xClose }} />

                </div>

                <div className={styles.mobileMenuItems}>

                    {data.map((item) => (

                        <div key={item.label} className={styles.mobileMenuItem} data-active={isActive(item)}>

                            {item.submenu ? (

                                <>

                                    <button
                                        type="button"
                                        className={styles.mobileMenuItemToggle}
                                        data-submenu-open={isSubmenuOpen(item.label)}
                                        onClick={() => handleSubmenuToggle(item.label)}
                                    >

                                        <span>{item.label}</span>

                                        <span className={styles.mobileMenuItemIcon} dangerouslySetInnerHTML={{ __html: chevronDown }} />

                                    </button>

                                    <div className={styles.mobileSubmenu} data-submenu-open={isSubmenuOpen(item.label)}>

                                        {item.submenu.map((submenuItem) => (

                                            <Link
                                                key={submenuItem.label}
                                                href={submenuItem.href}
                                                className={styles.mobileSubmenuItemLink}
                                                data-active={isLinkActive(submenuItem.href)}
                                                onClick={handleLinkClick}
                                            >

                                                <span>{submenuItem.label}</span>

                                            </Link>

                                        ))}

                                    </div>

                                </>

                            ) : (

                                <Link href={item.href} className={styles.mobileMenuItemLink} onClick={handleLinkClick}>

                                    <span>{item.label}</span>

                                </Link>

                            )}

                        </div>

                    ))}

                    <Link href="/contact" className={styles.mobileMenuContact} onClick={handleLinkClick}>

                        <span>Contact Us</span>

                    </Link>D

                </div>

            </div>

            <div className={`hidden-xxl ${styles.mobileMenuBackdrop}`} onClick={onClose} data-toggled={isOpen} />

        </>

    );

}
