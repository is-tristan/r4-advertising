"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/styles/components/layouts/header/header-mobile-menu.module.scss";

import { menuItemsData as data } from "@/components/layouts/header/items/menu-items-data";

import { xClose, chevronDown } from "@/utils/icons";

export default function HeaderMobileMenu({ isOpen = false, onClose, contactUrl = "/contact" }) {

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

                    <Link href="/" className={styles.mobileMenuLogo} aria-label="Home" onClick={handleLinkClick}>

                        <Image src="/logos/logo-light.svg" alt="Dakota London" width={160} height={22} />

                    </Link>

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

                    <Link href={contactUrl} className={styles.mobileMenuContact} onClick={handleLinkClick}>

                        <span>Contact Us</span>

                    </Link>

                </div>

            </div>

            <div className={`hidden-xxl ${styles.mobileMenuBackdrop}`} onClick={onClose} data-toggled={isOpen} />

        </>

    );

}
