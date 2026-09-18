"use client";

// React
import { useState } from "react";

// Next
import Link from "next/link";
import { usePathname } from "next/navigation";

// Data
import { menuItemsData as data } from "@/data/menu-items-data";

// Styles
import styles from "../styles/header-desktop-menu.module.scss";

// Icons
import { chevronDown } from "@/utils/icons";

export default function HeaderMenu() {

    // Handle Submenu Logic
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

    const isSubmenuOpen = (label) => {
        return openSubmenu === label;
    };

    const handleSubmenuOpen = (label) => {
        setOpenSubmenu(label);
    };

    const handleSubmenuClose = () => {
        setOpenSubmenu(null);
    };

    return (

        <div className={`hidden-s hidden-m hidden-l hidden-xl ${styles.desktopMenu}`} role="navigation" data-name="desktopMenu">

            {data.map((item) => (

                <div
                    className={styles.menuItemOuter}
                    key={item.label}
                    data-menu-item={item.label.toLowerCase().replaceAll(" ", "-")}
                    data-active={isActive(item)}
                    onMouseEnter={() => item.submenu && handleSubmenuOpen(item.label)}
                    onMouseLeave={() => item.submenu && handleSubmenuClose()}
                >

                    {item.submenu ? (

                        <>

                            <div className={`${styles.menuItem} ${styles.hasSubmenu}`}>

                                <div className={styles.menuItemLink} style={{ cursor: "pointer" }} aria-label={`Open ${item.label} submenu`}>

                                    <span>{item.label}</span>

                                    <span className={styles.menuItemIcon} dangerouslySetInnerHTML={{ __html: chevronDown }} />

                                </div>

                            </div>

                            <div className={styles.desktopSubmenu} data-submenu-open={isSubmenuOpen(item.label)}>

                                <div className={styles.submenuSimple}>

                                    {item.submenu.map((submenuItem) => (

                                        <Link
                                            key={submenuItem.label}
                                            href={submenuItem.href}
                                            className={styles.submenuSimpleLink}
                                            data-active={pathname === submenuItem.href || pathname.startsWith(`${submenuItem.href}/`)}
                                            onClick={handleSubmenuClose}
                                        >

                                            <span>{submenuItem.label}</span>

                                        </Link>

                                    ))}

                                </div>

                            </div>

                        </>

                    ) : (

                        <div className={styles.menuItem}>

                            <Link href={item.href} className={styles.menuItemLink} onClick={handleSubmenuClose}>

                                <span>{item.label}</span>

                            </Link>

                        </div>

                    )}

                </div>

            ))}

        </div>

    );

}
