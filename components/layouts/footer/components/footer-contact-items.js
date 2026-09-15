// Next
import Link from "next/link";

// Styles
import styles from "@/styles/components/layouts/footer.module.scss";

export default function FooterContactItems({ data = [], className = undefined }) {

    return (

        <div className={`${styles.contactItems} ${className}`}>

            {data.items.map((item, index) => (

                <Link key={index} href={item.href} target="_blank" className={styles.contactItem}>

                    <div className={styles.contactItemIcon} dangerouslySetInnerHTML={{ __html: item.icon }} />

                    <div className={styles.contactItemContent}>

                        <span>{item.value}</span>

                    </div>

                </Link>


            ))}

        </div>
        
    );

}