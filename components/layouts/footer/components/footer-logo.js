// Next
import Link from "next/link";
import Image from "next/image";

// Styles
import styles from "@/styles/components/layouts/footer.module.scss";

// Logo
const logo = "/logos/logo-light.svg";

export default function FooterLogo() {

    return (
        
        <Link href="/" className={styles.logo} aria-label="Home">

            <Image src={logo || null} alt="Logo" fill loading="lazy" />

        </Link>

    )

}