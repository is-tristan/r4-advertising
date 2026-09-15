"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import styles from "@/styles/components/layouts/header/header.module.scss";
import HeaderContainer from "@/components/layouts/header/parts/header-container";

function getContactUrlFromPath(pathname) {
    const match = pathname?.match(/^(\/[^/]+-location)(?:\/|$)/);

    if (match) {
        return `${match[1]}/contact`;
    }

    return "/contact";
}

export default function HeaderClient({ contactUrl }) {

    const pathname = usePathname();
    const resolvedContactUrl = contactUrl ?? getContactUrlFromPath(pathname);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    return (

        <header id="header" className={styles.header} role="banner" data-sticky={isSticky}>

            <HeaderContainer contactUrl={resolvedContactUrl} />

        </header>

    );

}
