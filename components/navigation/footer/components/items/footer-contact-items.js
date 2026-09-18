// Next
import Link from "next/link";

// Styles
import styles from "../../styles/footer.module.scss";

// Data
import { officeLocationsData as data } from "@/data/contact-info-data";

// Icons
import { locationIcon } from "@/utils/icons";

export default function FooterContactItems({ className = undefined }) {

    return (

        <div className={`${styles.contactItems} ${className}`}>

            {data.map((item, index) => (

                <Link
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactItem}
                    title={`Click to call ${item.title} office`}
                >

                    <div className={styles.contactItemIcon} dangerouslySetInnerHTML={{ __html: locationIcon }} />

                    <div className={styles.contactItemContent}>

                        <span className={styles.contactItemTitle}>{item.title}</span>

                        <span className={styles.contactItemAddress} dangerouslySetInnerHTML={{ __html: item.address }} />

                        <span className={styles.contactItemPhone}>{item.phone}</span>

                    </div>

                </Link>


            ))}

        </div>

    );

}