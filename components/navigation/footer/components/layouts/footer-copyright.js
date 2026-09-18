// Next
import Link from "next/link";

// Styles
import styles from "../../styles/footer.module.scss";

export default function FooterCopyright() {

    return (

        <div className={styles.footerCopyright}>
            
            <div className={styles.footerCopyrightText}>

                <p>Copyright &copy; R4 Advertising 2026 | All Rights Reserved</p>

            </div>
            
            <div className={styles.footerCopyrightLinks}>

                <Link href="/privacy-policy">Privacy Policy</Link>

                <span className={`hidden-s hidden-m`}>|</span>

                <Link href="/terms-and-conditions">Terms and Conditions</Link>

                <span className={`hidden-s hidden-m`}>|</span>

                <Link href="/contact">Contact</Link>

            </div>

        </div>

    )

}