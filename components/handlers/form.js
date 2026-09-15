"use client";

// React
import { useState } from "react";

// Next
import Link from "next/link";

// Styles
import styles from "@/styles/components/handlers/form.module.scss";

// Data
import { getQuoteSalon, salonLocations } from "@/data/contact-info-data";

const salonOptions = salonLocations
    .filter((location) => location.route)
    .map((location) => {
        const salon = getQuoteSalon(location.route);

        return {
            title: location.title.replace("Dakota London ", ""),
            route: location.route,
            email: salon?.email ?? "info@dakotalondon.com",
        };
    });

export default function ContactForm({
    theme = "dark",
    email = "info@dakotalondon.com",
    hasChooseSalonField = false,
    consentNonMarketing = "I consent to receive non-marketing text messages from AZ Strands LLC DBA Dakota London Hair Extensions regarding appointment reminders, booking confirmations, and service notifications. Message frequency varies, message & data rates may apply. Reply HELP for assistance, reply STOP to opt out.",
    consentMarketing = "I consent to receive marketing text messages from AZ Strands LLC DBA Dakota London Hair Extensions regarding special offers, discounts, and hair extension service updates. Message frequency varies, message & data rates may apply. Reply HELP for assistance, reply STOP to opt out.",
    privacyPolicyUrl = "/privacy-policy",
    termsUrl = "/terms-and-conditions",
}) {

    // States
    const [result, setResult] = useState("");
    const [selectedSalon, setSelectedSalon] = useState("");

    const selectedSalonEmail = salonOptions.find((option) => option.title === selectedSalon)?.email;
    const emailTo = hasChooseSalonField ? (selectedSalonEmail ?? email) : email;

    // Theme
    const linkClassName = theme === "light" ? "textLink colorDark" : "textLink";

    // Submit Handler
    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        try {
            const response = await fetch("/api/contact-us", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("Your message has been sent successfully! We will get back to you as soon as possible.");
                event.target.reset();
                setSelectedSalon("");
            } else {
                setResult(data.message ?? "There was an error submitting your request. Please try again.");
            }
        } catch {
            setResult("There was an error submitting your request. Please try again.");
        }
    };

    // Render
    return (

        <div className={styles.contactFormWrap}>

            <form className={`${styles.form}`} data-theme={theme} onSubmit={onSubmit}>

                <input type="hidden" name="emailTo" value={emailTo} />

                <fieldset className={styles.fieldset} data-name="name">

                    <legend className={styles.legend}>Name <span className={styles.required}>*</span></legend>

                    <div className={styles.field}>

                        <input type="text" name="name" required autoComplete="name" placeholder="Enter your name" aria-required="true" />

                    </div>

                </fieldset>

                <fieldset className={`${styles.fieldset} ${styles.half}`} data-name="email">

                    <legend className={styles.legend}>Email <span className={styles.required}>*</span></legend>

                    <div className={styles.field}>

                        <input type="email" name="email" required autoComplete="email" placeholder="Enter your email" aria-required="true" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />

                    </div>

                </fieldset>

                <fieldset className={`${styles.fieldset} ${styles.half}`} data-name="phone">

                    <legend className={styles.legend}>Phone <span className={styles.required}>*</span></legend>

                    <div className={styles.field}>

                        <input
                            type="tel"
                            name="phone"
                            required
                            autoComplete="tel"
                            placeholder="Enter your phone number"
                            aria-required="true"
                            pattern="^(\+?1\s*[-\.]?\s*)?(\(\d{3}\)|\d{3})[\s\-\.]?\d{3}[\s\-\.]?\d{4}$"
                            title="Enter a valid US phone number, e.g. (555) 555-5555 or 555-555-5555"
                        />

                    </div>

                </fieldset>

                {hasChooseSalonField && (

                    <fieldset className={`${styles.fieldset}`} data-name="salon">

                        <legend className={styles.legend}>Salon <span className={styles.required}>*</span></legend>

                        <div className={styles.field}>

                            <select
                                name="salon"
                                required
                                aria-required="true"
                                value={selectedSalon}
                                onChange={(event) => setSelectedSalon(event.target.value)}
                            >
                                <option value="" disabled>Choose a salon</option>

                                {salonOptions.map((option) => (

                                    <option key={option.route} value={option.title}>

                                        {option.title}

                                    </option>

                                ))}

                            </select>

                        </div>

                    </fieldset>

                )}

                <fieldset className={styles.fieldset} data-name="comments">

                    <legend className={styles.legend}>Comments <span className={styles.required}>*</span></legend>

                    <div className={styles.field}>

                        <textarea name="comments" required placeholder="Enter your message..." aria-required="true" />

                    </div>

                </fieldset>

                <fieldset className={`${styles.fieldset} ${styles.consent}`} data-name="consent">

                    <legend className={styles.legend}>Consent</legend>

                    <div className={styles.field}>

                        <input type="checkbox" name="smsNonMarketing" id="sms-non-marketing" />

                        <label htmlFor="sms-non-marketing">{consentNonMarketing}</label>

                    </div>

                    <div className={styles.field}>

                        <input type="checkbox" name="smsMarketing" id="sms-marketing" />

                        <label htmlFor="sms-marketing">{consentMarketing}</label>

                    </div>

                </fieldset>

                <div className={styles.formFooter}>

                    <button className={styles.submit} type="submit">Send Message</button>

                    <div className={`${styles.resultContainer}`} style={{ display: result ? "flex" : "none" }}>

                        <span>{result}</span>

                    </div>

                </div>

            </form>

            <div className={styles.policyLinks}>

                <Link href={privacyPolicyUrl} target="_blank" className={linkClassName}> Privacy Policy </Link>

                <span aria-hidden="true">·</span>

                <Link href={termsUrl} target="_blank" className={linkClassName}> Terms and Conditions </Link>

            </div>

        </div>

    );

}
