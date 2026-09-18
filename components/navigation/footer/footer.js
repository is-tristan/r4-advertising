// Styles
import styles from "./styles/footer.module.scss";

// Components
import FooterInfo from "./components/layouts/footer-info";
import FooterDecoration from "./components/layouts/footer-decoration";
import FooterCopyright from "./components/layouts/footer-copyright";

export default function Footer() {

    return (

        <footer id="footer" className={`row ${styles.footer}`} role="contentinfo">

            <div className={`container noPaddingBottom gapMd`}>

                <FooterInfo />

            </div>

            <FooterDecoration />

            <div className={`container noPaddingBottom ${styles.footerCopyRightContainer}`}>

                <FooterCopyright />

            </div>

        </footer>

    )

}