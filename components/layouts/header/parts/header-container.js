// Components
import HeaderLogo from "@/components/layouts/header/parts/header-logo"
import HeaderMenu from "@/components/layouts/header/parts/header-menu"
import HeaderActions from "@/components/layouts/header/parts/header-actions"

// Styles
import styles from "@/styles/components/layouts/header/header.module.scss"

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
