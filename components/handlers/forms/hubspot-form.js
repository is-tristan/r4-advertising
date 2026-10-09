"use client"; // Required for Next.js App Router

// React
import { useEffect } from "react";
import Script from "next/script";

// Styles
import styles from "./styles/hubspot-form.module.scss";

export default function HubspotForm({ portalId, formId, region = "eu1" }) {

    useEffect(() => {

        if (window.hbspt) {
            window.hbspt.forms.create({
                portalId: portalId,
                formId: formId,
                target: "#hubspotFormInit",
                region: region,
            });
        }

    }, [portalId, formId]);

    const handleScriptLoad = () => {
        if (window.hbspt) {
            window.hbspt.forms.create({
                portalId: portalId,
                formId: formId,
                target: "#hubspotFormInit",
                region: region,
            });
        }
    };

    return (

        <>

            <Script
                src="https://js-eu1.hsforms.net/forms/embed/v2.js"
                onLoad={handleScriptLoad}
                strategy="afterInteractive"
            />

            <div id="hubspotFormInit" className={`${styles.hubspotForm}`}></div>

        </>

    );

}