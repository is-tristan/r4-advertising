// Next
import Link from "next/link"

// Styles
import styles from "../../styles/footer.module.scss";


// Icons
import { instagramIcon, linkedInIcon, youtubeIcon } from "@/utils/icons";

export default function FooterSocialItems() {

    return (

        <div className={styles.socialItems}>

            <Link href="https://www.instagram.com/r4.advertising/" target="_blank" rel="noopener noreferrer" className={styles.socialItem} aria-label="Instagram" dangerouslySetInnerHTML={{ __html: instagramIcon }} />

            <Link href="https://www.linkedin.com/company/r4advertising" target="_blank" rel="noopener noreferrer" className={styles.socialItem} aria-label="LinkedIn" dangerouslySetInnerHTML={{ __html: linkedInIcon }} />

            <Link href="https://www.youtube.com/@r4advertising" target="_blank" rel="noopener noreferrer" className={styles.socialItem} aria-label="Youtube" dangerouslySetInnerHTML={{ __html: youtubeIcon }} />

        </div>

    )

}
