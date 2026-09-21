"use client";

// Imports
import { useRef } from "react";
import { useInView } from "motion/react";

// Components
import Heading from "@/components/content/text/text";
import ContactCol from "./components/contact-col";
import ContactItems from "./components/contact-items";

// Styles
import styles from "@/styles/components/screens/contact-us/contact-us.module.scss";

export default function ContactTopSection({
    eyebrow = "Contact Dakota London",
    title = "Reach Out to Us",
    description = "<p>Have questions about extensions, pricing, or booking? Don't hesitate to reach out, we'd love to hear from you!</p>",
    email = "info@dakotalondon.com",
    phone = "480-205-1183",
    hasChooseSalonField = false,
    consentNonMarketing = "I consent to receive non-marketing text messages from AZ Strands LLC DBA Dakota London Hair Extensions regarding appointment reminders, booking confirmations, and service notifications. Message frequency varies, message & data rates may apply. Reply HELP for assistance, reply STOP to opt out.",
    consentMarketing = "I consent to receive marketing text messages from AZ Strands LLC DBA Dakota London Hair Extensions regarding special offers, discounts, and hair extension service updates. Message frequency varies, message & data rates may apply. Reply HELP for assistance, reply STOP to opt out.",
    privacyPolicyUrl = "/privacy-policy",
    termsUrl = "/terms-and-conditions",
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (

        <section ref={ref} className={`row bgDark headerOffset ${styles.contactTopSection}`}>

            <div className={`container colorLight noPaddingBottom ${styles.container}`}>

                <Heading
                    eyebrow={eyebrow}
                    title={title}
                    titleClass="smallTitle"
                    titleTag="h1"
                    description={description}
                    seperatorType={"centered"}
                    hasSeperator={true}
                    alignment="centered"
                />

            </div>

            <div className={`container noPaddingTop ${styles.formContainer}`}>

                <ContactCol
                    isInView={isInView}
                    email={email}
                    hasChooseSalonField={hasChooseSalonField}
                    privacyPolicyUrl={privacyPolicyUrl}
                    termsUrl={termsUrl}
                    consentNonMarketing={consentNonMarketing}
                    consentMarketing={consentMarketing}
                />

            </div>

            <ContactItems
                email={email}
                phone={phone}
            />

        </section>

    );

}