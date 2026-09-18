// Next
import Link from "next/link";

// Icons
import { logo } from "@/utils/icons";

// Styles
import styles from "../styles/header.module.scss";

export default function HeaderLogo() {

    return (

        <Link href="/" className={styles.logo} aria-label="Home">

            <div className={styles.logoImage} dangerouslySetInnerHTML={{ __html: logo }} />

        </Link>

    )

}
