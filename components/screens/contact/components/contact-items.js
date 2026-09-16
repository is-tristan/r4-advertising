"use client";

// React
import { useRef } from "react";
import { useInView } from "motion/react";

// Components
import ContactItem from "./contact-item";

// Styles
import styles from "@/styles/components/screens/contact-us/contact-us.module.scss";

// Icons
import { phoneIconFilled, emailFilled } from "@/utils/icons";


export default function ContactItems({
    email = "info@dakotalondon.com",
    phone = "480-205-1183",
}) {

    const contactItems = [
        {
            icon: emailFilled,
            topText: "General Inquiries",
            label: email,
            href: `mailto:${email}`,
            bottomText: "We'll get back to you as soon as possible."
        },
        {
            icon: phoneIconFilled,
            topText: "General Inquiries",
            label: phone,
            href: `tel:${phone}`,
            bottomText: "Call us for any questions or to book an appointment."
        }
    ];

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (

        <div ref={ref} className={`container noPaddingTop`}>

            <div className={styles.contactItems}>

                {contactItems.map((item, index) => (

                    <ContactItem
                        key={index}
                        {...item}
                        index={index}
                        isInView={isInView}
                    />

                ))}

            </div>

        </div>

    );

}
