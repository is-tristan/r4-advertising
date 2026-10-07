"use client";

// Imports
import { useRef } from "react";
import { motion, useInView } from "motion/react";

// Components
import ImageCol from "@/components/sections/content/components/image-col";
import Text from "@/components/content/text/text";

// Styles
import styles from "./styles/plan-section-content.module.scss";

const planImageText = ["AUDIENCEIQ", "EXPERIAN", "TGI", "CACI"];

export default function PlanSectionContent() {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.33 });

    return (

        <div className={`container dualCols ${styles.planSectionContentContainer}`}>

            <div className={styles.planImageCol}>

                <ImageCol
                    image="/images/services/our-services-section-plan-illustration.svg"
                    alt="Plan"
                    imagePosition="left"
                    imageFill={false}
                    className={styles.planImage}
                />

                <div ref={ref} className={styles.planImageText}>

                    {planImageText.map((item, index) => (

                        <motion.span
                            key={item}
                            className={styles.planImageTextItem}
                            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
                            transition={{ duration: 0.5, delay: 0.15 + (index * 0.075), ease: "easeOut" }}
                        >

                            {item}

                            {index < planImageText.length - 1 && (

                                <span className="colorPrimary">{"//"}</span>

                            )}

                        </motion.span>

                    ))}

                </div>

            </div>

            <div className={styles.planTextCol}>

                <Text description="<p class='extraLarge colorLight'>Planning starts with how people actually live, move and behave. Audience, location and consumption evidence informs where investment should work, how often it should appear and which environments are most likely to influence action.</p>" />

            </div>

        </div>

    );

}
