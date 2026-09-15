"use client"

// React
import { useState } from "react"

// Components
import Button from "@/components/handlers/buttons"
import HeaderMobileMenu from "@/components/layouts/header/parts/header-mobile-menu"

// Styles
import styles from "@/styles/components/layouts/header/header.module.scss"
import stylesMobileMenu from "@/styles/components/layouts/header/header-mobile-menu.module.scss"

export default function HeaderActions({ contactUrl = "/contact" }) {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    return (

        <>

            <div className={`${styles.headerActions}`}>

                <div className={`${styles.headerButtons}`}>

                    <Button text="Contact Us" href={contactUrl} className={`primary ${styles.primaryBtn}`} icon={null} hasAnimation={false} />

                </div>

                <div className={`hidden-xxl ${stylesMobileMenu.mobileMenuToggle}`} onClick={toggleMobileMenu} data-name="mobileMenuToggle">

                    <span className={stylesMobileMenu.mobileMenuToggleItem} />

                    <span className={stylesMobileMenu.mobileMenuToggleItem} />

                    <span className={stylesMobileMenu.mobileMenuToggleItem} />

                </div>

            </div>

            <HeaderMobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} contactUrl={contactUrl} />

        </>

    )

}
