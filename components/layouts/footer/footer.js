// Styles
import styles from "@/styles/components/layouts/footer.module.scss";

// Components
import FooterLogo from "./components/footer-logo";
import FooterContactItems from "./components/footer-contact-items";
import FooterSocialItems from "./components/footer-social-items";
import FooterCopyright from "./components/footer-copyright";

export default function Footer({
    className,
    data = [], copyright = "Dakota London Salt Lake City",
    igLink = "https://www.instagram.com/dakota.london.hair/",
    fbLink = "https://www.facebook.com/DakotaLondonHairExtensions/",
    policyLink = "/privacy-policy",
    termsLink = "/terms-and-conditions"
}) {

    return (

        <footer id="footer" className={`row bgDark colorLight ${styles.footer} ${className ? className : undefined}`}>

            <div className={`container ${styles.footerContainer}`}>

                <FooterLogo />

                <FooterContactItems data={data} />

                <FooterSocialItems igLink={igLink} fbLink={fbLink} />

                <FooterCopyright copyrightText={copyright} policyLink={policyLink} termsLink={termsLink} />

            </div>

        </footer>

    )

}