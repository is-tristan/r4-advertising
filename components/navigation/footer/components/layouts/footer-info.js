// Next
import Link from "next/link";

// Components
import FooterSocialItems from "../items/footer-social-items";
import FooterContactItems from "../items/footer-contact-items";

// Styles
import styles from "../../styles/footer.module.scss";

// Icons
import { logo } from "@/utils/icons";

export default function FooterInfo() {

    return (

        <div className={styles.footerInfo}>

            <div className={styles.footerLogoContainer}>

                <Link
                    href="/"
                    aria-label="R4 Advertising"
                    title="R4 Advertising"
                    aria-roledescription="Logo"
                    className={styles.footerLogo}
                    dangerouslySetInnerHTML={{ __html: logo }}
                />

                <p style={{ marginBottom: "0" }}>Media Trading, Planning & Activation</p>

                <FooterSocialItems />

            </div>

            <FooterContactItems />

        </div>

    )

}