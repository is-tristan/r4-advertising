"use client"

// React
import { useState } from "react"

// Next
import Link from "next/link"

// Components
import Button from "@/components/handlers/button"
import HeaderMobileMenu from "./header-mobile-menu"

// Styles
import styles from "../styles/header.module.scss"
import stylesMobileMenu from "../styles/header-mobile-menu.module.scss"

// Icon
import { costIcon, calendarIcon } from "@/utils/icons"

export default function HeaderActions() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    return (

        <>

            <div className={`${styles.headerActions}`}>

                <div className={`${styles.headerButtons}`}>

                    <Link href="/contact">Sign In</Link>

                    <Button text="Brief Us" href="/contact" className={`primary small ${styles.contactBtn}`} hasAnimation={false} />

                    <Link
                        href="/annual-media-commitment"
                        className={`${styles.headerButton} ${styles.annualMediaCommitmentBtn}`}
                        dangerouslySetInnerHTML={{ __html: calendarIcon }}
                        title="Annual Media Commitment"
                    />

                    <Link
                        href="/calculator"
                        className={`${styles.headerButton} ${styles.costCalculatorBtn}`}
                        dangerouslySetInnerHTML={{ __html: costIcon }}
                        title="Cost Calculator"
                    />

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
