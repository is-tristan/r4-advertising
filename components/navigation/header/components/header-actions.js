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

                    {/* <Link href="/contact">Sign In</Link> */}

                    <Link
                        href="/calculator"
                        className={`${styles.headerButton} ${styles.costCalculatorBtn}`}
                        dangerouslySetInnerHTML={{ __html: costIcon }}
                        aria-label="Cost Calculator"
                        title="Cost Calculator"
                    />

                    <Link
                        href="/in-charge-calendar"
                        className={`${styles.headerButton} ${styles.inChargeCalendarBtn}`}
                        dangerouslySetInnerHTML={{ __html: calendarIcon }}
                        aria-label="In-Charge Calendar"
                        title="In-Charge Calendar"
                    />

                    <Button text="Send us your brief" href="/contact" className={`primary small ${styles.contactBtn}`} hasAnimation={false} />

                </div>

                <button
                    type="button"
                    className={`hidden-xxl ${stylesMobileMenu.mobileMenuToggle}`}
                    onClick={toggleMobileMenu}
                    data-name="mobileMenuToggle"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobileMenu"
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >

                    <span className={stylesMobileMenu.mobileMenuToggleItem} />

                    <span className={stylesMobileMenu.mobileMenuToggleItem} />

                    <span className={stylesMobileMenu.mobileMenuToggleItem} />

                </button>

            </div>

            <HeaderMobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        </>

    )

}
