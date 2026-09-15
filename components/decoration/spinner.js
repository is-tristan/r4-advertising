// Icons
import { brandMark, spinnerText } from "@/utils/icons";

// Styles
import styles from "@/styles/components/decoration/spinner.module.scss";

export default function Spinner({ className = undefined, spinnerInner = spinnerText }) {

    return (

        <div className={`${styles.spinner} ${className}`} aria-hidden="true">

            <div className={styles.spinnerText} dangerouslySetInnerHTML={{ __html: spinnerInner }} data-name={"spinnerText"} />

            <div className={styles.icon} dangerouslySetInnerHTML={{ __html: brandMark }} data-name={"spinnerIcon"} />

        </div>

    )

}