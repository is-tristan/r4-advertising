"use client";

// React
import { useEffect, useState } from "react";

// Styles
import styles from "../styles/header.module.scss";

// Components
import HeaderContainer from "./header-container";

export default function HeaderClient() {

    // Sticky
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

        <header id="header" className={styles.header} role="navigation" data-sticky={isSticky}>

            <HeaderContainer />

        </header>

    );

}
