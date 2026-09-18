"use client"

// React
import { useState } from "react"

// Components
import Button from "@/components/handlers/button"
import HeaderMobileMenu from "./header-mobile-menu"

// Styles
import styles from "../styles/header.module.scss"
import stylesMobileMenu from "../styles/header-mobile-menu.module.scss"

export default function HeaderActions() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    return (

        <>

            <div className={`${styles.headerActions}`}>

                <div className={`${styles.headerButtons}`}>

                    <Button text="Contact Us" href="/contact" className={`primary ${styles.primaryBtn}`} icon={null} hasAnimation={false} />

                </div>

                <div className={`hidden-xxl ${stylesMobileMenu.mobileMenuToggle}`} onClick={toggleMobileMenu} data-name="mobileMenuToggle">

                    <span className={stylesMobileMenu.mobileMenuToggleItem} />

                    <span className={stylesMobileMenu.mobileMenuToggleItem} />

                    <span className={stylesMobileMenu.mobileMenuToggleItem} />

                </div>

            </div>

            <HeaderMobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        </>

    )

}
