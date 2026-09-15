"use client";

// Imports
import { motion } from "motion/react";

// Components
import ContactForm from "@/components/handlers/form";

// Styles
import styles from "@/styles/components/screens/contact-us/contact-us.module.scss";

export default function ContactCol({
    isInView,
    email,
    hasChooseSalonField,
    privacyPolicyUrl,
    termsUrl,
    consentNonMarketing,
    consentMarketing
}) {

    return (

        <motion.div
            className={styles.contactCol}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0)" } : { opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            initial={{ opacity: 0, y: 16, filter: "blur(0.25rem)" }}
            transition={{ duration: 0.5, delay: 0.25 }}
        >

            <ContactForm
                email={email}
                hasChooseSalonField={hasChooseSalonField}
                consentNonMarketing={consentNonMarketing}
                consentMarketing={consentMarketing}
                privacyPolicyUrl={privacyPolicyUrl}
                termsUrl={termsUrl}
            />

        </motion.div>

    );

}