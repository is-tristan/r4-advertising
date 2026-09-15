// Next
import Link from "next/link";

// Styles
import styles from "@/styles/components/layouts/footer.module.scss";

export default function FooterCopyright({ copyrightText = "Dakota London Salt Lake City", policyLink, termsLink }) {

    return (

        <div className={`${styles.copyright}`}>

            <Link href={policyLink}>Privacy Policy</Link>

            <Link href={termsLink}>Terms and Conditions</Link>

            <p>Copyright &copy; 2026 | {copyrightText} | All Rights Reserved.</p>

        </div>

    )

}