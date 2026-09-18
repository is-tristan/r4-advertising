// Components
import HeaderLogo from "./header-logo"
import HeaderMenu from "./header-menu"
import HeaderActions from "./header-actions"

// Styles
import styles from "../styles/header.module.scss"

export default function HeaderContainer() {

    return (

        <div className={`container ${styles.headerContainer}`}>

            <div className={styles.headerLeft}>

                <HeaderLogo />

                <HeaderMenu />

            </div>

            <HeaderActions />

        </div>

    )

}
