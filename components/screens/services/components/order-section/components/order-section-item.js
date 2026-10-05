"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Styles
import styles from "../styles/order-section.module.scss";

// Icons
const arrowRightIcon = '<svg width="157" height="33" viewBox="0 0 157 33" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M154.252 31.8196C151.038 31.8255 147.846 32.0316 144.637 32.155C141.455 32.2771 141.65 27.3498 144.809 27.2289C145.761 27.1924 146.711 27.149 147.661 27.1053C143.617 24.2487 139.438 21.5956 135.053 19.2703C129.45 16.3002 123.46 14.0454 117.438 12.0857C105.566 8.22185 93.1945 6.00822 80.7443 5.21749C55.9974 3.6454 32.1812 13.2731 10.4976 25.2182C8.12463 26.5253 5.79575 27.9106 3.49138 29.3343C0.788588 31.0042 -1.4844 26.628 1.20816 24.9645C21.9808 12.1299 45.2498 0.381989 69.7704 0.017627C94.3491 -0.347799 120.571 4.95194 141.925 17.4647C144.799 19.1486 147.576 20.9922 150.29 22.9234C150.057 21.9954 149.818 21.0685 149.566 20.144C148.729 17.0768 153.54 15.9976 154.375 19.0609C155.257 22.2933 156.004 25.548 156.742 28.8151C157.103 30.4079 155.832 31.8165 154.252 31.8196Z" fill="#DBF903"/> </svg>';

export default function OrderSectionItem({
    item,
    index = 0,
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });
    const hasArrow = item.hasArrow !== false;

    return (

        <motion.div
            ref={ref}
            className={styles.orderSectionItem}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            transition={{ duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" }}
            style={{ alignItems: item.description ? "flex-start" : "center" }}
        >

            <div className={styles.orderSectionItemContent}>

                <h3>{item.title}</h3>

                {item.description && (

                    <span>{item.description}</span>

                )}

            </div>

            {hasArrow && (

                <div className={styles.orderSectionItemArrow} dangerouslySetInnerHTML={{ __html: arrowRightIcon }} />

            )}

        </motion.div>

    )

}