// Components
import HeaderLogo from "@/components/navigation/header/components/header-logo"
import HeaderMenu from "@/components/navigation/header/components/header-menu"
import HeaderActions from "@/components/navigation/header/components/header-actions"

// Styles
import styles from "@/styles/components/navigation/header/header.module.scss"

export default function HeaderContainer({ contactUrl = "/contact" }) {

    return (

        <div className={`container ${styles.headerContainer}`}>

            <div className={styles.headerLeft}>

                <HeaderLogo />

                <HeaderMenu />

            </div>

            <HeaderActions contactUrl={contactUrl} />

        </div>

    )

}
