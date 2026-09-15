// Next
import Link from "next/link"

// Styles
import styles from "@/styles/components/layouts/footer.module.scss";


// Icons
import { instagramLogo, facebookLogo } from "@/utils/icons";

export default function FooterSocialItems({ igLink, fbLink }) {

    return (

        <div className={styles.socialItems}>

            {igLink && (

                <Link href={igLink} target="_blank" className={styles.socialItem} dangerouslySetInnerHTML={{ __html: instagramLogo }} />

            )}

            {fbLink && (

                <Link href={fbLink} target="_blank" className={styles.socialItem} dangerouslySetInnerHTML={{ __html: facebookLogo }} />

            )}

        </div>

    )

}
